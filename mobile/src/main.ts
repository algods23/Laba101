import './style.css';
import { Capacitor, registerPlugin } from '@capacitor/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import {
  advanceOrder,
  cancelOrder,
  authenticateUser,
  calculatePricing,
  completeCleaning,
  confirmGeneralCleaning,
  createExpense,
  createFoldLog,
  createOrder,
  createStaff,
  getBranch,
  getFoldRate,
  initOfflineStore,
  listAllStaff,
  listAllServices,
  listActivityLogs,
  listCustomers,
  listDailySales,
  listExpenses,
  listFoldLogs,
  listItemCategories,
  listInventoryItems,
  listInventoryMovements,
  listMachines,
  listOrders,
  listPayments,
  listRevolvingHistory,
  listServices,
  listStaff,
  listSubcleanings,
  recordOrderFold,
  recordPayment,
  deleteDailySale,
  deleteExpense,
  deleteOrderForRefund,
  saveDailySale,
  saveItemCategory,
  saveInventoryItem,
  recordInventoryMovement,
  saveMachine,
  saveService,
  saveSubcleaning,
  saveRevolvingHistory,
  setSetting,
  updateExpense,
  workflowSteps,
  getSetting,
  updateMachine,
  updateStaff,
  updateDailySaleStatus,
  recordActivityLog,
  totalFoldsForOrder,
  type ActivityLog,
  type Customer,
  type DailySale,
  type DisbursementExpense,
  type FoldLog,
  type ItemCategory,
  type InventoryItem,
  type InventoryMovement,
  type LaundryService,
  type Machine,
  type OrderRow,
  type Payment,
  type RevolvingHistory,
  type Staff,
  type Subcleaning,
} from './db';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root not found');

let dashboardClockTimer: number | undefined;

type BluetoothPrinter = {
  name: string;
  address: string;
  bondState?: number;
};

type BluetoothThermalPrinterPlugin = {
  requestBluetoothPermissions(): Promise<{ granted: boolean }>;
  listPairedPrinters(): Promise<{ printers: BluetoothPrinter[]; savedAddress: string }>;
  savePrinter(options: { address: string }): Promise<{ address: string }>;
  connect(options?: { address?: string }): Promise<{ connected: boolean; address: string }>;
  disconnect(): Promise<{ connected: boolean }>;
  getSavedPrinter(): Promise<{ address: string; connected: boolean }>;
  printReceipt(options: {
    address?: string;
    paperWidth: 58 | 80;
    storeName: string;
    receiptNumber: string;
    dateTime: string;
    customerName: string;
    customerPhone: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    totalAmount: number;
    paidAmount: number;
    changeAmount: number;
    balanceAmount: number;
    staffName: string;
  }): Promise<{ printed: boolean; address: string }>;
  printDailySummary(options: {
    address?: string;
    paperWidth: 58 | 80;
    storeName: string;
    dateTime: string;
    staffName: string;
    paidToday: number;
    cashPaidToday: number;
    gcashPaidToday: number;
    disbursementToday: number;
    cashOnHandToday: number;
  }): Promise<{ printed: boolean; address: string }>;
};

const BluetoothThermalPrinter = registerPlugin<BluetoothThermalPrinterPlugin>('BluetoothThermalPrinter');

type TabKey = 'dashboard' | 'pos' | 'orders' | 'archived' | 'customers' | 'pricing' | 'disbursements' | 'reports' | 'logs' | 'inventory' | 'maintenance' | 'staff' | 'revolving' | 'settings';

type ReportType = 'sales' | 'disbursement' | 'fold_count' | 'revolving_fund' | 'summary';

type ReportPreviewState = {
  from: string;
  to: string;
  types: ReportType[];
};

const tabLabels: Record<TabKey, string> = {
  dashboard: 'Dashboard',
  pos: 'POS',
  orders: 'Orders',
  archived: 'Archived Order',
  customers: 'Customers',
  pricing: 'Pricing Services',
  disbursements: 'Daily Report',
  reports: 'Reports',
  logs: 'Logs',
  inventory: 'Inventory',
  maintenance: 'Maintenance',
  staff: 'Staff',
  revolving: 'Revolving Fund',
  settings: 'Settings',
};

const state = {
  tab: 'dashboard' as TabKey,
  receiptOrderId: 0,
  currentUser: null as Staff | null,
  loginError: '',
  sidebarOpen: false,
  dailyReportTab: 'expenses' as 'expenses' | 'sales',
  maintenanceTab: 'cleaning' as 'cleaning' | 'machines',
  customerSearch: '',
  orderSearch: '',
  orderDateFilter: '',
  orderPaymentFilter: '',
  printerPanelOpen: false,
  printerLoading: false,
  printerError: '',
  printerStatus: '',
  printerPaperWidth: 58 as 58 | 80,
  pairedPrinters: [] as BluetoothPrinter[],
  selectedPrinterAddress: '',
  archivedOrderSearch: '',
  paymentModalOrderId: 0,
  dashboardSummaryModalOpen: false,
  reportPreview: null as ReportPreviewState | null,
  endorseModalOpen: false,
  endorseSaleId: 0,
  endorseSaleDate: '',
  revolvingModalOpen: false,
  revolvingSaleId: 0,
  addFundModalOpen: false,
  disbursementModalOpen: false,
  revolvingHistoryFrom: '',
  revolvingHistoryTo: '',
};

const serviceIncludeOptions = ['Wash', 'Dry', 'Fold', 'Detergent', 'Fabcon', 'Zonrox', 'Finishing'] as const;
const disbursementCategories = ['Supplies', 'Utilities', 'Maintenance', 'Salary', 'Rent', 'Transport', 'Other'];

const sessionKey = 'laba101-mobile-session';

function money(value: number) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value || 0);
}

function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function cleanAddonName(name: string) {
  return name.replace(/^(add[- ]?on|additional)\s+/i, '').trim();
}

/** Cash on Hand = Total Cash − Total Disbursement (same as Report Summary). */
function computeCashOnHand(totalCash: number, totalDisbursement: number) {
  return Number((totalCash - totalDisbursement).toFixed(2));
}

function computeCashOnHandForDate(date: string, orders: OrderRow[], expenses: DisbursementExpense[], manualCashAmount = 0) {
  const orderCash = orders
    .filter((order) => localDateFromIso(order.createdAt) === date)
    .reduce((sum, order) => sum + order.paidAmount, 0);
  const dayDisbursements = expenses
    .filter((expense) => expenseType(expense) === 'daily' && expense.expenseDate === date)
    .reduce((sum, expense) => sum + expense.amount, 0);
  return computeCashOnHand(orderCash + manualCashAmount, dayDisbursements);
}

function foldCountRowsFromOrders(orders: OrderRow[], staff: Staff[]) {
  const staffById = new Map(staff.map((s) => [s.id, s.name]));
  // Count per staff per load: foldedByStaffIds records one entry per load folded by that staff
  const grouped = new Map<number, { staffId: number; staffName: string; folds: number }>();
  orders
    .filter((order) => (order.foldedByStaffIds?.length ?? 0) > 0 || order.workflowCompleted.includes('fold'))
    .forEach((order) => {
      const staffIds: number[] = Array.isArray(order.foldedByStaffIds) && order.foldedByStaffIds.length
        ? order.foldedByStaffIds
        : order.foldedBy ? [order.foldedBy] : [];
      staffIds.forEach((staffId) => {
        if (!staffId) return;
        const staffName = staffById.get(staffId) ?? String(staffId);
        const row = grouped.get(staffId) ?? { staffId, staffName, folds: 0 };
        row.folds += 1;
        grouped.set(staffId, row);
      });
    });
  // Resolve staff names from foldedByName when only one staff (legacy orders)
  orders
    .filter((order) => order.workflowCompleted.includes('fold') && order.foldedByName && order.foldedBy)
    .forEach((order) => {
      const row = grouped.get(order.foldedBy as number);
      if (row && row.staffName === String(order.foldedBy)) row.staffName = order.foldedByName as string;
    });
  return Array.from(grouped.values()).map((r) => ({ staffName: r.staffName, folds: r.folds }));
}

function foldDateForOrder(order: OrderRow) {
  return order.foldedAt ? localDateFromIso(order.foldedAt) : localDateFromIso(order.createdAt);
}

function disbursementSequence(number: string) {
  const match = number.match(/(\d+)$/);
  return match ? Number(match[1]) : 0;
}

function localDateInput(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function today() {
  return localDateInput();
}

function currentMonthInput() {
  return today().slice(0, 7);
}

function expenseType(expense: DisbursementExpense) {
  return expense.disbursementType === 'monthly' ? 'monthly' : 'daily';
}

function expenseMonthValue(expenseDate: string) {
  return expenseDate.slice(0, 7);
}

function expenseDateLabel(expense: DisbursementExpense) {
  return expenseType(expense) === 'monthly' ? expenseMonthValue(expense.expenseDate) : expense.expenseDate;
}

function localDateFromIso(value: string) {
  return localDateInput(new Date(value));
}

function orderPaymentStatus(order: Pick<OrderRow, 'paidAmount' | 'balance'>) {
  return order.paidAmount <= 0 ? 'unpaid' : order.balance > 0 ? 'partial' : 'paid';
}

function cappedPaymentTotals(payments: Payment[], orders: OrderRow[], shouldInclude: (payment: Payment) => boolean) {
  const orderById = new Map(orders.map((order) => [order.id, order]));
  const remainingByOrder = new Map(orders.map((order) => [order.id, Number(order.totalAmount || 0)]));
  const totals = { cash: 0, gcash: 0, total: 0 };

  [...payments]
    .sort((a, b) => new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime() || a.id - b.id)
    .forEach((payment) => {
      const order = orderById.get(payment.orderId);
      if (!order) return;
      const remaining = remainingByOrder.get(order.id) ?? 0;
      const appliedAmount = Math.min(Math.max(0, Number(payment.amount || 0)), remaining);
      remainingByOrder.set(order.id, Number((remaining - appliedAmount).toFixed(2)));
      if (!shouldInclude(payment) || appliedAmount <= 0) return;

      if (payment.method === 'gcash') totals.gcash += appliedAmount;
      else totals.cash += appliedAmount;
      totals.total += appliedAmount;
    });

  return {
    cash: Number(totals.cash.toFixed(2)),
    gcash: Number(totals.gcash.toFixed(2)),
    total: Number(totals.total.toFixed(2)),
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function formatDateTimeStack(value: string) {
  const date = new Date(value);
  const datePart = new Intl.DateTimeFormat('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  const timePart = new Intl.DateTimeFormat('en-PH', { hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
  return `<div class="datetime-stack"><strong>${escapeHtml(datePart)}</strong><span class="meta">${escapeHtml(timePart)}</span></div>`;
}

function isGensanStaff(user: Staff | null) {
  return user?.role === 'staff' && user.branch === 'Gensan Branch';
}

function isMintalStaff(user: Staff | null) {
  return user?.role === 'staff' && user.branch.toLowerCase().includes('mintal');
}

async function recordUiLog(action: string, details = '') {
  if (!state.currentUser) return;
  await recordActivityLog({
    staffId: state.currentUser.id,
    staffName: state.currentUser.name,
    action,
    details,
    branch: await getBranch(),
  });
}

async function verifyAdminPassword(password: string) {
  const admins = (await listAllStaff()).filter((person) => person.role === 'admin' && person.isActive !== 0);
  return admins.some((admin) => admin.password === password);
}

function renderHtmlTable(headers: string[], bodyRows: string[][], tableClass = 'data-table') {
  return `
    <div class="table-scroll">
      <table class="${tableClass}">
        <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr></thead>
        <tbody>${bodyRows.length
    ? bodyRows.map((cells) => `<tr>${cells.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')
    : `<tr><td colspan="${headers.length}" class="table-empty">No records found.</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

function dashboardDateTime(date = new Date()) {
  return {
    date: new Intl.DateTimeFormat('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(date),
    time: new Intl.DateTimeFormat('en-PH', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }).format(date),
  };
}

function currentReportSelection(): ReportPreviewState {
  const dateFromInput = document.querySelector<HTMLInputElement>('[data-date-from]');
  const dateToInput = document.querySelector<HTMLInputElement>('[data-date-to]');
  const types = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="reportType"]:checked'))
    .map((input) => input.value)
    .filter((value): value is ReportType => value === 'sales' || value === 'disbursement' || value === 'fold_count' || value === 'revolving_fund' || value === 'summary');

  return {
    from: dateFromInput?.value || '0000-01-01',
    to: dateToInput?.value || '9999-12-31',
    types: types.length ? types : ['summary'],
  };
}

function reportSelectionInRange(date: string, selection: { from: string; to: string }) {
  return date >= selection.from && date <= selection.to;
}

function buildReportData(orders: OrderRow[], payments: Payment[], sales: DailySale[], expenses: DisbursementExpense[], revolvingHistory: RevolvingHistory[], staff: Staff[], foldRate: number, selection: { from: string; to: string; types: ReportType[] }) {
  const selectedTypes = new Set(selection.types);
  const manualSales = sales.filter((sale) => reportSelectionInRange(sale.saleDate, selection));
  const filteredExpenses = expenses.filter((expense) => reportSelectionInRange(expense.expenseDate, selection));
  const foldOrders = orders.filter((order) => ((order.foldedByStaffIds?.length ?? 0) > 0 || order.workflowCompleted.includes('fold')) && reportSelectionInRange(foldDateForOrder(order), selection));
  const filteredFoldCounts = foldCountRowsFromOrders(foldOrders, staff);

  const paymentsInRange = payments.filter((payment) => reportSelectionInRange(localDateFromIso(payment.receivedAt), selection));
  const orderIdsWithPaymentInRange = new Set(paymentsInRange.map(p => p.orderId));
  const allOrderIdsWithAnyPayment = new Set(payments.map(p => p.orderId));

  const salesOrders = orders.filter((order) => 
    reportSelectionInRange(localDateFromIso(order.createdAt), selection) || orderIdsWithPaymentInRange.has(order.id)
  );

  const paymentsByOrder = new Map<number, { cash: number; gcash: number }>();
  paymentsInRange.forEach((payment) => {
      const current = paymentsByOrder.get(payment.orderId) ?? { cash: 0, gcash: 0 };
      if (payment.method === 'gcash') current.gcash += payment.amount;
      else current.cash += payment.amount;
      paymentsByOrder.set(payment.orderId, current);
  });

  const getOrderPaymentInRange = (order: OrderRow) => {
    if (allOrderIdsWithAnyPayment.has(order.id)) {
      return paymentsByOrder.get(order.id) ?? { cash: 0, gcash: 0 };
    }
    if (reportSelectionInRange(localDateFromIso(order.createdAt), selection)) {
      return { cash: order.paidAmount, gcash: 0 };
    }
    return { cash: 0, gcash: 0 };
  };

  const orderCashTotal = salesOrders.reduce((sum, order) => {
    const payment = getOrderPaymentInRange(order);
    const totalPayment = payment.cash + payment.gcash;
    if (totalPayment > order.totalAmount && order.totalAmount > 0 && allOrderIdsWithAnyPayment.has(order.id)) {
      const ratio = order.totalAmount / totalPayment;
      return sum + (payment.cash * ratio);
    }
    return sum + payment.cash;
  }, 0);
  const manualCashTotal = manualSales.reduce((sum, sale) => sum + sale.cashAmount, 0);
  const manualGcashTotal = manualSales.reduce((sum, sale) => sum + sale.gcashAmount, 0);
  const orderGcashTotal = salesOrders.reduce((sum, order) => {
    const payment = getOrderPaymentInRange(order);
    const totalPayment = payment.cash + payment.gcash;
    if (totalPayment > order.totalAmount && order.totalAmount > 0 && allOrderIdsWithAnyPayment.has(order.id)) {
      const ratio = order.totalAmount / totalPayment;
      return sum + (payment.gcash * ratio);
    }
    return sum + payment.gcash;
  }, 0);
  const totalCash = orderCashTotal + manualCashTotal;
  const totalGcash = orderGcashTotal + manualGcashTotal;
  const totalSales = totalCash + totalGcash;
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalDisbursement = totalExpenses;
  const profit = totalSales - totalDisbursement;

  const salesRows = () => ({
    orderCashTotal,
    orderGcashTotal,
    manualCashTotal,
    manualGcashTotal,
    totalCash,
    totalGcash,
    totalSales,
    transactions: salesOrders.map((order) => {
      const payment = getOrderPaymentInRange(order);
      const totalPayment = payment.cash + payment.gcash;
      let cash = payment.cash;
      let gcash = payment.gcash;
      let total = totalPayment;
      if (totalPayment > order.totalAmount && order.totalAmount > 0 && allOrderIdsWithAnyPayment.has(order.id)) {
        const ratio = order.totalAmount / totalPayment;
        cash = payment.cash * ratio;
        gcash = payment.gcash * ratio;
        total = order.totalAmount;
      }
      return {
        ticket: order.ticket,
        customer: order.customer,
        cash,
        gcash,
        total,
      };
    }),
    manualSales: manualSales.map((sale) => ({
      cash: sale.cashAmount,
      gcash: sale.gcashAmount,
      total: sale.totalAmount,
    })),
  });

  const disbursementRows = () => {
    const categoryMap = new Map<string, number>();
    filteredExpenses.forEach((expense) => {
      const cat = expense.category || 'Uncategorized';
      categoryMap.set(cat, (categoryMap.get(cat) ?? 0) + expense.amount);
    });
    const categoryTotals = Array.from(categoryMap.entries()).map(([category, amount]) => ({ category, amount }));
    return {
      totalExpenses,
      totalDisbursement,
      categoryTotals,
      rows: [
        ['Date/Month', 'id#', 'Type', 'Name', 'Category', 'Description', 'Amount'],
        ...filteredExpenses.map((expense) => [expenseDateLabel(expense), expense.number, expenseType(expense), expense.name, expense.category ?? '', expense.description ?? '', expense.amount]),
        [],
        ['Total Disbursement', '', '', '', '', '', totalDisbursement],
      ],
    };
  };

  const foldCountRows = () => ({
    rows: [
      ['Staff', 'Fold Count'],
      ...filteredFoldCounts.map((row) => [row.staffName, row.folds]),
      [],
      ['Total Folds', filteredFoldCounts.reduce((sum, row) => sum + row.folds, 0)],
    ],
  });

  const filteredRevolvingHistory = revolvingHistory.filter((row) => reportSelectionInRange(localDateFromIso(row.createdAt), selection));

  const revolvingDailySummaryRows = () => ({
    rows: [
      ['Date of Sales', 'Cash on Hand', 'Status', 'Date Update'],
      ...manualSales.map((sale) => {
        const cashOnHand = computeCashOnHandForDate(sale.saleDate, orders, expenses, sale.cashAmount);
        const status = sale.status === 'revolving'
          ? 'Revolving'
          : sale.status === 'endorsed'
            ? `Endorsed to ${sale.endorsedTo ?? ''}`
            : 'Pending';
        return [sale.saleDate, cashOnHand, status, sale.statusUpdatedAt ? localDateFromIso(sale.statusUpdatedAt) : ''];
      }),
    ],
  });

  const revolvingHistoryRows = () => ({
    rows: [
      ['Date', 'Number', 'Name', 'Amount', 'Category', 'Description', 'Type'],
      ...filteredRevolvingHistory.map((row) => [
        localDateFromIso(row.createdAt),
        row.revolvingNumber,
        row.name,
        row.type === 'disbursement' ? -row.amount : row.amount,
        row.category,
        row.description ?? '',
        row.type === 'add' ? 'Add Revolving Fund' : 'Disbursement',
      ]),
    ],
  });

  const summaryRows = () => {
    const salesData = salesRows();
    const disbursementData = disbursementRows();
    const cashOnHand = computeCashOnHand(salesData.totalCash, disbursementData.totalDisbursement);
    const netIncome = Number((salesData.totalSales - disbursementData.totalDisbursement).toFixed(2));
    return [
      ['Summary', selection.from, 'to', selection.to],
      [],
      ['Total Sales:', '', ''],
      ['Cash:', '', salesData.totalCash],
      ['GCash:', '', salesData.totalGcash],
      ['Total:', '', salesData.totalSales],
      [],
      ['Total Disbursement:', '', disbursementData.totalDisbursement],
      [],
      ['Cash on Hand (Cash - Total Disbursement):', '', cashOnHand],
      [],
      ['Net Income (Total Sales - Total Disbursement):', '', netIncome],
    ];
  };

  return {
    selection,
    selectedTypes,
    salesRows,
    disbursementRows,
    foldCountRows,
    revolvingDailySummaryRows,
    revolvingHistoryRows,
    summaryRows,
    profit,
  };
}

function tabButton(tab: TabKey, active: boolean) {
  return `<button class="nav-link ${active ? 'is-active' : ''}" data-tab="${tab}" type="button">
    <span class="nav-icon">${navIcon(tab)}</span>
    <span>${tabLabels[tab]}</span>
  </button>`;
}

function sectionTitle(title: string, subtitle: string) {
  return `<div class="section-head"><div><h2>${escapeHtml(title)}</h2><p class="meta">${escapeHtml(subtitle)}</p></div></div>`;
}

function pageTitle() {
  return tabLabels[state.tab] ?? 'Dashboard';
}

function initials(user: Staff | null) {
  return (user?.name ?? 'Laba101').trim().slice(0, 1).toUpperCase();
}

function navIcon(tab: TabKey) {
  const icons: Record<TabKey, string> = {
    dashboard: 'DB',
    pos: 'POS',
    orders: 'PO',
    archived: 'AR',
    customers: 'CU',
    pricing: 'PS',
    disbursements: 'DR',
    reports: 'RP',
    logs: 'LG',
    inventory: 'IN',
    maintenance: 'MT',
    staff: 'ST',
    revolving: 'RV',
    settings: 'SE',
  };
  return icons[tab];
}

async function loadData() {
  const branch = await getBranch();
  const staff = await listStaff(branch);
  const allStaff = await listAllStaff();
  const customers = await listCustomers();
  const services = await listServices();
  const allServices = await listAllServices();
  const categories = await listItemCategories();
  const orders = await listOrders(branch);
  const payments = await listPayments();
  const foldLogs = await listFoldLogs();
  const expenses = await listExpenses();
  const sales = await listDailySales();
  const machines = await listMachines(branch);
  const subcleanings = await listSubcleanings(branch);
  const activityLogs = await listActivityLogs(branch);
  const inventoryItems = await listInventoryItems(branch);
  const inventoryMovements = await listInventoryMovements(branch);
  const revolvingHistory = await listRevolvingHistory();
  const foldRate = await getFoldRate();
  const reportEmail = await getSetting('report_email');

  return { branch, staff, allStaff, customers, services, allServices, categories, orders, payments, foldLogs, expenses, sales, machines, subcleanings, activityLogs, inventoryItems, inventoryMovements, revolvingHistory, foldRate, reportEmail: reportEmail ?? '' };
}

async function render() {
  if (!state.currentUser) {
    renderLogin();
    bindLoginForm();
    return;
  }

  const data = await loadData();
  const openQueue = data.orders.filter((order) => order.status !== 'claimed').length;
  const readyPickup = data.orders.filter((order) => order.status === 'ready').length;
  const orderSales = data.orders.reduce((sum, order) => sum + order.paidAmount, 0);
  const todayValue = today();
  const posPaidToday = cappedPaymentTotals(
    data.payments,
    data.orders,
    (payment) => payment.branch === data.branch && localDateFromIso(payment.receivedAt) === todayValue,
  );
  const gcashPaidToday = posPaidToday.gcash
    + data.sales.filter((sale) => sale.saleDate === todayValue).reduce((sum, sale) => sum + sale.gcashAmount, 0);
  const cashPaidToday = posPaidToday.cash
    + data.sales.filter((sale) => sale.saleDate === todayValue).reduce((sum, sale) => sum + sale.cashAmount, 0);
  const paidToday = cashPaidToday + gcashPaidToday;
  const disbursementToday = data.expenses.filter((expense) => expenseType(expense) === 'daily' && expense.expenseDate === todayValue).reduce((sum, expense) => sum + expense.amount, 0);
  const cashOnHandToday = computeCashOnHand(cashPaidToday, disbursementToday);
  const manualSales = data.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const salesTotal = orderSales + manualSales;
  const disbursementTotal = data.expenses.reduce((sum, row) => sum + row.amount, 0);
  const profit = salesTotal - disbursementTotal;

  app.innerHTML = `
    <div class="app-frame">
      <header class="topbar">
        <div class="topbar-left">
          <img src="/laba101-logo.svg" alt="Laba101" class="topbar-logo" />
          <div>
            <p class="eyebrow">Offline mobile system</p>
            <h1>${escapeHtml(pageTitle())}</h1>
          </div>
        </div>
        <div class="topbar-actions">
          <div class="branch-pill"><span>Branch</span><strong>${escapeHtml(data.branch)}</strong></div>
          <button class="icon-button" type="button" aria-label="Notifications">!</button>
          <button class="profile-pill" type="button">
            <span>${initials(state.currentUser)}</span>
            <strong>${escapeHtml(state.currentUser.name)}</strong>
          </button>
        </div>
      </header>

      <button class="sidebar-backdrop ${state.sidebarOpen ? 'is-open' : ''}" id="sidebar-backdrop" type="button" aria-label="Close navigation"></button>

      <aside class="sidebar ${state.sidebarOpen ? 'is-open' : ''}">
        <div class="sidebar-mobile-head">
          <img src="/laba101-logo.svg" alt="Laba101" />
          <button class="sidebar-close" id="sidebar-close-button" type="button" aria-label="Close navigation">X</button>
        </div>
        <nav>${visibleTabs().map((tab) => tabButton(tab, state.tab === tab)).join('')}</nav>
        <div class="sidebar-fill">
          <div class="sidebar-branch-badge">
            <span>Active Branch</span>
            <strong>${escapeHtml(data.branch)}</strong>
          </div>
          <p class="sidebar-app-name">Laba101 POS</p>
        </div>
        <div class="sidebar-user">
          <span class="avatar">${initials(state.currentUser)}</span>
          <div>
            <strong>${escapeHtml(state.currentUser.name)}</strong>
            <small>${escapeHtml(state.currentUser.email)} / ${escapeHtml(state.currentUser.role)}</small>
          </div>
          <button class="logout-button" id="logout-button" type="button">Logout</button>
        </div>
      </aside>


      <main class="workspace">
        <header class="mobile-topbar">
          <button class="menu-button" id="mobile-menu-button" type="button" aria-label="Open navigation"><span></span><span></span><span></span></button>
          <img src="/laba101-logo.svg" alt="Laba101" />
          <div class="mobile-title">
            <p class="eyebrow">Laba101</p>
            <h2>${escapeHtml(pageTitle())}</h2>
          </div>
          <div class="navbar-time">
            <strong data-navbar-time>--:--</strong>
            <span data-navbar-date>Loading...</span>
          </div>
          <button class="mobile-avatar" type="button">${initials(state.currentUser)}</button>
        </header>

        ${state.tab === 'dashboard' ? renderDashboard({ paidToday, cashPaidToday, gcashPaidToday, disbursementToday, cashOnHandToday, orders: data.orders, payments: data.payments, sales: data.sales }) : ''}
        ${state.tab === 'pos' ? renderPos(data.orders, data.customers, data.services, data.categories, data.payments, data.branch) : ''}
        ${state.tab === 'orders' ? renderOrders(data.orders, data.staff, data.services, data.payments) : ''}
        ${state.tab === 'archived' ? renderArchivedOrders(data.orders, data.staff, data.services, data.payments) : ''}
        ${state.tab === 'customers' ? renderCustomers(data.customers, data.orders) : ''}
        ${state.tab === 'pricing' ? renderPricing(data.allServices, data.categories) : ''}
        ${state.tab === 'disbursements' ? renderDisbursements(data.expenses, data.sales) : ''}
        ${state.tab === 'reports' ? renderReports(data.orders, data.payments, data.sales, data.expenses, data.revolvingHistory, data.allStaff, data.foldRate, salesTotal, disbursementTotal, profit) : ''}
        ${state.tab === 'logs' ? renderLogs(data.activityLogs) : ''}
        ${state.tab === 'inventory' ? renderInventory(data.inventoryItems, data.inventoryMovements, data.branch) : ''}
        ${state.tab === 'maintenance' ? renderMaintenance(data.machines, data.subcleanings, data.branch) : ''}
        ${state.tab === 'staff' ? renderStaff(data.allStaff, data.branch) : ''}
        ${state.tab === 'revolving' ? renderRevolving(data.sales, data.revolvingHistory, data.orders, data.expenses) : ''}
        ${state.tab === 'settings' ? renderSettings(data.branch, data.foldRate, data.reportEmail) : ''}
      </main>
    </div>
  `;

  bindNavigation();
  bindOrderForms(data);
  bindPricingForms(data.allServices);
  bindDisbursementForms(data.expenses);
  bindReportActions(data.orders, data.payments, data.sales, data.expenses, data.revolvingHistory, data.allStaff, data.foldRate);
  bindOrderFilters();
  bindCustomerSearch();
  bindMaintenanceForms();
  bindInventoryForms(data.inventoryItems, data.branch);
  bindStaffForms(data.allStaff);
  bindRevolvingForms();
  bindSettingsForms();
  bindDashboardClock();
}

function visibleTabs(): TabKey[] {
  if (state.currentUser?.role === 'admin') return Object.keys(tabLabels) as TabKey[];
  const staffTabs: TabKey[] = ['dashboard', 'pos', 'orders', 'archived', 'disbursements', 'reports', 'maintenance', 'revolving'];
  if (isGensanStaff(state.currentUser)) return ['dashboard', 'disbursements', 'reports', 'maintenance', 'revolving'];
  return isMintalStaff(state.currentUser) ? staffTabs.filter((tab) => tab !== 'revolving') : staffTabs;
}

function renderLogin() {
  app.innerHTML = `
    <main class="login-page">

      <section class="login-panel-wrap">
        <article class="login-panel">
          <header>
            <div class="login-mark"><img src="/laba101-logo.svg" alt="Laba101" /></div>
            <h2>Welcome back</h2>
            <p>Sign in to continue managing today&apos;s laundry operations.</p>
          </header>
          ${state.loginError ? `<div class="alert">${escapeHtml(state.loginError)}</div>` : ''}
          <form id="login-form" class="form">
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test or staff@laba101.gensan" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
        </article>
      </section>
    </main>
  `;
}

function bindLoginShortcuts() {
  document.querySelectorAll<HTMLButtonElement>('[data-fill-email]').forEach((button) => {
    button.addEventListener('click', () => {
      const email = document.querySelector<HTMLInputElement>('input[name="email"]');
      const password = document.querySelector<HTMLInputElement>('input[name="password"]');
      if (email) email.value = button.dataset.fillEmail ?? '';
      if (password) password.value = button.dataset.fillPassword ?? '';
    });
  });
}

function renderDashboard(metrics: { paidToday: number; cashPaidToday: number; gcashPaidToday: number; disbursementToday: number; cashOnHandToday: number; orders: OrderRow[]; payments: Payment[]; sales: DailySale[] }) {
  const now = new Date();
  const chartDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - index));
    return new Intl.DateTimeFormat('en-PH', { month: 'short', day: 'numeric' }).format(date);
  });
  const chartValues = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - index));
    const key = localDateInput(date);
    const posPaid = cappedPaymentTotals(
      metrics.payments,
      metrics.orders,
      (payment) => localDateFromIso(payment.receivedAt) === key,
    ).total;
    const manualPaid = metrics.sales
      .filter((sale) => sale.saleDate === key)
      .reduce((sum, sale) => sum + sale.totalAmount, 0);
    return posPaid + manualPaid;
  });
  const chartMax = Math.max(1, ...chartValues);
  const chartHeight = 210;
  return `
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${sectionTitle('Revenue overview', 'Paid amount for the last 7 days.')}
        <button class="secondary dashboard-print-button" type="button" data-open-daily-summary>Print Daily Summary</button>
        <div class="stats compact dashboard-stats">
          <div class="stat paid-today-stat">
            <span class="card-label">Paid Today</span>
            <div class="value">${money(metrics.paidToday)}</div>
            <div class="stat-breakdown"><span>Cash ${money(metrics.cashPaidToday)}</span><span>GCash ${money(metrics.gcashPaidToday)}</span></div>
          </div>
          <div class="stat"><span class="card-label">Disbursement</span><div class="value">${money(metrics.disbursementToday)}</div></div>
          <div class="stat"><span class="card-label">Cash on Hand</span><div class="value">${money(metrics.cashOnHandToday)}</div></div>
        </div>
        <div class="chart-shell">
          <div class="mini-chart revenue-chart">
            ${chartValues.map((value, index) => {
              const height = Math.max(12, Math.round((value / chartMax) * chartHeight));
              return `<div class="chart-bar ${index === chartValues.length - 1 ? 'is-today' : ''}"><span style="height:${height}px"></span><strong>${money(value)}</strong></div>`;
            }).join('')}
          </div>
          <div class="chart-days">${chartDays.map((label) => `<span>${escapeHtml(label)}</span>`).join('')}</div>
        </div>
        <div class="chart-footnote">Values include POS payments and Daily Report sales input.</div>
      </article>
      ${state.dashboardSummaryModalOpen ? renderDashboardSummaryModal(metrics) : ''}
    </section>
  `;
}

function renderDashboardSummaryModal(metrics: { paidToday: number; cashPaidToday: number; gcashPaidToday: number; disbursementToday: number; cashOnHandToday: number }) {
  return `
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal dashboard-summary-modal" role="dialog" aria-modal="true" aria-labelledby="daily-summary-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-print-dashboard data-metrics='${JSON.stringify(metrics)}'>${state.printerLoading ? 'Printing...' : 'Print'}</button>
          <button class="secondary" type="button" data-close-daily-summary>Close</button>
        </div>
        ${state.printerPanelOpen ? renderPrinterPanel() : ''}
        <div class="receipt dashboard-summary-slip" id="dashboard-summary-print-area">
          <h3 id="daily-summary-title">Laba101 Daily Summary</h3>
          <p>${escapeHtml(localDateInput())}</p>
          <div><span>Paid today:</span><strong>${money(metrics.paidToday)}</strong></div>
          <div><span>Cash:</span><strong>${money(metrics.cashPaidToday)}</strong></div>
          <div><span>GCash:</span><strong>${money(metrics.gcashPaidToday)}</strong></div>
          <div><span>Disbursement:</span><strong>${money(metrics.disbursementToday)}</strong></div>
          <div><span>Cash-on hand:</span><strong>${money(metrics.cashOnHandToday)}</strong></div>
          <div class="signature-row"><span>Name of receiver and signature</span></div>
        </div>
      </div>
    </div>
  `;
}

function renderPos(orders: OrderRow[], customers: Customer[], services: LaundryService[], categories: ItemCategory[], payments: Payment[], branch: string) {
  const orderServices = services.filter((service) => service.serviceType === 'order' && service.isActive);
  const addons = services.filter((service) => service.serviceType === 'addon' && service.isActive);
  const receipt = state.receiptOrderId ? orders.find((order) => order.id === state.receiptOrderId) : null;

  return `
    <section class="grid content full">
      <article class="panel span-2">
        ${sectionTitle('New POS order', 'Search for a customer or type a new name, pick services and confirm')}
        <form id="order-form" class="form">
          <div class="customer-autocomplete-wrap">
            <label>Customer name
              <div class="autocomplete-field">
                <input
                  id="customer-name-input"
                  name="customerName"
                  required
                  placeholder="Type to search or add new customer…"
                  autocomplete="off"
                />
                <div id="customer-suggestions" class="autocomplete-dropdown" hidden></div>
              </div>
            </label>
            <input type="hidden" name="customerId" id="customer-id-input" value="" />
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" id="customer-phone-input" placeholder="09…" /></label>
          </div>

          <fieldset class="service-picker">
            <legend>Services</legend>
            ${orderServices.map((service) => `<div class="qty-card service-option service-quantity" data-qty-card="serviceQty-${service.id}">
              <span>
                <strong>${escapeHtml(service.name)}</strong>
                <small>${escapeHtml(service.description ?? service.category)} ${service.maxKg ? ` / max ${service.maxKg}kg` : ''}</small>
              </span>
              <b>${money(service.price)}</b>
              <div class="qty-control">
                <button type="button" data-qty-minus="serviceQty-${service.id}" aria-label="Decrease ${escapeHtml(service.name)}">-</button>
                <input type="number" name="serviceQty-${service.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="serviceQty-${service.id}" aria-label="Increase ${escapeHtml(service.name)}">+</button>
              </div>
            </div>`).join('')}
          </fieldset>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${addons.length ? addons.map((addon) => `<div class="qty-card addon-quantity" data-qty-card="addonQty-${addon.id}">
              <span><strong>${escapeHtml(cleanAddonName(addon.name))}</strong><small>${money(addon.price)} each</small></span>
              <div class="qty-control">
                <button type="button" data-qty-minus="addonQty-${addon.id}" aria-label="Decrease ${escapeHtml(cleanAddonName(addon.name))}">-</button>
                <input type="number" name="addonQty-${addon.id}" min="0" step="1" value="0" inputmode="numeric" />
                <button type="button" data-qty-plus="addonQty-${addon.id}" aria-label="Increase ${escapeHtml(cleanAddonName(addon.name))}">+</button>
              </div>
            </div>`).join('') : '<p class="helper">No extra services configured.</p>'}
          </fieldset>

          <div id="price-preview" class="price-preview"></div>
          <p class="form-error" data-order-error hidden></p>
          <div class="form-row">
            <label>Initial payment<input name="paidAmount" type="number" min="0" step="0.01" value="0" /></label>
            <label>Payment method
              <select name="paymentMethod">
                <option value="cash">Cash</option>
                <option value="gcash">GCash</option>
              </select>
            </label>
          </div>
          <label class="gcash-reference" hidden>GCash reference<input name="paymentReference" placeholder="Required for GCash payments" /></label>
          <label>Notes<textarea name="notes" placeholder="Special instructions"></textarea></label>
          <button class="primary" type="submit">Save order</button>
        </form>
      </article>

      ${receipt ? renderReceipt(receipt, payments.filter((payment) => payment.orderId === receipt.id)) : ''}
    </section>
  `;
}

function renderOrders(orders: OrderRow[], staff: Staff[], services: LaundryService[], payments: Payment[]) {
  const receipt = state.receiptOrderId ? orders.find((order) => order.id === state.receiptOrderId) : null;
  const activeOrders = orders.filter((order) => order.status !== 'claimed');
  const query = state.orderSearch.trim().toLowerCase();
  const dateFilter = state.orderDateFilter.trim();
  const paymentFilter = state.orderPaymentFilter.trim().toLowerCase();
  const filteredOrders = activeOrders.filter((order) => {
    const matchesQuery = !query || [order.ticket, order.customer, order.phone, order.service, order.itemCategory, order.status].some((value) => String(value ?? '').toLowerCase().includes(query));
    const matchesDate = !dateFilter || localDateFromIso(order.createdAt) === dateFilter;
    const matchesPayment = !paymentFilter || orderPaymentStatus(order) === paymentFilter;
    return matchesQuery && matchesDate && matchesPayment;
  });
  const unpaidOrders = filteredOrders.filter((order) => ['unpaid', 'partial'].includes(orderPaymentStatus(order)));
  const totalUnpaidAmount = unpaidOrders.reduce((sum, order) => sum + Math.max(0, Number(order.balance || 0)), 0);
  const totalTransactionCount = filteredOrders.length;

  return `
    <section class="grid content full">
      <article class="panel span-2">
        ${sectionTitle('Order queue', 'Workflow, payment, and receipts')}
        <form class="queue-filters" id="order-queue-filters">
          <label>
            <span>Search queue</span>
            <input name="orderSearch" type="search" placeholder="Ticket, name, service, status" value="${escapeHtml(state.orderSearch)}" autocomplete="off" />
          </label>
          <label>
            <span>Filter date</span>
            <input name="orderDateFilter" type="date" value="${escapeHtml(state.orderDateFilter)}" />
          </label>
          <label>
            <span>Payment</span>
            <select name="orderPaymentFilter">
              <option value="" ${state.orderPaymentFilter === '' ? 'selected' : ''}>All</option>
              <option value="unpaid" ${state.orderPaymentFilter === 'unpaid' ? 'selected' : ''}>Unpaid</option>
              <option value="partial" ${state.orderPaymentFilter === 'partial' ? 'selected' : ''}>Partial</option>
              <option value="paid" ${state.orderPaymentFilter === 'paid' ? 'selected' : ''}>Paid</option>
            </select>
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="order-queue-clear">Clear</button>
          </div>
        </form>
        <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
          <table class="data-table orders-data-table bordered-table">
            <thead>
              <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${filteredOrders.map((order) => renderOrderRow(order, staff, services)).join('') || '<tr><td colspan="5" class="table-empty">No matching orders.</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="summary-list queue-summary">
          <div><span>Total transactions</span><strong>${totalTransactionCount}</strong></div>
          <div><span>Total unpaid amount</span><strong>${money(totalUnpaidAmount)}</strong></div>
        </div>
      </article>
      ${receipt ? renderReceipt(receipt, payments.filter((payment) => payment.orderId === receipt.id)) : ''}
      ${state.paymentModalOrderId ? renderPaymentModal(orders.find(o => o.id === state.paymentModalOrderId)) : ''}
    </section>
  `;
}

function renderArchivedOrders(orders: OrderRow[], staff: Staff[], services: LaundryService[], payments: Payment[]) {
  const archivedOrders = orders.filter((order) => order.status === 'claimed');
  const query = state.archivedOrderSearch.trim().toLowerCase();
  const filteredArchivedOrders = archivedOrders.filter((order) => {
    if (!query) return true;
    return [order.ticket, order.customer, order.phone, order.service, order.itemCategory].some((value) => String(value ?? '').toLowerCase().includes(query));
  });
  const receipt = state.receiptOrderId ? orders.find((order) => order.id === state.receiptOrderId) : null;

  return `
    <section class="grid content full">
      <article class="panel span-2">
        ${sectionTitle('Archived orders', 'All claimed orders are listed here')}
        <form class="queue-filters" id="archived-order-filters">
          <label>
            <span>Search archived</span>
            <input name="archivedOrderSearch" type="search" placeholder="Ticket, name, service" value="${escapeHtml(state.archivedOrderSearch)}" autocomplete="off" />
          </label>
          <div class="search-actions queue-actions">
            <button class="primary" type="submit">Apply</button>
            <button class="secondary" type="button" id="archived-order-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list queue-summary">
          <div><span>Archived claims</span><strong>${filteredArchivedOrders.length}</strong></div>
          <div><span>Total claimed</span><strong>${archivedOrders.length}</strong></div>
        </div>
        <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
          <table class="data-table orders-data-table archived-orders-table">
            <thead>
              <tr><th>Ticket</th><th>Customer</th><th>Service</th><th>Total Payment</th><th>Staff Actions</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${filteredArchivedOrders.map((order) => renderOrderRow(order, staff, services, true)).join('') || '<tr><td colspan="6" class="table-empty">No archived orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </article>
      ${receipt ? renderReceipt(receipt, payments.filter((payment) => payment.orderId === receipt.id)) : ''}
    </section>
  `;
}

function renderOrderRow(order: OrderRow, staff: Staff[], services: LaundryService[], isArchived = false) {
  const steps = workflowSteps(order, services);
  const claimedDone = order.workflowCompleted.includes('claimed');
  const nextStep = steps.find((step) => !order.workflowCompleted.includes(step.key));
  const needsFoldStaff = nextStep?.key === 'fold';
  const paymentStatus = orderPaymentStatus(order);
  const paymentStatusLabel = paymentStatus === 'unpaid' ? 'pending' : paymentStatus;
  const extrasLabel = order.extras.length
    ? order.extras.map((extra) => `${escapeHtml(cleanAddonName(extra.name))} x${Number(extra.quantity ?? 1)}`).join(', ')
    : '';
  const isAdmin = state.currentUser?.role === 'admin';
  const canCancel = order.status !== 'claimed' && order.paidAmount <= 0;
  const canDelete = order.status !== 'claimed' && isAdmin && order.paidAmount > 0;
  const totalFolds = totalFoldsForOrder(order, services);
  const savedFoldStaffIds = Array.isArray(order.foldedByStaffIds) ? order.foldedByStaffIds : [];
  const remainingFolds = Math.max(0, totalFolds - savedFoldStaffIds.length);

  return `
    <tr class="order-row-main">
      <td><strong>${escapeHtml(order.ticket)}</strong><div class="small">${escapeHtml(formatDate(order.createdAt))}</div></td>
      <td>${escapeHtml(order.customer)}<div class="small">${escapeHtml(order.phone ?? '')}</div></td>
      <td>${escapeHtml(order.service)}${extrasLabel ? `<div class="small">Extras: ${extrasLabel}</div>` : ''}</td>
      <td class="amount-cell payment-cell status-${paymentStatus}"><strong>${money(order.totalAmount)}</strong><div class="payment-status">${escapeHtml(paymentStatusLabel)}${paymentStatus === 'paid' ? '' : ` &middot; Bal: ${money(order.balance)}`}</div></td>
      ${isArchived ? `<td>
        <div class="small">Folded by: ${escapeHtml(order.foldedByName ?? 'N/A')}</div>
        <div class="small">Released by: ${escapeHtml(order.releasedByName ?? 'N/A')}</div>
      </td>` : ''}
      <td>
      <div class="row-actions">
        ${nextStep?.key === 'fold' ? `<div class="inline-form flex-wrap fold-actions" data-order-id="${order.id}">
          ${savedFoldStaffIds.map((staffId, index) => {
            const person = staff.find((member) => member.id === staffId);
            return `<span class="fold-saved-badge">Fold ${index + 1}: ${escapeHtml(person?.name ?? 'Staff')}</span>`;
          }).join('')}
          ${needsFoldStaff && remainingFolds > 0 ? Array.from({ length: remainingFolds }).map((_, i) => {
            const foldNumber = savedFoldStaffIds.length + i + 1;
            return `<select name="assignedStaffId" class="fold-staff-select" data-order-id="${order.id}" data-fold-number="${foldNumber}">
            <option value="">-- Staff ${totalFolds > 1 ? `(Fold ${foldNumber})` : ''}--</option>
            ${staff.map((person) => `<option value="${person.id}">${escapeHtml(person.name)}</option>`).join('')}
          </select>`;
          }).join('') : ''}
        </div>` : nextStep?.key === 'claimed' && !claimedDone ? `<form class="inline-form advance-form" data-order-id="${order.id}" data-action="claim" data-balance="${order.balance}">
          <select name="releasedBy" required>
            <option value="">-- Released by --</option>
            ${staff.map((person) => `<option value="${person.id}">${escapeHtml(person.name)}</option>`).join('')}
          </select>
          <button class="secondary" type="submit">Claim</button>
        </form>` : ''}
        ${order.balance > 0 ? `
          <form class="inline-form payment-form" data-order-id="${order.id}">
            <input name="amount" type="number" min="0.01" step="0.01" value="${order.balance}" />
            <select name="method"><option value="cash">Cash</option><option value="gcash">GCash</option></select>
            <input name="reference" placeholder="GCash ref" hidden />
            <button class="secondary" type="submit">Pay</button>
          </form>
        ` : ''}
        ${canCancel ? `<button class="secondary btn-sm" type="button" data-cancel-order="${order.id}">Cancel</button>` : ''}
        ${canDelete ? `<button class="secondary btn-sm" type="button" data-delete-order="${order.id}">Delete</button>` : ''}
        <button class="secondary btn-sm" data-receipt="${order.id}">Receipt</button>
      </div>
      </td>
    </tr>
  `;
}

function renderPaymentModal(order: OrderRow | undefined) {
  if (!order) return '';
  return `
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-close-payment-modal>Close</button>
        </div>
        <div class="receipt" style="border: 1px solid var(--line); border-style: solid; box-shadow: none;">
          <h3 id="payment-title" style="margin-top:0">Payment Required</h3>
          <p>Please settle the remaining balance of <strong>${money(order.balance)}</strong> for ticket <strong>${escapeHtml(order.ticket)}</strong> before claiming.</p>
          <form class="claim-payment-form" style="display:flex; flex-direction:column; gap:8px;" data-order-id="${order.id}">
            <label style="display:flex; flex-direction:column; gap:4px; font-weight:bold;">Amount to Pay
              <input name="amount" type="number" min="${order.balance}" step="0.01" value="${order.balance}" required />
            </label>
            <label style="display:flex; flex-direction:column; gap:4px; font-weight:bold;">Payment Method
              <select name="method">
                <option value="cash">Cash</option>
                <option value="gcash">GCash</option>
              </select>
            </label>
            <label style="display:flex; flex-direction:column; gap:4px; font-weight:bold;" hidden>GCash Reference
              <input name="reference" placeholder="Required for GCash" />
            </label>
            <button class="primary" type="submit" style="margin-top:8px">Pay & Claim</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function renderReceipt(order: OrderRow, payments: Payment[]) {
  const tendered = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const change = Math.max(0, Number((tendered - order.totalAmount).toFixed(2)));
  const paymentStatus = orderPaymentStatus(order);
  const paymentStatusLabel = paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1);
  return `
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-open-printer-panel>Printer</button>
          <button class="primary" type="button" data-thermal-print>${state.printerLoading ? 'Printing...' : 'Print Receipt'}</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        ${state.printerPanelOpen ? renderPrinterPanel() : ''}
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${escapeHtml(order.ticket)}<br>${escapeHtml(formatDate(order.createdAt))}</p>
          </div>
          ${state.currentUser ? `<p class="receipt-staff">Staff: ${escapeHtml(state.currentUser.name)}</p>` : ''}
          <div class="receipt-customer">
            <strong>${escapeHtml(order.customer)}</strong>
            <span>${escapeHtml(order.phone ?? 'No phone')}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${escapeHtml(order.service)}</strong></div>
            ${order.extras.length ? `<div><span>Extra services</span><strong>${order.extras.map((extra) => `${escapeHtml(cleanAddonName(extra.name))} x${Number(extra.quantity ?? 1)} (${money(Number(extra.total ?? extra.price))})`).join(', ')}</strong></div>` : ''}
            <div><span>Total</span><strong>${money(order.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${money(tendered)}</strong></div>
            <div><span>Paid</span><strong>${money(order.paidAmount)}</strong></div>
            <div><span>Payment status</span><strong>${paymentStatusLabel}</strong></div>
            <div><span>Change</span><strong>${money(change)}</strong></div>
            <div><span>Balance</span><strong>${money(order.balance)}</strong></div>
          </div>
          <h3>Payments</h3>
          <div class="receipt-payments">
            ${payments.map((payment) => `<div><span>${escapeHtml(payment.method.toUpperCase())}</span><strong>${money(payment.amount)}</strong>${payment.reference ? `<small>Ref ${escapeHtml(payment.reference)}</small>` : ''}</div>`).join('') || '<p class="helper">No payments yet.</p>'}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPrinterPanel() {
  return `
    <div class="printer-panel">
      <div class="printer-panel-head">
        <strong>Bluetooth thermal printer</strong>
        <button class="secondary" type="button" data-refresh-printers>${state.printerLoading ? 'Scanning...' : 'Scan paired'}</button>
      </div>
      <div class="printer-fields">
        <label>Printer
          <select data-printer-select>
            <option value="">Select paired printer</option>
            ${state.pairedPrinters.map((printer) => `<option value="${escapeHtml(printer.address)}" ${state.selectedPrinterAddress === printer.address ? 'selected' : ''}>${escapeHtml(printer.name)} - ${escapeHtml(printer.address)}</option>`).join('')}
          </select>
        </label>
        <label>Paper
          <select data-paper-width>
            <option value="58" ${state.printerPaperWidth === 58 ? 'selected' : ''}>58mm</option>
            <option value="80" ${state.printerPaperWidth === 80 ? 'selected' : ''}>80mm</option>
          </select>
        </label>
      </div>
      <div class="printer-actions">
        <button class="secondary" type="button" data-connect-printer>${state.printerLoading ? 'Connecting...' : 'Connect & Save'}</button>
      </div>
      ${state.printerStatus ? `<p class="printer-status ok">${escapeHtml(state.printerStatus)}</p>` : ''}
      ${state.printerError ? `<p class="printer-status warn">${escapeHtml(state.printerError)}</p>` : ''}
    </div>
  `;
}

async function loadPairedPrinters() {
  state.printerLoading = true;
  state.printerError = '';
  state.printerStatus = '';
  await render();
  try {
    const permission = await BluetoothThermalPrinter.requestBluetoothPermissions();
    if (!permission.granted) throw new Error('Bluetooth permission was not granted.');
    const result = await BluetoothThermalPrinter.listPairedPrinters();
    state.pairedPrinters = result.printers ?? [];
    state.selectedPrinterAddress = state.selectedPrinterAddress || result.savedAddress || state.pairedPrinters[0]?.address || '';
    state.printerStatus = state.pairedPrinters.length ? 'Select a printer, then connect.' : 'No paired printers found. Pair the printer in Android Bluetooth settings first.';
  } catch (error) {
    state.printerError = error instanceof Error ? error.message : 'Could not scan paired printers.';
  } finally {
    state.printerLoading = false;
    await render();
  }
}

async function connectSelectedPrinter() {
  if (!state.selectedPrinterAddress) {
    state.printerError = 'Select a paired printer first.';
    await render();
    return;
  }
  state.printerLoading = true;
  state.printerError = '';
  state.printerStatus = '';
  await render();
  try {
    await BluetoothThermalPrinter.savePrinter({ address: state.selectedPrinterAddress });
    await BluetoothThermalPrinter.connect({ address: state.selectedPrinterAddress });
    state.printerStatus = 'Printer connected and saved.';
  } catch (error) {
    state.printerError = error instanceof Error ? error.message : 'Printer connection failed.';
  } finally {
    state.printerLoading = false;
    await render();
  }
}

function receiptPrintItems(order: OrderRow) {
  const serviceItems = (order.serviceLines?.length
    ? order.serviceLines
    : [{ id: order.serviceId, name: order.service, price: order.price, quantity: 1, total: order.price }])
    .map((line) => ({ name: line.name, quantity: Number(line.quantity || 1), price: Number(line.price || 0) }));
  const extraItems = order.extras.map((extra) => ({ name: cleanAddonName(extra.name), quantity: Number(extra.quantity ?? 1), price: Number(extra.price || 0) }));
  return [...serviceItems, ...extraItems];
}

async function thermalPrintCurrentReceipt(order: OrderRow, payments: Payment[]) {
  const tendered = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const change = Math.max(0, Number((tendered - order.totalAmount).toFixed(2)));
  state.printerLoading = true;
  state.printerError = '';
  state.printerStatus = '';
  await render();
  try {
    if (!state.selectedPrinterAddress) {
      const saved = await BluetoothThermalPrinter.getSavedPrinter();
      state.selectedPrinterAddress = saved.address || '';
    }
    await BluetoothThermalPrinter.printReceipt({
      address: state.selectedPrinterAddress || undefined,
      paperWidth: state.printerPaperWidth,
      storeName: 'Laba101',
      receiptNumber: order.ticket,
      dateTime: formatDate(order.createdAt),
      customerName: order.customer,
      customerPhone: order.phone?.trim() || 'No phone',
      items: receiptPrintItems(order),
      totalAmount: order.totalAmount,
      paidAmount: order.paidAmount,
      changeAmount: change,
      balanceAmount: order.balance,
      staffName: state.currentUser?.name?.trim() || 'Staff',
    });
    state.printerStatus = 'Receipt sent to printer.';
  } catch (error) {
    state.printerPanelOpen = true;
    state.printerError = error instanceof Error ? error.message : 'Bluetooth thermal print failed.';
  } finally {
    state.printerLoading = false;
    await render();
  }
}

async function thermalPrintDashboardSummary(metrics: { paidToday: number; cashPaidToday: number; gcashPaidToday: number; disbursementToday: number; cashOnHandToday: number }) {
  state.printerLoading = true;
  state.printerError = '';
  state.printerStatus = '';
  await render();
  try {
    if (!state.selectedPrinterAddress) {
      const saved = await BluetoothThermalPrinter.getSavedPrinter();
      state.selectedPrinterAddress = saved.address || '';
    }
    await BluetoothThermalPrinter.printDailySummary({
      address: state.selectedPrinterAddress || undefined,
      paperWidth: state.printerPaperWidth,
      storeName: 'Laba101',
      dateTime: localDateInput(),
      staffName: state.currentUser?.name?.trim() || 'Staff',
      paidToday: metrics.paidToday,
      cashPaidToday: metrics.cashPaidToday,
      gcashPaidToday: metrics.gcashPaidToday,
      disbursementToday: metrics.disbursementToday,
      cashOnHandToday: metrics.cashOnHandToday,
    });
    state.printerStatus = 'Daily summary sent to printer.';
  } catch (error) {
    state.printerPanelOpen = true;
    state.printerError = error instanceof Error ? error.message : 'Bluetooth thermal print failed.';
  } finally {
    state.printerLoading = false;
    await render();
  }
}

function renderCustomers(customers: Customer[], orders: OrderRow[]) {
  const query = state.customerSearch.trim().toLowerCase();
  const filteredCustomers = customers.filter((customer) => {
    if (!query) return false;
    return customer.name.toLowerCase().includes(query);
  });
  return `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('Customer Management', 'Customer records from local offline storage')}
        <form class="search-box" id="customer-search-form">
          <label>
            <span>Search customer name</span>
            <input name="customerSearch" data-customer-search type="search" placeholder="Type the customer name then tap Search" value="${escapeHtml(state.customerSearch)}" autocomplete="off" />
          </label>
          <div class="search-actions">
            <button class="primary" type="submit">Search</button>
            <button class="secondary" type="button" id="customer-search-clear">Clear</button>
          </div>
        </form>
        <div class="summary-list">
          <div><span>Total customers</span><strong>${customers.length}</strong></div>
          <div><span>Matching customers</span><strong>${query ? filteredCustomers.length : 0}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${sectionTitle('Customer list', 'Names, phones, addresses, and order history')}
        <div class="customer-stack">
          ${query ? filteredCustomers.map((customer) => {
            const customerOrders = orders.filter((order) => order.customerId === customer.id);
            return `
              <article class="customer-card">
                <header>
                  <div>
                    <strong>${escapeHtml(customer.name)}</strong>
                    <p>${escapeHtml(customer.phone ?? 'No phone')} · ${escapeHtml(customer.address ?? 'No address')}</p>
                  </div>
                  <span>${customerOrders.length} order(s)</span>
                </header>
                <div class="customer-orders">
                  ${customerOrders.length ? customerOrders.map((order) => `
                    <div class="customer-order-row">
                      <div>
                        <strong>${escapeHtml(order.ticket)}</strong>
                        <span>${escapeHtml(order.service)} · ${escapeHtml(order.itemCategory)}</span>
                      </div>
                      <div>
                        <strong>${money(order.totalAmount)}</strong>
                        <span>${escapeHtml(order.status)}</span>
                      </div>
                    </div>`).join('') : '<p class="helper">No order records yet.</p>'}
                </div>
              </article>`;
          }).join('') : '<div class="helper">Search a customer name to display matching records and their order history.</div>'}
        </div>
      </article>
    </section>
  `;
}

function renderPricing(services: LaundryService[], categories: ItemCategory[]) {
  const orderServices = services.filter((service) => service.serviceType === 'order');
  const addonServices = services.filter((service) => service.serviceType === 'addon');

  return `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('Services', 'Order services and add-ons used by POS pricing')}
        <form id="service-form" class="form">
          <input type="hidden" name="id" />
          <div class="form-row">
            <label>Name<input name="name" required /></label>
            <label>Category<input name="category" required /></label>
          </div>
          <div class="form-row">
            <label>Type<select name="serviceType"><option value="order">Order</option><option value="addon">Add-on</option></select></label>
            <label>Price<input name="price" type="number" min="0" step="0.01" required /></label>
          </div>
          <div class="form-row">
            <label>Max KG<input name="maxKg" type="number" min="0" step="0.01" value="8" /></label>
            <label>Drying mins<input name="dryingMinutes" type="number" min="0" step="1" /></label>
          </div>
          <fieldset class="check-grid">
            <legend>Includes</legend>
            ${serviceIncludeOptions.map((option) => `<label class="check"><input type="checkbox" name="includes" value="${option}" /> ${option}</label>`).join('')}
          </fieldset>
          <label>Turnaround hours<input name="turnaroundHours" type="number" min="0" step="1" value="24" /></label>
          <label>Description<textarea name="description"></textarea></label>
          <div class="form-row">
            <button class="primary" type="submit">Save service</button>
            <button class="secondary" type="button" onclick="this.form.reset(); this.form.querySelector('[name=id]').value = '';">Cancel</button>
          </div>
        </form>
      </article>
      <article class="panel">
        ${sectionTitle('Item categories', 'Load limits and extra fees')}
        <form id="category-form" class="form">
          <div class="form-row">
            <label>Name<input name="name" required /></label>
            <label>Max KG<input name="maxKg" type="number" min="0.25" step="0.01" required /></label>
          </div>
          <button class="primary" type="submit">Save category</button>
        </form>
      </article>
      <article class="panel span-2">
        ${sectionTitle('Services Table', 'Order services')}
        <div class="table-scroll">
          <div class="table data-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${orderServices.map((service) => `<div class="table-row"><div><strong>${escapeHtml(service.name)}</strong></div><div>${escapeHtml(service.category)}</div><div>${money(service.price)}</div><div>${service.maxKg} kg</div><div>${escapeHtml(service.includes.join(', ') || 'none')}</div><div>${service.isActive ? 'Active' : 'Inactive'}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${service.id}">Edit</button>${service.isActive ? `<button class="secondary deactivate-service-btn" data-id="${service.id}">Deactivate</button>` : `<button class="secondary activate-service-btn" data-id="${service.id}">Activate</button>`}</div></div>`).join('') || '<div class="helper">No order services yet.</div>'}
          </div>
        </div>
        <div class="section-divider"></div>
        ${sectionTitle('Extra Services Table', 'Add-on services')}
        <div class="table-scroll">
          <div class="table data-table extra-services-table">
            <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Includes</div><div>Status</div><div>Actions</div></div>
            ${addonServices.map((service) => `<div class="table-row"><div><strong>${escapeHtml(service.name)}</strong></div><div>${escapeHtml(service.category)}</div><div>${money(service.price)}</div><div>${escapeHtml(service.includes.join(', ') || 'none')}</div><div>${service.isActive ? 'Active' : 'Inactive'}</div><div class="row-actions"><button class="secondary edit-service-btn" data-id="${service.id}">Edit</button>${service.isActive ? `<button class="secondary deactivate-service-btn" data-id="${service.id}">Deactivate</button>` : `<button class="secondary activate-service-btn" data-id="${service.id}">Activate</button>`}</div></div>`).join('') || '<div class="helper">No extra services yet.</div>'}
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderDisbursements(expenses: DisbursementExpense[], sales: DailySale[]) {
  const todayValue = today();
  const monthValue = todayValue.slice(0, 7);
  const isAdmin = state.currentUser?.role === 'admin';
  const expenseCategoryOptions = Array.from(new Set([...disbursementCategories, ...expenses.map((expense) => expense.category).filter(Boolean)]));
  const dailyExpense = expenses.filter((item) => expenseType(item) === 'daily' && item.expenseDate === todayValue).reduce((sum, item) => sum + item.amount, 0);
  const monthlyExpense = expenses.filter((item) => expenseType(item) === 'monthly' && item.expenseDate.startsWith(monthValue)).reduce((sum, item) => sum + item.amount, 0);
  const todaysManualSales = sales.filter((item) => item.saleDate === todayValue).reduce((sum, item) => sum + item.totalAmount, 0);
  const monthlyManualSales = sales.filter((item) => item.saleDate.startsWith(monthValue)).reduce((sum, item) => sum + item.totalAmount, 0);
  const latestExpenses = [...expenses].sort((a, b) => disbursementSequence(b.number) - disbursementSequence(a.number) || b.id - a.id);
  return `
    <section class="page-head">
      <div>
        <h2>Daily Report</h2>
      </div>
      <div class="segmented">
        <button class="${state.dailyReportTab === 'expenses' ? 'is-active' : ''}" data-report-tab="expenses" type="button">Disbursements</button>
        <button class="${state.dailyReportTab === 'sales' ? 'is-active' : ''}" data-report-tab="sales" type="button">Daily Sales</button>
      </div>
    </section>
    <section class="grid stats compact report-stats">
      <div class="panel stat"><div class="card-label">Daily disbursement</div><div class="value">${money(dailyExpense)}</div></div>
      <div class="panel stat"><div class="card-label">Monthly disbursement</div><div class="value">${money(monthlyExpense)}</div></div>
      <div class="panel stat"><div class="card-label">Today sales input</div><div class="value">${money(todaysManualSales)}</div></div>
      <div class="panel stat"><div class="card-label">Month sales input</div><div class="value">${money(monthlyManualSales)}</div></div>
    </section>
    ${state.dailyReportTab === 'expenses' ? `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('Input disbursement', 'Supplies, utilities, and cash disbursements')}
        <form id="expense-form" class="form">
          <input name="id" type="hidden" />
          <label>Disbursement Type
            <div class="segmented disbursement-type-toggle">
              <button class="is-active" data-expense-type="daily" type="button">Daily</button>
              <button data-expense-type="monthly" type="button">Monthly</button>
            </div>
            <input name="disbursementType" type="hidden" value="daily" />
          </label>
          <div class="form-row">
            <label class="expense-date-field">Date<input name="expenseDate" type="date" value="${today()}" required /></label>
            <label class="expense-month-field" hidden>Month<input name="expenseMonth" type="month" value="${currentMonthInput()}" /></label>
            <label>Amount<input name="amount" type="number" min="0" step="0.01" required placeholder="0.00" /></label>
          </div>
          <div class="form-row"><label>Title / Name<input name="name" required /></label><label>Category<select name="category" required>${expenseCategoryOptions.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('')}</select></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${sectionTitle('Disbursement list', 'Expenses only')}
        ${renderHtmlTable(
          ['Date/Month', 'No.', 'Type', 'Name', 'Category', 'Amount', 'Action'],
          latestExpenses.map((item) => [
            `<strong>${escapeHtml(expenseDateLabel(item))}</strong>`,
            escapeHtml(item.number),
            escapeHtml(expenseType(item)),
            escapeHtml(item.name),
            escapeHtml(item.category),
            money(item.amount),
            `<div class="row-actions"><button class="secondary edit-expense-btn" data-id="${item.id}" type="button">Edit</button>${isAdmin ? `<button class="secondary delete-expense-btn" data-id="${item.id}" type="button">Delete</button>` : ''}</div>`,
          ]),
          'data-table orders-data-table app-record-table disbursement-list-table',
        )}
      </article>
    </section>
    ` : `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('Input total sale', 'Manual cash and GCash totals')}
        <form id="sales-form" class="form">
          <input name="id" type="hidden" />
          <label>Date<input name="saleDate" type="date" value="${today()}" required /></label>
          <label>Cash sales<input name="cashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>GCash sales<input name="gcashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>Notes<textarea name="notes" placeholder="Optional"></textarea></label>
          <button class="primary" type="submit">Save daily sale</button>
        </form>
      </article>
      <article class="panel">
        ${sectionTitle('Daily sales history', 'Cash, GCash, total sale, notes, and updates')}
        <div class="table-scroll daily-report-scroll">
          <div class="table wide-table daily-report-table">
            <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div><div>Action</div></div>
            ${sales.map((item) => `<div class="table-row"><div>${escapeHtml(item.saleNumber)}</div><div>${escapeHtml(item.saleDate)}</div><div>${money(item.cashAmount)}</div><div>${money(item.gcashAmount)}</div><div><strong>${money(item.totalAmount)}</strong></div><div class="row-actions"><button class="secondary edit-sale-btn" data-id="${item.id}" type="button">Edit</button>${isAdmin ? `<button class="secondary delete-sale-btn" data-id="${item.id}" type="button">Delete</button>` : ''}</div></div>`).join('') || '<div class="helper">No daily sales totals yet.</div>'}
          </div>
        </div>
      </article>
    </section>
    `}
  `;
}

function reportPreviewCell(value: string | number, index: number) {
  if (typeof value === 'number' && index >= 4) return money(value);
  return escapeHtml(value ?? '');
}

function renderReports(orders: OrderRow[], payments: Payment[], sales: DailySale[], expenses: DisbursementExpense[], revolvingHistory: RevolvingHistory[], staff: Staff[], foldRate: number, salesTotal: number, disbursementTotal: number, profit: number) {
  const preview = state.reportPreview ? buildReportData(orders, payments, sales, expenses, revolvingHistory, staff, foldRate, state.reportPreview) : null;
  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">Exports</p>
        <h2>Report Center</h2>
      </div>
    </section>
    <section class="panel report-center">
      <div class="report-grid">
        <div class="report-date-row">
          <h3>Date to export</h3>
          <div class="form-row report-date-inputs">
            <label>From<input name="dateFrom" data-date-from type="date" value="${today()}" /></label>
            <label>To<input name="dateTo" data-date-to type="date" value="${today()}" /></label>
          </div>
        </div>
        <div class="report-scope-row">
          <div class="date-scopes">
            <label><input type="radio" name="dateScope" value="today" data-date-scope checked /> <span>Current</span></label>
            <label><input type="radio" name="dateScope" value="week" data-date-scope /> <span>Week</span></label>
            <label><input type="radio" name="dateScope" value="month" data-date-scope /> <span>Month</span></label>
            <label><input type="radio" name="dateScope" value="custom" data-date-scope /> <span>Custom</span></label>
          </div>
        </div>
        <div class="report-include-row">
          <h3>Reports to include</h3>
          <div class="report-checks">
            <label><input type="checkbox" name="reportType" value="sales" checked /> Sales Report</label>
            <label><input type="checkbox" name="reportType" value="disbursement" checked /> Disbursement Reports</label>
            ${state.currentUser?.branch?.toLowerCase().includes('gensan') ? '' : `<label><input type="checkbox" name="reportType" value="fold_count" /> Fold Count</label>`}
            ${state.currentUser?.branch?.toLowerCase().includes('mintal') ? '' : `<label><input type="checkbox" name="reportType" value="revolving_fund" /> Revolving Fund</label>`}
            <label><input type="checkbox" name="reportType" value="summary" checked /> Summary</label>
          </div>
        </div>
      </div>
      <div class="section-divider"></div>
      <div class="report-actions">
        <p>Summary computes sales minus disbursement for the selected dates.</p>
        <div>
          <button class="secondary" id="generate-report" type="button">Generate report</button>
          <button class="secondary" id="email-report" type="button">Send File</button>
        </div>
      </div>
    </section>
    ${preview ? `
      <section class="panel report-preview">
        ${preview.selectedTypes.has('sales') ? `
          <article>
            ${sectionTitle('Sales report preview', `${preview.selection.from} to ${preview.selection.to}`)}
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>Ticket</th><th>Customer</th><th>Cash</th><th>GCash</th><th>Total Payment</th></tr>
                </thead>
                <tbody>
                  ${preview.salesRows().transactions.map((tx) => `<tr><td>${escapeHtml(tx.ticket)}</td><td>${escapeHtml(tx.customer)}</td><td>${money(tx.cash)}</td><td>${money(tx.gcash)}</td><td><strong>${money(tx.total)}</strong></td></tr>`).join('') || '<tr><td colspan="5" class="table-empty">No sales records found.</td></tr>'}
                </tbody>
              </table>
            </div>
            <div class="sales-summary-section" style="margin-top: 16px;">
              <h3>Sales Summary</h3>
              <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch; margin-top: 16px;">
                <table class="data-table orders-data-table bordered-table">
                  <thead>
                    <tr><th>Sales Type</th><th>Cash</th><th>GCash</th><th>Sales</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Orders</td><td>${money(preview.salesRows().orderCashTotal)}</td><td>${money(preview.salesRows().orderGcashTotal)}</td><td>${money(preview.salesRows().orderCashTotal + preview.salesRows().orderGcashTotal)}</td></tr>
                    <tr><td>Whole Sale Day</td><td>${money(preview.salesRows().manualCashTotal)}</td><td>${money(preview.salesRows().manualGcashTotal)}</td><td>${money(preview.salesRows().manualCashTotal + preview.salesRows().manualGcashTotal)}</td></tr>
                    <tr style="font-weight: bold; background: #f8fafc;"><td>Total</td><td>${money(preview.salesRows().totalCash)}</td><td>${money(preview.salesRows().totalGcash)}</td><td>${money(preview.salesRows().totalSales)}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>` : ''}
        ${preview.selectedTypes.has('disbursement') ? (() => {
          const disbData = preview.disbursementRows();
          return `
          <article>
            ${sectionTitle('Disbursement preview', `${preview.selection.from} to ${preview.selection.to}`)}
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>ID#</th><th>Date/Month</th><th>Type</th><th>Name</th><th>Category</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  ${disbData.rows.slice(1).filter((row) => row.length && row[0] !== 'Total Disbursement').map((row) => `<tr><td>${escapeHtml(String(row[1] ?? ''))}</td><td>${escapeHtml(String(row[0] ?? ''))}</td><td>${escapeHtml(String(row[2] ?? ''))}</td><td>${escapeHtml(String(row[3] ?? ''))}</td><td>${escapeHtml(String(row[4] ?? ''))}</td><td><strong>${money(row[6] as number)}</strong></td></tr>`).join('') || '<tr><td colspan="6" class="table-empty">No disbursements found.</td></tr>'}
                </tbody>
              </table>
            </div>
            ${disbData.categoryTotals.length ? `
              <div class="disbursement-category-summary">
                <h4>Disbursement by Category</h4>
                <div class="category-breakdown-list">
                  ${disbData.categoryTotals.map((cat) => `
                    <div class="category-breakdown-row">
                      <span>${escapeHtml(cat.category)}</span>
                      <strong>${money(cat.amount)}</strong>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
            <div class="disbursement-total">
              <strong>Total Disbursement: ${money(disbData.totalDisbursement)}</strong>
            </div>
          </article>`;
        })() : ''}
        ${preview.selectedTypes.has('fold_count') ? `
          <article>
            ${sectionTitle('Fold Count preview', `${preview.selection.from} to ${preview.selection.to}`)}
            <div style="overflow-x: auto; width: 100%; -webkit-overflow-scrolling: touch;">
              <table class="data-table orders-data-table bordered-table">
                <thead>
                  <tr><th>Staff</th><th>Fold Count</th></tr>
                </thead>
                <tbody>
                  ${preview.foldCountRows().rows.slice(1).map((row) => `<tr>${row.map((value) => `<td>${escapeHtml(String(value ?? ''))}</td>`).join('')}</tr>`).join('') || '<tr><td colspan="2" class="table-empty">No fold records found.</td></tr>'}
                </tbody>
              </table>
            </div>
          </article>` : ''}
        ${preview.selectedTypes.has('revolving_fund') ? `
          <article>
            ${sectionTitle('Revolving Fund — Daily Summary', `${preview.selection.from} to ${preview.selection.to}`)}
            ${renderHtmlTable(
              ['Date of Sales', 'Cash on Hand', 'Status', 'Date Update'],
              preview.revolvingDailySummaryRows().rows.slice(1).map((row) => [
                escapeHtml(String(row[0] ?? '')),
                escapeHtml(String(row[1] ?? '')),
                escapeHtml(String(row[2] ?? '')),
                escapeHtml(String(row[3] ?? '')),
              ]),
              'data-table orders-data-table bordered-table',
            )}
          </article>
          <article>
            ${sectionTitle('Revolving Fund — Table History', `${preview.selection.from} to ${preview.selection.to}`)}
            ${renderHtmlTable(
              ['Date', 'Number', 'Name', 'Amount', 'Category', 'Description', 'Type'],
              preview.revolvingHistoryRows().rows.slice(1).map((row) => [
                escapeHtml(String(row[0] ?? '')),
                escapeHtml(String(row[1] ?? '')),
                escapeHtml(String(row[2] ?? '')),
                escapeHtml(String(row[3] ?? '')),
                escapeHtml(String(row[4] ?? '')),
                escapeHtml(String(row[5] ?? '')),
                escapeHtml(String(row[6] ?? '')),
              ]),
              'data-table orders-data-table bordered-table',
            )}
          </article>` : ''}
        ${preview.selectedTypes.has('summary') ? (() => {
          const salesData = preview.salesRows();
          const disbData = preview.disbursementRows();
          const cashOnHand = computeCashOnHand(salesData.totalCash, disbData.totalDisbursement);
          const netIncome = Number((salesData.totalSales - disbData.totalDisbursement).toFixed(2));
          return `
          <article>
            ${sectionTitle('Summary preview', `${preview.selection.from} to ${preview.selection.to}`)}
            <div class="summary-report-layout">
              <div class="summary-section">
                <div class="summary-section-header">Total Sales</div>
                <div class="summary-detail-row">
                  <span>Cash:</span><strong>${money(salesData.totalCash)}</strong>
                </div>
                <div class="summary-detail-row">
                  <span>GCash:</span><strong>${money(salesData.totalGcash)}</strong>
                </div>
                <div class="summary-detail-row summary-total-row">
                  <span>Total:</span><strong>${money(salesData.totalSales)}</strong>
                </div>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-section">
                <div class="summary-section-header">Total Disbursement</div>
                <div class="summary-detail-row summary-total-row">
                  <span></span><strong>${money(disbData.totalDisbursement)}</strong>
                </div>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-section">
                <div class="summary-section-header">Cash on Hand</div>
                <div class="summary-detail-row summary-formula">
                  <span>Cash − Total Disbursement</span>
                </div>
                <div class="summary-detail-row summary-total-row">
                  <span></span><strong>${money(cashOnHand)}</strong>
                </div>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-section">
                <div class="summary-section-header">Net Income</div>
                <div class="summary-detail-row summary-formula">
                  <span>Total Sales − Total Disbursement</span>
                </div>
                <div class="summary-detail-row summary-total-row">
                  <span></span><strong class="${netIncome >= 0 ? 'positive' : 'negative'}">${money(netIncome)}</strong>
                </div>
              </div>
            </div>
          </article>`;
        })() : ''}
      </section>
    ` : ''}
  `;
}

function renderLogs(logs: ActivityLog[]) {
  return `
    <section class="grid content full">
      <article class="panel span-2">
        ${sectionTitle('Activity Logs', 'Recorded staff actions and timestamps')}
        ${renderHtmlTable(
          ['Timestamp', 'Staff', 'Action', 'Details'],
          logs.map((log) => [
            formatDateTimeStack(log.timestamp),
            escapeHtml(log.staffName),
            `<strong>${escapeHtml(log.action)}</strong>`,
            escapeHtml(log.details),
          ]),
          'data-table orders-data-table app-record-table logs-table',
        )}
      </article>
    </section>
  `;
}

function renderInventory(items: InventoryItem[], movements: InventoryMovement[], branch: string) {
  return `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('Inventory Item', 'Custom stocks and supplies')}
        <form id="inventory-form" class="form">
          <input name="id" type="hidden" />
          <label>Item name<input name="name" required placeholder="e.g. Finishing Spray 60ml" /></label>
          <div class="form-row">
            <label>Unit<input name="unit" required placeholder="pcs, bottle, pack" /></label>
            <label>Quantity<input name="quantity" type="number" step="0.01" min="0" required value="0" /></label>
          </div>
          <label>Reorder level<input name="reorderLevel" type="number" step="0.01" min="0" value="0" /></label>
          <label>Notes<textarea name="notes" placeholder="Supplier, storage, or remarks"></textarea></label>
          <input name="branch" type="hidden" value="${escapeHtml(branch)}" />
          <button class="primary" type="submit">Save item</button>
        </form>
      </article>
      <article class="panel span-2">
        ${sectionTitle('Stock List', 'Editable branch inventory')}
        ${renderHtmlTable(
          ['Item', 'Qty', 'Unit', 'Reorder', 'Status', 'Updated', 'Action'],
          items.map((item) => [
            `<strong>${escapeHtml(item.name)}</strong><div class="small">${escapeHtml(item.notes ?? '')}</div>`,
            escapeHtml(item.quantity),
            escapeHtml(item.unit),
            escapeHtml(item.reorderLevel),
            `<span class="${item.quantity <= item.reorderLevel ? 'warn' : 'ok'}">${item.quantity <= item.reorderLevel ? 'Low stock' : 'OK'}</span>`,
            formatDateTimeStack(item.updatedAt),
            `<button class="secondary edit-inventory-btn" type="button" data-id="${item.id}">Edit</button>`,
          ]),
          'data-table orders-data-table app-record-table inventory-stock-table',
        )}
      </article>
      <article class="panel">
        ${sectionTitle('Stock In / Stock Out', 'Adjust inventory quantities')}
        <form id="inventory-movement-form" class="form">
          <label>Item<select name="itemId" required>
            <option value="">Select item</option>
            ${items.map((item) => `<option value="${item.id}">${escapeHtml(item.name)} (${item.quantity} ${escapeHtml(item.unit)})</option>`).join('')}
          </select></label>
          <div class="segmented">
            <label><input type="radio" name="movementType" value="in" checked /> Stock-in</label>
            <label><input type="radio" name="movementType" value="out" /> Stock-out</label>
          </div>
          <label>Quantity<input name="quantity" type="number" step="0.01" min="0.01" required /></label>
          <label>Notes<textarea name="notes" placeholder="Reason, supplier, or usage"></textarea></label>
          <button class="primary" type="submit">Save movement</button>
        </form>
      </article>
      <article class="panel span-2">
        ${sectionTitle('Stock Movement History', 'Recent stock-in and stock-out records')}
        ${renderHtmlTable(
          ['Date', 'Item', 'Type', 'Qty', 'Staff', 'Notes'],
          movements.map((row) => [
            formatDateTimeStack(row.createdAt),
            escapeHtml(row.itemName),
            `<span class="${row.movementType === 'in' ? 'ok' : 'warn'}">${row.movementType === 'in' ? 'Stock-in' : 'Stock-out'}</span>`,
            escapeHtml(row.quantity),
            escapeHtml(row.staffName),
            escapeHtml(row.notes ?? ''),
          ]),
          'data-table orders-data-table app-record-table inventory-movement-table',
        )}
      </article>
    </section>
  `;
}

function renderMaintenance(machines: Machine[], subcleanings: Subcleaning[], branch: string) {
  const availableMachines = machines.filter((machine) => machine.status !== 'under_cleaning');
  const cleaningMachines = machines.filter((machine) => machine.status === 'under_cleaning');
  const calendarBase = new Date();
  const calendarStart = new Date(calendarBase.getFullYear(), calendarBase.getMonth(), 1);
  calendarStart.setDate(calendarStart.getDate() - calendarStart.getDay());
  const calendarDays = Array.from({ length: 35 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);
    const key = localDateInput(date);
    const records = subcleanings.filter((row) => row.date === key);
    return {
      key,
      date,
      records,
      isCurrentMonth: date.getMonth() === calendarBase.getMonth(),
      isToday: key === today(),
    };
  });
  const calendarTitle = new Intl.DateTimeFormat('en-PH', { month: 'long', year: 'numeric' }).format(calendarBase);
  const generalDoneToday = subcleanings.some((row) => row.date === today() && row.cleaningType === 'general');
  return `
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine tube cleaning, general cleaning, and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${state.maintenanceTab === 'cleaning' ? 'is-active' : ''}" data-maintenance-tab="cleaning" type="button">Tube Cleaning</button>
        <button class="${state.maintenanceTab === 'machines' ? 'is-active' : ''}" data-maintenance-tab="machines" type="button">Machine Management</button>
      </div>
    </section>
    ${state.maintenanceTab === 'cleaning' ? `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('Available Machines', 'Select machines to start cleaning.')}
        <form id="subcleaning-form" class="form">
          <input type="hidden" name="date" value="${today()}" />
          <fieldset class="machine-list">
            ${availableMachines.map((machine) => `<label class="machine-card"><input type="checkbox" name="machineIds" value="${machine.id}" /><span><strong>${escapeHtml(machine.machineName)}</strong><small>${escapeHtml(machine.machineType)}</small></span><em></em></label>`).join('') || '<p class="helper">All machines are currently being cleaned.</p>'}
          </fieldset>
          <input type="hidden" name="cleaningStatus" value="in_progress" />
          <input type="hidden" name="cleaningType" value="tube" />
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${escapeHtml(branch)}" />
          <button class="primary" type="submit">Start Tube Cleaning</button>
        </form>
      </article>
      <article class="panel">
        ${sectionTitle('General Cleaning', 'Confirm general cleaning for today')}
        <div class="summary-list">
          <div><span>Today</span><strong>${generalDoneToday ? 'Confirmed' : 'Pending'}</strong></div>
        </div>
        <button class="primary" type="button" id="confirm-general-cleaning" ${generalDoneToday ? 'disabled' : ''}>Confirm General Cleaning</button>
      </article>
      <article class="panel warning-panel">
        ${sectionTitle('Under Cleaning', 'Machines currently being serviced.')}
        <div class="machine-stack">
          ${cleaningMachines.length ? cleaningMachines.map((machine) => `
            <div class="machine-status">
              <span><strong>${escapeHtml(machine.machineName)}</strong><small>${escapeHtml(machine.machineType)}</small></span>
              <b>In progress</b>
              <button class="secondary complete-cleaning-btn" type="button" data-machine-id="${machine.id}" data-branch="${escapeHtml(branch)}">Mark Complete</button>
            </div>`).join('') : '<p class="helper">No machines under cleaning right now.</p>'}
        </div>
      </article>
      <article class="panel span-2">
        ${sectionTitle('Tube Cleaning Checklist', 'Track which machines have been cleaned today.')}
        ${renderHtmlTable(
          ['Machine', 'Type', 'Status', 'Notes', 'Date'],
          machines.map((machine) => {
            const record = subcleanings.find((row) => row.machineIds.includes(machine.id) && row.date === today());
            return [
              `<strong>${escapeHtml(machine.machineName)}</strong>`,
              escapeHtml(machine.machineType),
              `<span class="${record ? 'ok' : 'warn'}">${record ? escapeHtml(record.cleaningStatus.replace('_', ' ')) : 'Not Cleaned'}</span>`,
              escapeHtml(record?.notes ?? '-'),
              today(),
            ];
          }),
          'data-table orders-data-table app-record-table tube-checklist-table',
        )}
      </article>
      <article class="panel span-2">
        ${sectionTitle('Cleaning Calendar', calendarTitle)}
        <div class="maintenance-calendar">
          <div class="calendar-weekdays">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label) => `<span>${label}</span>`).join('')}</div>
          <div class="calendar-grid">
            ${calendarDays.map((day) => {
              const tubeCount = day.records.filter((row) => row.cleaningType !== 'general').length;
              const hasGeneral = day.records.some((row) => row.cleaningType === 'general');
              return `<div class="calendar-day ${day.records.length ? 'has-records' : ''} ${day.isCurrentMonth ? '' : 'is-muted'} ${day.isToday ? 'is-today' : ''}">
                <strong>${day.date.getDate()}</strong>
                <span>${hasGeneral ? 'General' : ''}</span>
                <small>${tubeCount ? `${tubeCount} tube` : 'No tube'}</small>
              </div>`;
            }).join('')}
          </div>
        </div>
      </article>
    </section>
    ` : `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('Add Machine', 'Create washer and dryer records')}
        <form id="machine-form" class="form">
          <label>Machine Name<input name="machineName" required placeholder="e.g. Washer 5" /></label>
          <label>Type<select name="machineType"><option value="washer">Washer</option><option value="dryer">Dryer</option></select></label>
          <label>Status<select name="status"><option value="available">Available</option><option value="under_cleaning">Under Cleaning</option><option value="maintenance">Maintenance</option></select></label>
          <input type="hidden" name="branch" value="${escapeHtml(branch)}" />
          <button class="primary" type="submit">Add machine</button>
        </form>
      </article>
      <article class="panel">
        ${sectionTitle('Machines', 'Washer and dryer status')}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Status</div><div>Branch</div><div>Actions</div></div>
          ${machines.map((machine) => `<div class="table-row"><div><strong>${escapeHtml(machine.machineName)}</strong></div><div>${escapeHtml(machine.machineType)}</div><div>${escapeHtml(machine.status.replace('_', ' '))}</div><div>${escapeHtml(machine.branch)}</div>
          <div class="row-actions">
            ${machine.status !== 'inactive' ? `<button class="secondary deactivate-machine-btn" data-id="${machine.id}">Deactivate</button>` : `<button class="secondary activate-machine-btn" data-id="${machine.id}">Activate</button>`}
          </div></div>`).join('') || '<div class="helper">No machines found.</div>'}
        </div>
      </article>
    </section>
    `}
  `;
}

function renderStaff(staff: Staff[], branch: string) {
  return `
    <section class="grid">
      <div class="page-head">
        <div>
          <p class="eyebrow">Team Management</p>
          <h2>Staff Overview</h2>
        </div>
        <button class="primary" id="open-add-staff-modal" type="button">+ Add staff</button>
      </div>

      <article class="panel">
        ${sectionTitle('Staff list', 'Branch: ' + escapeHtml(branch))}
        <div class="table-scroll">
          <div class="table data-table">
            <div class="table-head"><div>Name</div><div>Email</div><div>Role</div><div>Branch</div><div>Status</div><div>Actions</div></div>
            ${staff.length ? staff.map((person) => `<div class="table-row"><div><strong>${escapeHtml(person.name)}</strong></div><div>${escapeHtml(person.email)}</div><div>${escapeHtml(person.role)}</div><div>${escapeHtml(person.branch)}</div><div>${person.isActive !== 0 ? 'Active' : 'Inactive'}</div>
            <div class="row-actions">
              <button class="secondary edit-staff-btn" data-id="${person.id}">Edit</button>
              ${person.isActive !== 0 ? `<button class="secondary deactivate-staff-btn" data-id="${person.id}">Deactivate</button>` : `<button class="secondary activate-staff-btn" data-id="${person.id}">Activate</button>`}
            </div></div>`).join('') : '<div class="helper" style="padding:18px 0">No staff records yet. Click <strong>+ Add staff</strong> to create one.</div>'}
          </div>
        </div>
      </article>
    </section>

    <div class="modal-backdrop" id="add-staff-modal" role="presentation" hidden>
      <div class="receipt-modal staff-modal" role="dialog" aria-modal="true" aria-labelledby="add-staff-title">
        <div class="modal-actions">
          <h3 id="add-staff-title" style="margin:0;flex:1;color:var(--navy)">Add staff member</h3>
          <button class="secondary" type="button" id="close-add-staff-modal">Cancel</button>
        </div>
        <form id="staff-form" class="form">
          <input type="hidden" name="id" />
          <div class="form-row">
            <label>Full name<input name="name" required placeholder="e.g. Maria Santos" /></label>
            <label>Email address<input name="email" type="email" required placeholder="staff@laba101.test" /></label>
          </div>
          <label>Password<input name="password" type="password" value="password" required /></label>
          <div class="form-row">
            <label>Role
              <select name="role">
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label>Branch
              <select name="branch" required>
                ${['Main Store', 'Mintal Branch', 'Gensan Branch'].map((item) => `<option value="${item}" ${item === branch ? 'selected' : ''}>${item}</option>`).join('')}
              </select>
            </label>
          </div>
          <button class="primary" id="staff-save-btn" type="submit">Save staff member</button>
        </form>
      </div>
    </div>
  `;
}

function renderSettings(branch: string, foldRate: number, reportEmail: string) {
  return `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('Settings', 'Device-local configuration')}
        <form id="settings-form" class="form">
          <label>Current branch<select name="branch">
            ${['Main Store', 'Mintal Branch', 'Gensan Branch'].map((item) => `<option value="${item}" ${item === branch ? 'selected' : ''}>${item}</option>`).join('')}
          </select></label>
          <label>Report email<input name="reportEmail" type="email" placeholder="admin@laba101.test" value="${escapeHtml(reportEmail)}" /></label>
          <button class="primary" type="submit">Save settings</button>
        </form>
      </article>
    </section>
  `;
}

function bindNavigation() {
  const logout = () => {
    localStorage.removeItem(sessionKey);
    state.currentUser = null;
    state.tab = 'dashboard';
    state.receiptOrderId = 0;
    state.sidebarOpen = false;
    void render();
  };

  document.querySelector<HTMLButtonElement>('#logout-button')?.addEventListener('click', logout);
  document.querySelector<HTMLButtonElement>('#mobile-logout-button')?.addEventListener('click', logout);
  document.querySelector<HTMLButtonElement>('#mobile-menu-button')?.addEventListener('click', () => {
    state.sidebarOpen = true;
    void render();
  });
  document.querySelector<HTMLButtonElement>('#sidebar-close-button')?.addEventListener('click', () => {
    state.sidebarOpen = false;
    void render();
  });
  document.querySelector<HTMLButtonElement>('#sidebar-backdrop')?.addEventListener('click', () => {
    state.sidebarOpen = false;
    void render();
  });

  document.querySelectorAll<HTMLElement>('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      state.tab = button.dataset.tab as TabKey;
      state.receiptOrderId = 0;
      state.sidebarOpen = false;
      void render();
    });
  });
  document.querySelectorAll<HTMLElement>('[data-quick-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      state.tab = button.dataset.quickTab as TabKey;
      void render();
    });
  });
  document.querySelectorAll<HTMLElement>('[data-receipt]').forEach((button) => {
    button.addEventListener('click', () => {
      state.receiptOrderId = Number(button.dataset.receipt);
      state.printerPanelOpen = false;
      state.printerError = '';
      state.printerStatus = '';
      void render();
    });
  });
  document.querySelector<HTMLButtonElement>('[data-close-receipt]')?.addEventListener('click', () => {
    state.receiptOrderId = 0;
    void render();
  });
  document.querySelector<HTMLButtonElement>('[data-open-printer-panel]')?.addEventListener('click', () => {
    state.printerPanelOpen = !state.printerPanelOpen;
    void (state.printerPanelOpen && state.pairedPrinters.length === 0 ? loadPairedPrinters() : render());
  });
  document.querySelector<HTMLButtonElement>('[data-refresh-printers]')?.addEventListener('click', () => {
    void loadPairedPrinters();
  });
  document.querySelector<HTMLSelectElement>('[data-printer-select]')?.addEventListener('change', (event) => {
    state.selectedPrinterAddress = (event.currentTarget as HTMLSelectElement).value;
    void render();
  });
  document.querySelector<HTMLSelectElement>('[data-paper-width]')?.addEventListener('change', (event) => {
    state.printerPaperWidth = Number((event.currentTarget as HTMLSelectElement).value) === 80 ? 80 : 58;
    void render();
  });
  document.querySelector<HTMLButtonElement>('[data-connect-printer]')?.addEventListener('click', () => {
    void connectSelectedPrinter();
  });
  document.querySelector<HTMLButtonElement>('[data-thermal-print]')?.addEventListener('click', () => {
    void (async () => {
      const data = await loadData();
      const order = data.orders.find((item) => item.id === state.receiptOrderId);
      if (!order) throw new Error('Receipt order not found.');
      const orderPayments = data.payments.filter((payment) => payment.orderId === order.id);
      await thermalPrintCurrentReceipt(order, orderPayments);
    })().catch((error) => {
      state.printerPanelOpen = true;
      state.printerError = error instanceof Error ? error.message : 'Bluetooth thermal print failed.';
      void render();
    });
  });
  document.querySelector<HTMLButtonElement>('[data-open-daily-summary]')?.addEventListener('click', () => {
    state.dashboardSummaryModalOpen = true;
    void render();
  });
  document.querySelector<HTMLButtonElement>('[data-close-daily-summary]')?.addEventListener('click', () => {
    state.dashboardSummaryModalOpen = false;
    void render();
  });
  document.querySelector<HTMLButtonElement>('[data-print-dashboard]')?.addEventListener('click', (event) => {
    const button = event.currentTarget as HTMLButtonElement;
    const metricsJson = button.dataset.metrics;
    if (metricsJson) {
      try {
        const metrics = JSON.parse(metricsJson);
        void thermalPrintDashboardSummary(metrics);
      } catch (error) {
        console.error('Failed to parse dashboard metrics:', error);
      }
    }
  });
  document.querySelectorAll<HTMLElement>('[data-report-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      state.dailyReportTab = button.dataset.reportTab as 'expenses' | 'sales';
      void render();
    });
  });
  document.querySelectorAll<HTMLElement>('[data-maintenance-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      state.maintenanceTab = button.dataset.maintenanceTab as 'cleaning' | 'machines';
      void render();
    });
  });
}

function bindLoginForm() {
  bindLoginShortcuts();
  document.querySelector<HTMLFormElement>('#login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget as HTMLFormElement);
    const button = document.querySelector<HTMLButtonElement>('#login-button');
    if (button) {
      button.disabled = true;
      button.textContent = 'Signing in...';
    }
    try {
      const user = await authenticateUser(String(fd.get('email') ?? ''), String(fd.get('password') ?? ''));
      if (!user) {
        state.loginError = 'Invalid email or password.';
        await render();
        return;
      }

      state.currentUser = user;
      state.loginError = '';
      await setSetting('branch', String(user.branch || 'Main Store'));
      if (fd.get('remember')) localStorage.setItem(sessionKey, JSON.stringify({ email: user.email, remembered: true }));
      else localStorage.removeItem(sessionKey);
      if (!visibleTabs().includes(state.tab)) state.tab = 'dashboard';
      await render();
    } catch (e: any) {
      alert('Login Error: ' + String(e?.message || e));
      if (button) {
        button.disabled = false;
        button.textContent = 'Sign in';
      }
    }
  });
}

function bindDashboardClock() {
  if (dashboardClockTimer) window.clearInterval(dashboardClockTimer);
  const timeTarget = document.querySelector<HTMLElement>('[data-navbar-time]');
  const dateTarget = document.querySelector<HTMLElement>('[data-navbar-date]');
  if (!timeTarget || !dateTarget) {
    dashboardClockTimer = undefined;
    return;
  }
  const update = () => {
    const display = dashboardDateTime();
    timeTarget.textContent = display.time;
    dateTarget.textContent = display.date;
  };
  update();
  dashboardClockTimer = window.setInterval(update, 1000);
}

function defaultCategoryForService(service: LaundryService | undefined, categories: ItemCategory[]) {
  if (!service) return null;
  return categories.find((category) => category.name.toLowerCase() === service.category.toLowerCase())
    ?? categories.find((category) => category.name === 'Regular Clothes')
    ?? categories[0]
    ?? null;
}

function defaultWeightForService(service: LaundryService, category: ItemCategory) {
  return Math.max(1, Number(category.maxKg || service.maxKg || 1));
}

function serviceQuantitiesFromForm(form: HTMLFormElement, services: LaundryService[]) {
  return Object.fromEntries(
    services
      .filter((service) => service.serviceType === 'order')
      .map((service) => [service.id, Number((form.querySelector<HTMLInputElement>(`input[name="serviceQty-${service.id}"]`)?.value ?? 0))])
      .filter(([, quantity]) => Number(quantity) > 0),
  ) as Record<number, number>;
}

function serviceInputsFromForm(form: HTMLFormElement, services: LaundryService[]) {
  const quantities = serviceQuantitiesFromForm(form, services);
  return services
    .filter((service) => service.serviceType === 'order' && Number(quantities[service.id] ?? 0) > 0)
    .map((service) => ({ ...service, quantity: Number(quantities[service.id]) }));
}

function addonQuantitiesFromForm(form: HTMLFormElement, services: LaundryService[]) {
  return Object.fromEntries(
    services
      .filter((service) => service.serviceType === 'addon')
      .map((service) => [service.id, Number((form.querySelector<HTMLInputElement>(`input[name="addonQty-${service.id}"]`)?.value ?? 0))])
      .filter(([, quantity]) => Number(quantity) > 0),
  ) as Record<number, number>;
}

function addonInputsFromForm(form: HTMLFormElement, services: LaundryService[]) {
  const quantities = addonQuantitiesFromForm(form, services);
  return services
    .filter((service) => service.serviceType === 'addon' && Number(quantities[service.id] ?? 0) > 0)
    .map((service) => ({ ...service, quantity: Number(quantities[service.id]) }));
}

function bindOrderForms(data: Awaited<ReturnType<typeof loadData>>) {
  const form = document.querySelector<HTMLFormElement>('#order-form');
  const preview = document.querySelector<HTMLDivElement>('#price-preview');
  const saveButton = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  const customerNameInput = document.querySelector<HTMLInputElement>('#customer-name-input');
  const customerIdInput = document.querySelector<HTMLInputElement>('#customer-id-input');
  const customerPhoneInput = document.querySelector<HTMLInputElement>('#customer-phone-input');
  const suggestionsBox = document.querySelector<HTMLDivElement>('#customer-suggestions');
  const orderError = form?.querySelector<HTMLElement>('[data-order-error]');
  const paymentMethod = form?.querySelector<HTMLSelectElement>('select[name="paymentMethod"]');
  const paymentReferenceWrap = form?.querySelector<HTMLElement>('.gcash-reference');
  const paymentReference = form?.querySelector<HTMLInputElement>('input[name="paymentReference"]');
  let orderSubmitAttempted = false;

  /* ───── Customer autocomplete ───── */
  let acDebounce: number | undefined;
  const showSuggestions = (query: string) => {
    if (!suggestionsBox || !customerNameInput) return;
    const q = query.trim().toLowerCase();
    if (!q) { suggestionsBox.hidden = true; return; }
    const matches = data.customers
      .filter((c) => c.name.toLowerCase().includes(q) || (c.phone ?? '').includes(q))
      .slice(0, 8);
    const addNewHtml = `<div class="ac-item ac-add" data-ac-new="true"><strong>+ Add new: "${escapeHtml(query.trim())}"</strong></div>`;
    const matchHtml = matches.map((c) =>
      `<div class="ac-item" data-ac-id="${c.id}" data-ac-name="${escapeHtml(c.name)}" data-ac-phone="${escapeHtml(c.phone ?? '')}"><strong>${escapeHtml(c.name)}</strong>${c.phone ? `<span>${escapeHtml(c.phone)}</span>` : ''}</div>`
    ).join('');
    suggestionsBox.innerHTML = matchHtml + addNewHtml;
    suggestionsBox.hidden = false;
  };
  customerNameInput?.addEventListener('input', () => {
    if (customerIdInput) customerIdInput.value = '';
    clearTimeout(acDebounce);
    acDebounce = window.setTimeout(() => showSuggestions(customerNameInput.value), 150);
  });
  customerNameInput?.addEventListener('focus', () => {
    if (customerNameInput.value.trim()) showSuggestions(customerNameInput.value);
  });
  suggestionsBox?.addEventListener('click', (event) => {
    const item = (event.target as HTMLElement).closest<HTMLElement>('.ac-item');
    if (!item) return;
    if (item.dataset.acNew === 'true') {
      // Keep name as-is, clear id so a new customer will be created
      if (customerIdInput) customerIdInput.value = '';
    } else {
      if (customerNameInput) customerNameInput.value = item.dataset.acName ?? '';
      if (customerPhoneInput) customerPhoneInput.value = item.dataset.acPhone ?? '';
      if (customerIdInput) customerIdInput.value = item.dataset.acId ?? '';
    }
    if (suggestionsBox) suggestionsBox.hidden = true;
  });
  document.addEventListener('click', (event) => {
    if (suggestionsBox && !suggestionsBox.contains(event.target as Node) && event.target !== customerNameInput) {
      suggestionsBox.hidden = true;
    }
  });

  /* ───── GCash reference toggle ───── */
  const syncGcashReference = () => {
    const isGcash = paymentMethod?.value === 'gcash';
    if (paymentReferenceWrap) paymentReferenceWrap.hidden = !isGcash;
    if (paymentReference) {
      paymentReference.required = isGcash;
      if (!isGcash) paymentReference.value = '';
    }
  };

  /* ───── Quantity +/- helpers ───── */
  const setQuantity = (name: string, delta: number) => {
    if (!form) return;
    const input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (!input) return;
    input.value = String(Math.max(0, Number(input.value || 0) + delta));
    input.closest<HTMLElement>('.qty-card')?.classList.toggle('is-selected', Number(input.value) > 0);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  };
  form?.querySelectorAll<HTMLInputElement>('.qty-control input').forEach((input) => {
    input.addEventListener('input', () => {
      input.value = String(Math.max(0, Number(input.value || 0)));
      input.closest<HTMLElement>('.qty-card')?.classList.toggle('is-selected', Number(input.value) > 0);
    });
  });
  form?.querySelectorAll<HTMLElement>('[data-qty-card]').forEach((card) => {
    card.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.closest('input') || target.closest('button')) return;
      setQuantity(card.dataset.qtyCard ?? '', 1);
    });
  });
  form?.querySelectorAll<HTMLButtonElement>('[data-qty-plus]').forEach((button) => {
    button.addEventListener('click', () => setQuantity(button.dataset.qtyPlus ?? '', 1));
  });
  form?.querySelectorAll<HTMLButtonElement>('[data-qty-minus]').forEach((button) => {
    button.addEventListener('click', () => setQuantity(button.dataset.qtyMinus ?? '', -1));
  });

  /* ───── Price preview (supports addon-only) ───── */
  const refreshPreview = () => {
    if (!form || !preview) return;
    const selectedServices = serviceInputsFromForm(form, data.services);
    const primaryService = selectedServices[0];
    const category = defaultCategoryForService(primaryService, data.categories);
    const addons = addonInputsFromForm(form, data.services);
    const hasServices = selectedServices.length > 0 && primaryService && category;
    const hasAddons = addons.length > 0;

    if (!hasServices && !hasAddons) {
      if (saveButton) saveButton.disabled = true;
      if (orderError) {
        orderError.hidden = !orderSubmitAttempted;
        orderError.textContent = orderSubmitAttempted ? 'Please select at least one service or extra service.' : '';
      }
      preview.innerHTML = '<div class="preview-total"><span>Total amount</span><strong>PHP 0.00</strong></div>';
      return;
    }

    if (hasServices) {
      const price = calculatePricing(selectedServices, category!, defaultWeightForService(primaryService!, category!), addons);
      const selectedServiceLabels = price.serviceLines.map((line) => `${line.name} x${line.quantity}`);
      const selectedExtras = price.extras.map((addon) => `${cleanAddonName(addon.name)} x${addon.quantity}`);
      if (saveButton) saveButton.disabled = false;
      if (orderError) { orderError.hidden = true; orderError.textContent = ''; }
      preview.classList.remove('has-error');
      preview.innerHTML = `
        <div class="preview-line"><span>Services${selectedServiceLabels.length ? ` (${escapeHtml(selectedServiceLabels.join(', '))})` : ''}</span><strong>${money(price.price)}</strong></div>
        ${price.extraServiceAmount > 0 ? `<div class="preview-line"><span>Extra services${selectedExtras.length ? ` (${escapeHtml(selectedExtras.join(', '))})` : ''}</span><strong>${money(price.extraServiceAmount)}</strong></div>` : ''}
        <div class="preview-total"><span>Total amount</span><strong>${money(price.totalAmount)}</strong></div>
      `;
    } else {
      // Addon-only order – compute extras total manually
      const extrasTotal = addons.reduce((sum, a) => sum + (a.price * (a.quantity ?? 1)), 0);
      const selectedExtras = addons.map((addon) => `${cleanAddonName(addon.name)} x${addon.quantity ?? 1}`);
      if (saveButton) saveButton.disabled = false;
      if (orderError) { orderError.hidden = true; orderError.textContent = ''; }
      preview.classList.remove('has-error');
      preview.innerHTML = `
        <div class="preview-line"><span>Extra services (${escapeHtml(selectedExtras.join(', '))})</span><strong>${money(extrasTotal)}</strong></div>
        <div class="preview-total"><span>Total amount</span><strong>${money(extrasTotal)}</strong></div>
      `;
    }
  };

  paymentMethod?.addEventListener('change', syncGcashReference);
  syncGcashReference();
  form?.addEventListener('input', refreshPreview);
  form?.addEventListener('change', refreshPreview);
  refreshPreview();

  /* ───── Form submit ───── */
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    orderSubmitAttempted = true;
    const fd = new FormData(form);
    const selectedServices = serviceInputsFromForm(form, data.services);
    const primaryService = selectedServices[0];
    const category = defaultCategoryForService(primaryService, data.categories);
    const addons = addonInputsFromForm(form, data.services);
    const hasServices = selectedServices.length > 0 && primaryService && category;
    const hasAddons = addons.length > 0;

    if (!hasServices && !hasAddons) {
      if (orderError) {
        orderError.hidden = false;
        orderError.textContent = 'Please select at least one service or extra service.';
      }
      return;
    }
    const selectedServiceLabels = selectedServices.map((service) => `${service.name} x${service.quantity}`).join(', ');
    const totalPreview = hasServices 
      ? calculatePricing(selectedServices, category!, defaultWeightForService(primaryService!, category!), addons)
      : calculatePricing([], data.categories[0], 1, addons);
    if (!confirm(`Save this order?\n\nServices: ${selectedServiceLabels}\nTotal: ${money(totalPreview.totalAmount)}`)) return;
    try {
      const order = await createOrder({
        customerId: Number(fd.get('customerId')) || undefined,
        customerName: String(fd.get('customerName') ?? ''),
        customerPhone: String(fd.get('customerPhone') ?? '') || null,
        serviceQuantities: serviceQuantitiesFromForm(form, data.services),
        branch: data.branch,
        itemCategoryId: category?.id ?? data.categories[0].id,
        weightKg: primaryService && category ? defaultWeightForService(primaryService, category) : 1,
        addonQuantities: addonQuantitiesFromForm(form, data.services),
        paidAmount: Number(fd.get('paidAmount') ?? 0),
        paymentMethod: String(fd.get('paymentMethod') ?? 'cash') as 'cash' | 'gcash',
        paymentReference: String(fd.get('paymentReference') ?? '') || null,
        notes: String(fd.get('notes') ?? '') || null,
      });
      await recordUiLog('Create order', `${order.ticket} ${money(order.totalAmount)}`);
      state.receiptOrderId = order.id;
      await render();
    } catch (error) {
      if (orderError) {
        orderError.hidden = false;
        orderError.textContent = error instanceof Error ? error.message : 'Order could not be saved.';
      }
    }
  });
  document.querySelectorAll<HTMLFormElement>('.advance-form').forEach((advanceForm) => {
    advanceForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const orderId = Number(advanceForm.dataset.orderId);
      const isClaim = advanceForm.dataset.action === 'claim';
      const balance = Number(advanceForm.dataset.balance || 0);

      if (isClaim && balance > 0) {
        alert('Please complete the balance before claiming this order.');
        return;
      }

      const fd = new FormData(advanceForm);
      const staffIds = fd.getAll('assignedStaffId').map(Number).filter((id) => id > 0);
      const releasedBy = Number(fd.get('releasedBy') || 0);
      const assigned = staffIds.length > 0 ? staffIds : releasedBy > 0 ? releasedBy : null;
      await advanceOrder(orderId, assigned);
      const releasedByName = isClaim && releasedBy > 0 ? data.staff.find((s) => s.id === releasedBy)?.name : null;
      const logDetails = isClaim && releasedByName ? `Order ID ${orderId} (Released by: ${releasedByName})` : `Order ID ${orderId}`;
      await recordUiLog(isClaim ? 'Claim order' : 'Advance order', logDetails);
      await render();
    });
  });

  document.querySelectorAll<HTMLSelectElement>('.fold-staff-select').forEach((select) => {
    select.addEventListener('change', async () => {
      const staffId = Number(select.value);
      if (!staffId) return;
      const orderId = Number(select.dataset.orderId);
      select.disabled = true;
      try {
        await recordOrderFold(orderId, staffId);
        await recordUiLog('Record fold', `Order ID ${orderId} (Fold ${select.dataset.foldNumber ?? ''})`);
        await render();
      } catch (error) {
        select.disabled = false;
        alert(error instanceof Error ? error.message : 'Could not save fold.');
      }
    });
  });

  document.querySelectorAll<HTMLFormElement>('.claim-payment-form').forEach((form) => {
    const method = form.querySelector<HTMLSelectElement>('select[name="method"]');
    const reference = form.querySelector<HTMLInputElement>('input[name="reference"]');
    const syncRowPayment = () => {
      const isGcash = method?.value === 'gcash';
      if (reference) {
        reference.closest('label')!.hidden = !isGcash;
        reference.required = isGcash;
        if (!isGcash) reference.value = '';
      }
    };
    method?.addEventListener('change', syncRowPayment);
    syncRowPayment();

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const fd = new FormData(form);
      const amount = Number(fd.get('amount'));
      if (amount <= 0) return;
      const orderId = Number(form.dataset.orderId);
      await recordPayment(orderId, {
        amount,
        method: String(fd.get('method')) as 'cash' | 'gcash',
        reference: String(fd.get('reference') ?? '') || null,
      });
      await advanceOrder(orderId, null);
      state.paymentModalOrderId = 0;
      await render();
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-close-payment-modal]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.paymentModalOrderId = 0;
      await render();
    });
  });
  document.querySelectorAll<HTMLFormElement>('.payment-form').forEach((paymentForm) => {
    const method = paymentForm.querySelector<HTMLSelectElement>('select[name="method"]');
    const reference = paymentForm.querySelector<HTMLInputElement>('input[name="reference"]');
    const syncRowPayment = () => {
      const isGcash = method?.value === 'gcash';
      if (reference) {
        reference.hidden = !isGcash;
        reference.required = isGcash;
        if (!isGcash) reference.value = '';
      }
    };
    method?.addEventListener('change', syncRowPayment);
    syncRowPayment();
    paymentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const fd = new FormData(paymentForm);
      const amount = Number(fd.get('amount'));
      const method = String(fd.get('method')) as 'cash' | 'gcash';
      const reference = String(fd.get('reference') ?? '') || null;
      
      if (!confirm(`Confirm payment of ${money(amount)} via ${method.toUpperCase()}?`)) return;
      
      await recordPayment(Number(paymentForm.dataset.orderId), { amount, method, reference });
      await recordUiLog('Record payment', `${money(amount)} ${method.toUpperCase()} for order ID ${paymentForm.dataset.orderId}`);
      await render();
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-cancel-order]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const orderId = Number(btn.dataset.cancelOrder);
      if (!Number.isFinite(orderId)) return;
      if (!confirm('Cancel this order? (No payment will be refunded.)')) return;
      try {
        if (state.receiptOrderId === orderId) state.receiptOrderId = 0;
        await cancelOrder(orderId);
        await recordUiLog('Cancel order', `Order ID ${orderId}`);
        await render();
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Cancel failed.');
      }
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-delete-order]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const orderId = Number(btn.dataset.deleteOrder);
      if (!Number.isFinite(orderId)) return;
      if (!confirm('Delete this paid order and update sales?')) return;
      try {
        if (state.receiptOrderId === orderId) state.receiptOrderId = 0;
        await deleteOrderForRefund(orderId);
        await render();
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Delete failed.');
      }
    });
  });
}

function bindPricingForms(services: LaundryService[]) {
  document.querySelector<HTMLFormElement>('#service-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const id = fd.get('id') ? Number(fd.get('id')) : undefined;
    await saveService({
      id,
      name: String(fd.get('name') ?? ''),
      description: String(fd.get('description') ?? '') || null,
      category: String(fd.get('category') ?? ''),
      serviceType: String(fd.get('serviceType') ?? 'order') as 'order' | 'addon',
      price: Number(fd.get('price') ?? 0),
      maxKg: Number(fd.get('maxKg') ?? 0),
      dryingMinutes: Number(fd.get('dryingMinutes')) || null,
      includes: fd.getAll('includes').map(String).filter(Boolean),
      additionalCharge: 0,
      turnaroundHours: Number(fd.get('turnaroundHours') ?? 24),
      isActive: 1,
    });
    await render();
  });
  
  document.querySelectorAll<HTMLButtonElement>('.edit-service-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const service = services.find((s) => s.id === id);
      const form = document.querySelector<HTMLFormElement>('#service-form');
      if (service && form) {
        (form.querySelector('[name=id]') as HTMLInputElement).value = String(service.id);
        (form.querySelector('[name=name]') as HTMLInputElement).value = service.name;
        (form.querySelector('[name=category]') as HTMLInputElement).value = service.category;
        (form.querySelector('[name=serviceType]') as HTMLSelectElement).value = service.serviceType;
        (form.querySelector('[name=price]') as HTMLInputElement).value = String(service.price);
        (form.querySelector('[name=maxKg]') as HTMLInputElement).value = String(service.maxKg);
        (form.querySelector('[name=dryingMinutes]') as HTMLInputElement).value = service.dryingMinutes ? String(service.dryingMinutes) : '';
        form.querySelectorAll<HTMLInputElement>('input[name="includes"]').forEach((input) => {
          input.checked = service.includes.includes(input.value);
        });
        (form.querySelector('[name=turnaroundHours]') as HTMLInputElement).value = String(service.turnaroundHours);
        (form.querySelector('[name=description]') as HTMLTextAreaElement).value = service.description ?? '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll<HTMLButtonElement>('.deactivate-service-btn, .activate-service-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = Number(btn.dataset.id);
      const service = services.find((s) => s.id === id);
      if (service) {
        const newActive = service.isActive ? 0 : 1;
        await saveService({
          id: service.id,
          name: service.name,
          description: service.description,
          category: service.category,
          serviceType: service.serviceType,
          price: service.price,
          maxKg: service.maxKg,
          dryingMinutes: service.dryingMinutes,
          includes: service.includes,
          additionalCharge: service.additionalCharge,
          turnaroundHours: service.turnaroundHours,
          isActive: newActive,
        });
        await render();
      }
    });
  });

  document.querySelector<HTMLFormElement>('#category-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    await saveItemCategory({ name: String(fd.get('name') ?? ''), maxKg: Number(fd.get('maxKg') ?? 0), additionalFee: Number(fd.get('additionalFee') ?? 0), isActive: 1 });
    await render();
  });
}

function bindDisbursementForms(expenses: DisbursementExpense[]) {
  const expenseForm = document.querySelector<HTMLFormElement>('#expense-form');
  const expenseTypeInput = expenseForm?.querySelector<HTMLInputElement>('input[name="disbursementType"]');
  const expenseDateField = expenseForm?.querySelector<HTMLElement>('.expense-date-field');
  const expenseMonthField = expenseForm?.querySelector<HTMLElement>('.expense-month-field');
  const expenseDateInput = expenseForm?.querySelector<HTMLInputElement>('input[name="expenseDate"]');
  const expenseMonthInput = expenseForm?.querySelector<HTMLInputElement>('input[name="expenseMonth"]');
  const setExpenseType = (type: 'daily' | 'monthly') => {
    if (!expenseForm || !expenseTypeInput || !expenseDateInput || !expenseMonthInput) return;
    expenseTypeInput.value = type;
    expenseForm.querySelectorAll<HTMLButtonElement>('[data-expense-type]').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.expenseType === type);
    });
    if (expenseDateField) expenseDateField.hidden = type === 'monthly';
    if (expenseMonthField) expenseMonthField.hidden = type !== 'monthly';
    expenseDateInput.required = type === 'daily';
    expenseMonthInput.required = type === 'monthly';
    if (type === 'monthly' && !expenseMonthInput.value) expenseMonthInput.value = currentMonthInput();
    if (type === 'daily' && !expenseDateInput.value) expenseDateInput.value = today();
  };
  expenseForm?.querySelectorAll<HTMLButtonElement>('[data-expense-type]').forEach((button) => {
    button.addEventListener('click', () => setExpenseType(button.dataset.expenseType === 'monthly' ? 'monthly' : 'daily'));
  });
  setExpenseType('daily');
  expenseForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const id = Number(fd.get('id') || 0);
    const disbursementType = String(fd.get('disbursementType') ?? 'daily') === 'monthly' ? 'monthly' : 'daily';
    const monthValue = String(fd.get('expenseMonth') ?? currentMonthInput());
    const input = {
      expenseDate: disbursementType === 'monthly' ? `${monthValue}-01` : String(fd.get('expenseDate') ?? ''),
      disbursementType,
      name: String(fd.get('name') ?? ''),
      category: String(fd.get('category') ?? ''),
      description: String(fd.get('description') ?? ''),
      amount: Number(fd.get('amount') ?? 0),
    };
    if (disbursementType === 'daily' && input.expenseDate !== today()) {
      const password = prompt('Admin password is required for non-today disbursement dates.');
      if (!password || !(await verifyAdminPassword(password))) {
        alert('Admin password is incorrect. Disbursement was not saved.');
        return;
      }
    }
    if (id) await updateExpense(id, input);
    else await createExpense(input);
    await recordUiLog(id ? 'Update disbursement' : 'Create disbursement', `${input.expenseDate} ${input.name} ${money(input.amount)}`);
    await render();
  });
  document.querySelectorAll<HTMLButtonElement>('.edit-expense-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expense = expenses.find((item) => item.id === Number(btn.dataset.id));
      if (!expense || !expenseForm) return;
      (expenseForm.querySelector('[name=id]') as HTMLInputElement).value = String(expense.id);
      (expenseForm.querySelector('[name=expenseDate]') as HTMLInputElement).value = expense.expenseDate;
      (expenseForm.querySelector('[name=expenseMonth]') as HTMLInputElement).value = expenseMonthValue(expense.expenseDate);
      setExpenseType(expenseType(expense));
      (expenseForm.querySelector('[name=amount]') as HTMLInputElement).value = String(expense.amount);
      (expenseForm.querySelector('[name=name]') as HTMLInputElement).value = expense.name;
      (expenseForm.querySelector('[name=category]') as HTMLSelectElement).value = expense.category;
      (expenseForm.querySelector('[name=description]') as HTMLTextAreaElement).value = expense.description ?? '';
      const submitButton = expenseForm.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (submitButton) submitButton.textContent = 'Update expense';
      expenseForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  document.querySelectorAll<HTMLButtonElement>('.delete-expense-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (state.currentUser?.role !== 'admin') return;
      const id = Number(btn.dataset.id);
      if (!Number.isFinite(id) || !confirm('Delete this disbursement?')) return;
      await deleteExpense(id);
      await render();
    });
  });
  document.querySelector<HTMLFormElement>('#fold-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    await createFoldLog({ orderTicket: String(fd.get('orderTicket') ?? ''), staffName: String(fd.get('staffName') ?? ''), foldCount: Number(fd.get('foldCount') ?? 1), rate: Number(fd.get('rate') ?? 5) });
    await render();
  });
}

function bindReportActions(orders: OrderRow[], payments: Payment[], sales: DailySale[], expenses: DisbursementExpense[], revolvingHistory: RevolvingHistory[], staff: Staff[], foldRate: number) {
  document.querySelector<HTMLButtonElement>('#generate-report')?.addEventListener('click', () => {
    state.reportPreview = currentReportSelection();
    void render();
  });

  const salesForm = document.querySelector<HTMLFormElement>('#sales-form');
  salesForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    await saveDailySale({ id: Number(fd.get('id') || 0) || undefined, saleDate: String(fd.get('saleDate') ?? ''), cashAmount: Number(fd.get('cashAmount') ?? 0), gcashAmount: Number(fd.get('gcashAmount') ?? 0), notes: String(fd.get('notes') ?? '') });
    await render();
  });
  document.querySelectorAll<HTMLButtonElement>('.edit-sale-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sale = sales.find((item) => item.id === Number(btn.dataset.id));
      if (!sale || !salesForm) return;
      (salesForm.querySelector('[name=id]') as HTMLInputElement).value = String(sale.id);
      (salesForm.querySelector('[name=saleDate]') as HTMLInputElement).value = sale.saleDate;
      (salesForm.querySelector('[name=cashAmount]') as HTMLInputElement).value = String(sale.cashAmount);
      (salesForm.querySelector('[name=gcashAmount]') as HTMLInputElement).value = String(sale.gcashAmount);
      (salesForm.querySelector('[name=notes]') as HTMLTextAreaElement).value = sale.notes ?? '';
      const submitButton = salesForm.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (submitButton) submitButton.textContent = 'Update daily sale';
      salesForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  document.querySelectorAll<HTMLButtonElement>('.delete-sale-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (state.currentUser?.role !== 'admin') return;
      const id = Number(btn.dataset.id);
      if (!Number.isFinite(id) || !confirm('Delete this daily sale?')) return;
      await deleteDailySale(id);
      await render();
    });
  });
  const dateFromInput = document.querySelector<HTMLInputElement>('[data-date-from]');
  const dateToInput = document.querySelector<HTMLInputElement>('[data-date-to]');
  const customRadio = document.querySelector<HTMLInputElement>('[data-date-scope][value="custom"]');
  if (dateFromInput && customRadio) {
    dateFromInput.addEventListener('change', () => customRadio.checked = true);
  }
  if (dateToInput && customRadio) {
    dateToInput.addEventListener('change', () => customRadio.checked = true);
  }
  document.querySelectorAll<HTMLInputElement>('[data-date-scope]').forEach((input) => {
    input.addEventListener('change', () => {
      if (!input.checked || !dateFromInput || !dateToInput) return;
      const now = new Date();
      const toIso = localDateInput(now);
      const from = new Date(now);
      if (input.value === 'week') from.setDate(now.getDate() - 6);
      if (input.value === 'month') from.setDate(1);
      if (input.value === 'custom') return;
      dateFromInput.value = input.value === 'today' ? toIso : localDateInput(from);
      dateToInput.value = toIso;
    });
  });

  const workbookFromSheets = (sheets: Array<{ name: string; rows: Array<Array<string | number>> }>) => {
    const xmlEscape = (value: string | number | null | undefined) => String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;');
    const columnsForSheet = (sheetName: string) => {
      if (sheetName === 'Sales Report') {
        return [110, 125, 150, 215, 95, 95, 105, 105];
      }

      if (sheetName === 'Disbursement') {
        return [115, 115, 90, 150, 150, 220, 105];
      }

      if (sheetName === 'Fold Count') {
        return [220, 125];
      }

      if (sheetName === 'Revolving Daily Summary') {
        return [115, 105, 120, 115];
      }

      if (sheetName === 'Revolving History') {
        return [115, 96, 140, 96, 110, 180, 120];
      }

      return [155, 125, 125, 125, 95, 95, 115, 115];
    };
    const sheetXml = sheets.map((sheet) => {
      const columnWidths = columnsForSheet(sheet.name);
      const maxColumns = Math.max(columnWidths.length, ...sheet.rows.map((row) => row.length), 1);
      const rowCount = Math.max(sheet.rows.length, 1);
      const columnXml = columnWidths
        .map((width) => `<Column ss:Width="${width}" ss:AutoFitWidth="0"/>`)
        .join('');
      const rowXml = sheet.rows.map((row) => {
        if (!row.length) return '<Row ss:Height="10" ss:StyleID="BorderRow"><Cell ss:StyleID="BorderCell"><Data ss:Type="String">&nbsp;</Data></Cell></Row>';
        const isHeaderRow = row[0] === 'Type' || row[0] === 'Summary' || row[0] === 'Sales Summary' || row[0] === 'Disbursement Summary' || row[0] === 'Staff' || row[0] === 'Date of Sales' || row[0] === 'Date' || row[0] === 'Date/Month' || row[0] === 'Ticket';
        const rowStyle = isHeaderRow ? 'HeaderRow' : 'BorderRow';
        const cellStyle = isHeaderRow ? 'HeaderCell' : 'BorderCell';
        const rowHeight = isHeaderRow ? 26 : 22;
        const cells = row.map((cell) => `<Cell ss:StyleID="${cellStyle}"><Data ss:Type="${typeof cell === 'number' ? 'Number' : 'String'}">${xmlEscape(cell)}</Data></Cell>`).join('');
        return `<Row ss:Height="${rowHeight}" ss:StyleID="${rowStyle}">${cells}</Row>`;
      }).join('');
      return `
        <Worksheet ss:Name="${xmlEscape(sheet.name)}">
          <Table ss:ExpandedColumnCount="${maxColumns}" ss:ExpandedRowCount="${rowCount}">
            ${columnXml}
            ${rowXml}
          </Table>
        </Worksheet>`;
    }).join('');
    return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
  <Styles>
    <Style ss:ID="BorderCell">
      <Alignment ss:Vertical="Center" ss:WrapText="1" />
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
      </Borders>
    </Style>
    <Style ss:ID="HeaderCell">
      <Alignment ss:Vertical="Center" ss:WrapText="1" />
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
      </Borders>
      <Font ss:Bold="1" ss:Color="#FFFFFF" />
      <Interior ss:Color="#061a42" ss:Pattern="Solid" />
    </Style>
    <Style ss:ID="BorderRow">
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
      </Borders>
    </Style>
    <Style ss:ID="HeaderRow">
      <Alignment ss:Vertical="Center" ss:WrapText="1" />
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" />
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" />
      </Borders>
      <Font ss:Bold="1" ss:Color="#FFFFFF" />
      <Interior ss:Color="#061a42" ss:Pattern="Solid" />
    </Style>
  </Styles>
  ${sheetXml}
</Workbook>`;
  };
  const reportFile = () => {
    const selection = currentReportSelection();
    const report = buildReportData(orders, payments, sales, expenses, revolvingHistory, staff, foldRate, selection);
    const sheets: Array<{ name: string; rows: Array<Array<string | number>> }> = [];
    if (report.selectedTypes.has('sales')) {
      const salesData = report.salesRows();
      const salesRows: Array<Array<string | number>> = [
        ['Ticket', 'Customer', 'Cash', 'GCash', 'Total Payment'],
        ...salesData.transactions.map((tx) => [tx.ticket, tx.customer, tx.cash, tx.gcash, tx.total]),
        [],
        ['Cash from Orders', 'GCash from Orders', 'Sales from Orders'],
        [salesData.orderCashTotal, salesData.orderGcashTotal, salesData.orderCashTotal + salesData.orderGcashTotal],
        [],
        ['Cash Whole Sale', 'GCash Whole Sale', 'Whole Sale of Day'],
        [salesData.manualCashTotal, salesData.manualGcashTotal, salesData.manualCashTotal + salesData.manualGcashTotal],
        [],
        ['Total Cash', 'Total GCash', 'Total Sales'],
        [salesData.totalCash, salesData.totalGcash, salesData.totalSales],
      ];
      sheets.push({ name: 'Sales Report', rows: salesRows });
    }
    if (report.selectedTypes.has('disbursement')) sheets.push({ name: 'Disbursement', rows: report.disbursementRows().rows });
    if (report.selectedTypes.has('fold_count')) sheets.push({ name: 'Fold Count', rows: report.foldCountRows().rows });
    if (report.selectedTypes.has('revolving_fund')) {
      sheets.push({ name: 'Revolving Daily Summary', rows: report.revolvingDailySummaryRows().rows });
      sheets.push({ name: 'Revolving History', rows: report.revolvingHistoryRows().rows });
    }
    if (report.selectedTypes.has('summary')) sheets.push({ name: 'Summary', rows: report.summaryRows() });
    const html = workbookFromSheets(sheets.length ? sheets : [{ name: 'Summary', rows: report.summaryRows() }]);
    const fileName = `laba101-report-${selection.from}-to-${selection.to}.xls`;
    return { fileName, content: html };
  };
  const saveReportToDevice = async () => {
    const { fileName, content } = reportFile();
    if (!Capacitor.isNativePlatform()) {
      return { fileName, uri: '' };
    }

    const path = fileName;
    await Filesystem.writeFile({
      path,
      data: content,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
      recursive: true,
    });
    const { uri } = await Filesystem.getUri({ path, directory: Directory.Cache });
    return { fileName, uri };
  };
  const downloadReport = () => {
    const { fileName, content } = reportFile();
    const blob = new Blob([content], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => { link.remove(); URL.revokeObjectURL(url); }, 1000);
    return fileName;
  };

  const shareOrDownloadReport = async (mode: 'export' | 'email') => {
    const btn = document.querySelector<HTMLButtonElement>(mode === 'export' ? '#export-report' : '#email-report');
    if (btn) { btn.disabled = true; btn.textContent = mode === 'export' ? 'Exporting...' : 'Sending...'; }
    try {
      if (mode === 'export') {
        if (Capacitor.isNativePlatform()) {
          const saved = await saveReportToDevice();
          alert(`Report exported as "${saved.fileName}".`);
        } else {
          const fileName = downloadReport();
          alert(`Report saved: ${fileName}`);
        }
      } else {
        const email = await getSetting('report_email') || '';
        if (!email) {
          alert('Please configure a report email in Settings first.');
          return;
        }
        const selection = currentReportSelection();
        const title = `Laba101 report ${selection.from} to ${selection.to}`;
        if (Capacitor.isNativePlatform()) {
          const saved = await saveReportToDevice();
          try {
            await Share.share({
              title,
              text: `Please find the attached Laba101 report file: ${saved.fileName}`,
              files: [saved.uri],
              dialogTitle: 'Send report via email',
            });
            alert(`Report saved and shared as "${saved.fileName}".`);
          } catch (shareError) {
            const message = String(shareError).toLowerCase();
            if (message.includes('share canceled') || message.includes('canceled')) {
              alert(`Report saved as "${saved.fileName}".`);
            } else {
              throw shareError;
            }
          }
        } else {
          const fileName = downloadReport();
          const body = `Hi,\n\nPlease find the attached Laba101 report file: ${fileName}\n\nDate range: ${selection.from} to ${selection.to}`;
          const mailto = `mailto:${email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
          setTimeout(() => { window.location.href = mailto; }, 800);
          alert(`Report downloaded as "${fileName}".\nYour email app will open — please attach the file and send.`);
        }
      }
    } catch (err) {
      alert('Failed: ' + String(err));
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = mode === 'export' ? 'Export Excel' : 'Send to Email'; }
    }
  };

  document.querySelector<HTMLButtonElement>('#export-report')?.addEventListener('click', async () => {
    await shareOrDownloadReport('export');
  });
  document.querySelector<HTMLButtonElement>('#email-report')?.addEventListener('click', async () => {
    await shareOrDownloadReport('email');
  });
}

function bindOrderFilters() {
  document.querySelector<HTMLFormElement>('#order-queue-filters')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    state.orderSearch = String(fd.get('orderSearch') ?? '').trim();
    state.orderDateFilter = String(fd.get('orderDateFilter') ?? '').trim();
    state.orderPaymentFilter = String(fd.get('orderPaymentFilter') ?? '').trim();
    void render();
  });

  document.querySelector<HTMLButtonElement>('#order-queue-clear')?.addEventListener('click', () => {
    state.orderSearch = '';
    state.orderDateFilter = '';
    state.orderPaymentFilter = '';
    void render();
  });

  document.querySelector<HTMLFormElement>('#archived-order-filters')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    state.archivedOrderSearch = String(fd.get('archivedOrderSearch') ?? '').trim();
    void render();
  });

  document.querySelector<HTMLButtonElement>('#archived-order-clear')?.addEventListener('click', () => {
    state.archivedOrderSearch = '';
    void render();
  });
}

function bindCustomerSearch() {
  document.querySelector<HTMLFormElement>('#customer-search-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    state.customerSearch = String(fd.get('customerSearch') ?? '').trim();
    void render();
  });

  document.querySelector<HTMLButtonElement>('#customer-search-clear')?.addEventListener('click', () => {
    state.customerSearch = '';
    void render();
  });
}

function bindMaintenanceForms() {
  document.querySelector<HTMLFormElement>('#machine-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    await saveMachine({ machineName: String(fd.get('machineName') ?? ''), machineType: String(fd.get('machineType')) as 'washer' | 'dryer', status: String(fd.get('status')) as 'available' | 'under_cleaning' | 'maintenance', branch: String(fd.get('branch') ?? '') });
    await render();
  });
  document.querySelector<HTMLFormElement>('#subcleaning-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const btn = (event.currentTarget as HTMLFormElement).querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Starting...'; }
    const fd = new FormData(event.currentTarget as HTMLFormElement);
    const machineIds = fd.getAll('machineIds').map(Number);
    if (!machineIds.length) {
      alert('Please select at least one machine to clean.');
      if (btn) { btn.disabled = false; btn.textContent = 'Start Cleaning'; }
      return;
    }
    await saveSubcleaning({ date: String(fd.get('date') ?? ''), machineIds, cleaningStatus: String(fd.get('cleaningStatus') ?? ''), cleaningType: 'tube', notes: String(fd.get('notes') ?? ''), branch: String(fd.get('branch') ?? '') });
    await recordUiLog('Start tube cleaning', `${machineIds.length} machine(s)`);
    await render();
  });
  document.querySelector<HTMLButtonElement>('#confirm-general-cleaning')?.addEventListener('click', async () => {
    await confirmGeneralCleaning((document.querySelector<HTMLInputElement>('input[name="branch"]')?.value || state.currentUser?.branch || 'Main Store'), state.currentUser?.name ?? 'Unknown');
    await recordUiLog('Confirm general cleaning', today());
    await render();
  });
  // Complete cleaning buttons
  document.querySelectorAll<HTMLButtonElement>('.complete-cleaning-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const machineId = Number(btn.dataset.machineId);
      const branch = btn.dataset.branch ?? '';
      btn.disabled = true;
      btn.textContent = 'Completing...';
      await completeCleaning(machineId, branch);
      await recordUiLog('Complete tube cleaning', `Machine ID ${machineId}`);
      await render();
    });
  });

  document.querySelectorAll<HTMLButtonElement>('.deactivate-machine-btn, .activate-machine-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = Number(btn.dataset.id);
      const isDeactivate = btn.classList.contains('deactivate-machine-btn');
      await updateMachine(id, isDeactivate ? 'inactive' : 'available');
      await render();
    });
  });
}

function bindInventoryForms(items: InventoryItem[], branch: string) {
  const form = document.querySelector<HTMLFormElement>('#inventory-form');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const id = Number(fd.get('id') || 0);
    await saveInventoryItem({
      id: id || undefined,
      name: String(fd.get('name') ?? ''),
      unit: String(fd.get('unit') ?? ''),
      quantity: Number(fd.get('quantity') ?? 0),
      reorderLevel: Number(fd.get('reorderLevel') ?? 0),
      notes: String(fd.get('notes') ?? ''),
      branch,
    });
    await recordUiLog(id ? 'Update inventory item' : 'Create inventory item', String(fd.get('name') ?? ''));
    await render();
  });

  document.querySelectorAll<HTMLButtonElement>('.edit-inventory-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = items.find((entry) => entry.id === Number(btn.dataset.id));
      if (!item || !form) return;
      (form.querySelector('[name=id]') as HTMLInputElement).value = String(item.id);
      (form.querySelector('[name=name]') as HTMLInputElement).value = item.name;
      (form.querySelector('[name=unit]') as HTMLInputElement).value = item.unit;
      (form.querySelector('[name=quantity]') as HTMLInputElement).value = String(item.quantity);
      (form.querySelector('[name=reorderLevel]') as HTMLInputElement).value = String(item.reorderLevel);
      (form.querySelector('[name=notes]') as HTMLTextAreaElement).value = item.notes ?? '';
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelector<HTMLFormElement>('#inventory-movement-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const movementType = String(fd.get('movementType') ?? 'in') === 'out' ? 'out' : 'in';
    try {
      await recordInventoryMovement({
        itemId: Number(fd.get('itemId') ?? 0),
        movementType,
        quantity: Number(fd.get('quantity') ?? 0),
        notes: String(fd.get('notes') ?? ''),
        staffName: state.currentUser?.name ?? 'Unknown',
        branch,
      });
      await recordUiLog(movementType === 'in' ? 'Stock-in' : 'Stock-out', `Item ID ${fd.get('itemId')} qty ${fd.get('quantity')}`);
      await render();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Stock movement failed.');
    }
  });
}

function bindStaffForms(staff: Staff[]) {
  const modal = document.querySelector<HTMLDivElement>('#add-staff-modal');
  const openBtn = document.querySelector<HTMLButtonElement>('#open-add-staff-modal');
  const closeBtn = document.querySelector<HTMLButtonElement>('#close-add-staff-modal');
  const form = document.querySelector<HTMLFormElement>('#staff-form');

  const openModal = () => {
    form?.reset();
    if (form) (form.querySelector('[name=id]') as HTMLInputElement).value = '';
    const title = document.querySelector<HTMLElement>('#add-staff-title');
    if (title) title.textContent = 'Add staff member';
    modal?.removeAttribute('hidden');
  };
  const closeModal = () => {
    modal?.setAttribute('hidden', '');
    form?.reset();
  };

  openBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.querySelectorAll<HTMLButtonElement>('.edit-staff-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const person = staff.find((s) => s.id === id);
      if (person && form) {
        (form.querySelector('[name=id]') as HTMLInputElement).value = String(person.id);
        (form.querySelector('[name=name]') as HTMLInputElement).value = person.name;
        (form.querySelector('[name=email]') as HTMLInputElement).value = person.email;
        (form.querySelector('[name=password]') as HTMLInputElement).value = person.password;
        (form.querySelector('[name=role]') as HTMLSelectElement).value = person.role;
        (form.querySelector('[name=branch]') as HTMLSelectElement).value = person.branch;
        const title = document.querySelector<HTMLElement>('#add-staff-title');
        if (title) title.textContent = 'Edit staff member';
        modal?.removeAttribute('hidden');
      }
    });
  });

  document.querySelectorAll<HTMLButtonElement>('.deactivate-staff-btn, .activate-staff-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = Number(btn.dataset.id);
      const person = staff.find((s) => s.id === id);
      if (person) {
        await updateStaff(id, { isActive: person.isActive !== 0 ? 0 : 1 });
        await render();
      }
    });
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const saveBtn = document.querySelector<HTMLButtonElement>('#staff-save-btn');
    if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = 'Saving...'; }
    const fd = new FormData(form);
    const id = fd.get('id') ? Number(fd.get('id')) : undefined;
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const password = String(fd.get('password') ?? 'password') || 'password';
    const role = String(fd.get('role')) as 'admin' | 'staff';
    const branch = String(fd.get('branch') ?? '');
    if (!name || !email) {
      alert('Name and email are required.');
      if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = 'Save staff member'; }
      return;
    }
    try {
      if (id) {
        await updateStaff(id, { name, email, password, role, branch });
      } else {
        await createStaff({ name, email, password, role, branch });
      }
      closeModal();
      await render();
    } catch (err) {
      alert('Failed to save staff. The email may already be in use.');
      if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = 'Save staff member'; }
    }
  });
}

function bindSettingsForms() {
  document.querySelector<HTMLFormElement>('#settings-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    await setSetting('branch', String(fd.get('branch') ?? 'Main Store'));
    await setSetting('fold_rate', String(fd.get('foldRate') ?? '5'));
    if (String(fd.get('reportEmail') ?? '')) await setSetting('report_email', String(fd.get('reportEmail')));
    alert('Settings saved successfully!');
  });
}

async function initApp() {
  await initOfflineStore();
  const savedSession = localStorage.getItem(sessionKey);
  if (savedSession) {
    try {
      const parsed = JSON.parse(savedSession) as { email?: string; remembered?: boolean };
      if (parsed.email && parsed.remembered) {
        const user = (await authenticateUser(parsed.email, 'password')) ?? null;
        state.currentUser = user;
      }
    } catch {
      localStorage.removeItem(sessionKey);
    }
  }
  await render();
}

function renderRevolving(sales: DailySale[], revolvingHistory: RevolvingHistory[], orders: OrderRow[], expenses: DisbursementExpense[]) {
  const baseRevolvingTotal = sales
    .filter(s => s.status === 'revolving')
    .reduce((sum, s) => sum + s.cashAmount, 0);

  const historyAdditions = revolvingHistory
    .filter(r => r.type === 'add')
    .reduce((sum, r) => sum + r.amount, 0);

  const historyDisbursements = revolvingHistory
    .filter(r => r.type === 'disbursement')
    .reduce((sum, r) => sum + r.amount, 0);

  const revolvingTotal = baseRevolvingTotal + historyAdditions - historyDisbursements;

  const historyFrom = state.revolvingHistoryFrom || '0000-01-01';
  const historyTo = state.revolvingHistoryTo || '9999-12-31';
  const filteredRevolvingHistory = revolvingHistory.filter((row) => {
    const date = localDateFromIso(row.createdAt);
    return date >= historyFrom && date <= historyTo;
  });

  const dailySummaryTableRows = sales.map((sale) => {
    const cashOnHand = computeCashOnHandForDate(sale.saleDate, orders, expenses, sale.cashAmount);
    const status = sale.status === 'revolving'
      ? '<span class="ok">Revolving</span>'
      : sale.status === 'endorsed'
        ? `<span class="warn">Endorsed to ${escapeHtml(sale.endorsedTo)}</span>`
        : '<span class="meta">Pending</span>';
    const actionMarkup = sale.status !== 'revolving' && sale.status !== 'endorsed'
      ? `<div class="row-actions">
          <button class="primary revolving-btn" data-id="${sale.id}">Revolving</button>
          <button class="secondary endorsed-btn" data-id="${sale.id}" data-date="${formatDate(sale.saleDate)}">Endorsed</button>
        </div>`
      : '';
    return [
      `<strong>${escapeHtml(formatDate(sale.saleDate))}</strong>`,
      `<strong class="ok">${money(cashOnHand)}</strong>`,
      status,
      sale.statusUpdatedAt ? escapeHtml(formatDate(sale.statusUpdatedAt)) : '-',
      actionMarkup,
    ];
  });

  const historyTableRows = filteredRevolvingHistory.map((row) => [
    formatDateTimeStack(row.createdAt),
    `<strong>${escapeHtml(row.revolvingNumber)}</strong>`,
    escapeHtml(row.name),
    `<strong class="${row.type === 'disbursement' ? 'warn' : 'ok'}">${row.type === 'disbursement' ? '-' : '+'}${money(row.amount)}</strong>`,
    escapeHtml(row.category),
    escapeHtml(row.description || '-'),
    `<span class="${row.type === 'add' ? 'ok' : 'warn'}">${row.type === 'add' ? 'Add Revolving Fund' : 'Disbursement'}</span>`,
  ]);

  return `
    <section class="grid content full">
      <div class="panel-header" style="display: flex; gap: 16px; margin-bottom: 24px; align-items: center;">
        <button class="primary" id="add-revolving-fund-btn">Add Revolving Fund</button>
        <button class="secondary" id="revolving-disbursement-btn">Disbursement</button>
      </div>

      <article class="panel">
        <div style="background-color: #061a42; color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <p style="font-size: 12px; font-weight: bold; opacity: 0.8; text-transform: uppercase; margin: 0 0 8px 0;">Revolving Fund Total</p>
          <p style="font-size: 32px; font-weight: 800; margin: 0;">${money(revolvingTotal)}</p>
        </div>
        ${sectionTitle('Daily Summary', 'Cash on hand per day (order cash + manual cash − disbursements)')}
        ${renderHtmlTable(
          ['Date of Sales', 'Cash on Hand', 'Status', 'Date Update', 'Action'],
          dailySummaryTableRows,
          'data-table orders-data-table bordered-table',
        )}
      </article>

      <article class="panel">
        ${sectionTitle('Revolving Table History', 'Filter by date — DISB numbers shared with Daily Report expenses')}
        <form id="revolving-history-filters" class="form revolving-history-filters">
          <div class="form-row">
            <label>From<input name="revolvingHistoryFrom" type="date" value="${state.revolvingHistoryFrom}" /></label>
            <label>To<input name="revolvingHistoryTo" type="date" value="${state.revolvingHistoryTo}" /></label>
          </div>
          <div class="row-actions">
            <button class="primary" type="submit">Apply filter</button>
            <button class="secondary" type="button" id="revolving-history-clear">Clear</button>
          </div>
        </form>
        ${renderHtmlTable(
          ['Date', 'Disbursement #', 'Name', 'Amount', 'Category', 'Description', 'Type'],
          historyTableRows,
          'data-table orders-data-table bordered-table',
        )}
      </article>

      ${state.endorseModalOpen ? `
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="endorse-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Endorse Money</h3>
              <p class="meta" style="margin-bottom: 16px;">Endorsing cash from <strong>${escapeHtml(state.endorseSaleDate)}</strong>.</p>
              <label>Endorsed to (Name)<input name="endorsedTo" type="text" placeholder="Enter name" required /></label>
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Submit Endorsement</button>
                <button class="secondary" type="button" id="close-endorse-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

      ${state.revolvingModalOpen ? `
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <div style="padding: 24px;">
              <h3 style="margin-top: 0;">Confirm Revolving Fund</h3>
              <p style="margin-bottom: 24px;">Are you sure you want to mark this daily sale as revolving?</p>
              <div class="modal-actions" style="padding: 0;">
                <button class="primary" id="confirm-revolving-btn">Confirm</button>
                <button class="secondary" id="close-revolving-modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      ${state.addFundModalOpen ? `
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="add-fund-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Add Revolving Fund</h3>
              <label>Name<input name="name" type="text" required /></label>
              <label>Amount<input name="amount" type="number" step="0.01" min="0.01" required /></label>
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Add Fund</button>
                <button class="secondary" type="button" id="close-add-fund-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}

      ${state.disbursementModalOpen ? `
        <div class="modal-backdrop" role="presentation">
          <div class="receipt-modal" role="dialog" aria-modal="true" style="max-width: 400px; width: 90%;">
            <form id="disbursement-form" class="form" style="padding: 24px;">
              <h3 style="margin-top: 0;">Disbursement</h3>
              <label>Name<input name="name" type="text" required /></label>
              <label>Amount<input name="amount" type="number" step="0.01" min="0.01" required /></label>
              <label>Category<input name="category" type="text" required /></label>
              <label>Description<input name="description" type="text" /></label>
              <div class="modal-actions" style="margin-top: 24px; padding: 0;">
                <button class="primary" type="submit">Disburse</button>
                <button class="secondary" type="button" id="close-disbursement-modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      ` : ''}
    </section>
  `;
}

function bindRevolvingForms() {
  document.querySelector<HTMLFormElement>('#revolving-history-filters')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    state.revolvingHistoryFrom = String(fd.get('revolvingHistoryFrom') ?? '').trim();
    state.revolvingHistoryTo = String(fd.get('revolvingHistoryTo') ?? '').trim();
    await render();
  });

  document.querySelector<HTMLButtonElement>('#revolving-history-clear')?.addEventListener('click', async () => {
    state.revolvingHistoryFrom = '';
    state.revolvingHistoryTo = '';
    await render();
  });

  document.querySelectorAll<HTMLButtonElement>('.revolving-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      state.revolvingModalOpen = true;
      state.revolvingSaleId = Number(btn.dataset.id);
      await render();
    });
  });

  const confirmRevolvingBtn = document.getElementById('confirm-revolving-btn');
  if (confirmRevolvingBtn) {
    confirmRevolvingBtn.addEventListener('click', async () => {
      await updateDailySaleStatus(state.revolvingSaleId, 'revolving', null, new Date().toISOString());
      state.revolvingModalOpen = false;
      await render();
    });
  }

  const closeRevolvingBtn = document.getElementById('close-revolving-modal');
  if (closeRevolvingBtn) {
    closeRevolvingBtn.addEventListener('click', async () => {
      state.revolvingModalOpen = false;
      await render();
    });
  }

  document.querySelectorAll<HTMLButtonElement>('.endorsed-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      state.endorseModalOpen = true;
      state.endorseSaleId = Number(btn.dataset.id);
      state.endorseSaleDate = btn.dataset.date ?? '';
      await render();
    });
  });

  const closeEndorseBtn = document.getElementById('close-endorse-modal');
  if (closeEndorseBtn) {
    closeEndorseBtn.addEventListener('click', async () => {
      state.endorseModalOpen = false;
      await render();
    });
  }

  const endorseForm = document.getElementById('endorse-form') as HTMLFormElement | null;
  if (endorseForm) {
    endorseForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(endorseForm);
      const endorsedTo = String(fd.get('endorsedTo') ?? '').trim();
      if (!endorsedTo) return;
      
      await updateDailySaleStatus(state.endorseSaleId, 'endorsed', endorsedTo, new Date().toISOString());
      state.endorseModalOpen = false;
      await render();
    });
  }

  const addRevolvingBtn = document.getElementById('add-revolving-fund-btn');
  if (addRevolvingBtn) {
    addRevolvingBtn.addEventListener('click', async () => {
      state.addFundModalOpen = true;
      await render();
    });
  }

  const closeAddFundBtn = document.getElementById('close-add-fund-modal');
  if (closeAddFundBtn) {
    closeAddFundBtn.addEventListener('click', async () => {
      state.addFundModalOpen = false;
      await render();
    });
  }

  const addFundForm = document.getElementById('add-fund-form') as HTMLFormElement | null;
  if (addFundForm) {
    addFundForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(addFundForm);
      await saveRevolvingHistory({
        name: String(fd.get('name') ?? '').trim(),
        amount: Number(fd.get('amount') ?? 0),
        category: 'Add Revolving Fund',
        description: null,
        type: 'add',
        createdAt: new Date().toISOString(),
      });
      state.addFundModalOpen = false;
      await render();
    });
  }

  const disbursementBtn = document.getElementById('revolving-disbursement-btn');
  if (disbursementBtn) {
    disbursementBtn.addEventListener('click', async () => {
      state.disbursementModalOpen = true;
      await render();
    });
  }

  const closeDisbursementBtn = document.getElementById('close-disbursement-modal');
  if (closeDisbursementBtn) {
    closeDisbursementBtn.addEventListener('click', async () => {
      state.disbursementModalOpen = false;
      await render();
    });
  }

  const disbursementForm = document.getElementById('disbursement-form') as HTMLFormElement | null;
  if (disbursementForm) {
    disbursementForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(disbursementForm);
      await saveRevolvingHistory({
        name: String(fd.get('name') ?? '').trim(),
        amount: Number(fd.get('amount') ?? 0),
        category: String(fd.get('category') ?? '').trim(),
        description: String(fd.get('description') ?? '').trim(),
        type: 'disbursement',
        expenseDate: today(),
        createdAt: new Date().toISOString(),
      });
      state.disbursementModalOpen = false;
      await render();
    });
  }
}

initApp();
