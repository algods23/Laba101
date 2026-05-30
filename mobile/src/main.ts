import './style.css';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import {
  advanceOrder,
  authenticateUser,
  calculatePricing,
  completeCleaning,
  createExpense,
  createFoldLog,
  createOrder,
  createStaff,
  getBranch,
  getFoldRate,
  initOfflineStore,
  listAllStaff,
  listCustomers,
  listDailySales,
  listExpenses,
  listFoldLogs,
  listItemCategories,
  listMachines,
  listOrders,
  listPayments,
  listServices,
  listStaff,
  listSubcleanings,
  recordPayment,
  saveDailySale,
  saveItemCategory,
  saveMachine,
  saveService,
  saveSubcleaning,
  setSetting,
  workflowSteps,
  getSetting,
  updateMachine,
  updateStaff,
  type Customer,
  type DailySale,
  type DisbursementExpense,
  type FoldLog,
  type ItemCategory,
  type LaundryService,
  type Machine,
  type OrderRow,
  type Payment,
  type Staff,
  type Subcleaning,
} from './db';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root not found');

let dashboardClockTimer: number | undefined;

type TabKey = 'dashboard' | 'orders' | 'customers' | 'pricing' | 'disbursements' | 'reports' | 'inventory' | 'maintenance' | 'staff' | 'settings';

const tabLabels: Record<TabKey, string> = {
  dashboard: 'Dashboard',
  orders: 'POS / Orders',
  customers: 'Customers',
  pricing: 'Pricing Services',
  disbursements: 'Daily Report',
  reports: 'Reports',
  inventory: 'Inventory',
  maintenance: 'Maintenance',
  staff: 'Staff',
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
};

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

function foldPayoutRowsFromOrders(orders: OrderRow[], foldRate: number) {
  const grouped = new Map<string, { staffName: string; folds: number; rate: number; total: number }>();
  orders
    .filter((order) => order.workflowCompleted.includes('fold') && order.foldedByName)
    .forEach((order) => {
      const staffName = order.foldedByName as string;
      const row = grouped.get(staffName) ?? { staffName, folds: 0, rate: foldRate, total: 0 };
      row.folds += 1;
      row.total = Number((row.folds * row.rate).toFixed(2));
      grouped.set(staffName, row);
    });
  return Array.from(grouped.values());
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

function localDateFromIso(value: string) {
  return localDateInput(new Date(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function dashboardDateTime(date = new Date()) {
  return {
    date: new Intl.DateTimeFormat('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(date),
    time: new Intl.DateTimeFormat('en-PH', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }).format(date),
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
    orders: 'PO',
    customers: 'CU',
    pricing: 'PS',
    disbursements: 'DR',
    reports: 'RP',
    inventory: 'IN',
    maintenance: 'MT',
    staff: 'ST',
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
  const categories = await listItemCategories();
  const orders = await listOrders(branch);
  const payments = await listPayments();
  const foldLogs = await listFoldLogs();
  const expenses = await listExpenses();
  const sales = await listDailySales();
  const machines = await listMachines(branch);
  const subcleanings = await listSubcleanings(branch);
  const foldRate = await getFoldRate();
  const reportEmail = await getSetting('report_email');

  return { branch, staff, allStaff, customers, services, categories, orders, payments, foldLogs, expenses, sales, machines, subcleanings, foldRate, reportEmail: reportEmail ?? '' };
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
  const paidToday = data.orders.filter((order) => localDateFromIso(order.createdAt) === today()).reduce((sum, order) => sum + order.paidAmount, 0);
  const manualSales = data.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const salesTotal = orderSales + manualSales;
  const foldPayoutTotal = foldPayoutRowsFromOrders(data.orders, data.foldRate).reduce((sum, row) => sum + row.total, 0);
  const disbursementTotal = data.expenses.reduce((sum, row) => sum + row.amount, 0) + foldPayoutTotal;
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
          <button class="mobile-avatar" type="button">${initials(state.currentUser)}</button>
        </header>

        ${state.tab === 'dashboard' ? renderDashboard({ openQueue, readyPickup, customerCount: data.customers.length, paidToday, orders: data.orders }) : ''}
        ${state.tab === 'orders' ? renderOrders(data.orders, data.customers, data.services, data.categories, data.staff, data.payments, data.branch) : ''}
        ${state.tab === 'customers' ? renderCustomers(data.customers, data.orders) : ''}
        ${state.tab === 'pricing' ? renderPricing(data.services, data.categories) : ''}
        ${state.tab === 'disbursements' ? renderDisbursements(data.expenses, data.sales) : ''}
        ${state.tab === 'reports' ? renderReports(data.orders, data.sales, data.expenses, data.foldRate, salesTotal, disbursementTotal, profit) : ''}
        ${state.tab === 'inventory' ? renderInventory(data.services, data.categories) : ''}
        ${state.tab === 'maintenance' ? renderMaintenance(data.machines, data.subcleanings, data.branch) : ''}
        ${state.tab === 'staff' ? renderStaff(data.allStaff, data.branch) : ''}
        ${state.tab === 'settings' ? renderSettings(data.branch, data.foldRate, data.reportEmail) : ''}
      </main>
    </div>
  `;

  bindNavigation();
  bindOrderForms(data);
  bindPricingForms(data.services);
  bindDisbursementForms();
  bindReportActions(data.orders, data.sales, data.expenses, data.foldRate);
  bindMaintenanceForms();
  bindStaffForms(data.allStaff);
  bindSettingsForms();
  bindDashboardClock();
}

function visibleTabs(): TabKey[] {
  if (state.currentUser?.role === 'admin') return (Object.keys(tabLabels) as TabKey[]).filter((t) => t !== 'inventory');
  return ['orders', 'disbursements', 'reports', 'maintenance'];
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
            <label>Email address<input name="email" type="email" autocomplete="username" placeholder="admin@laba101.test" required /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="Enter password" required /></label>
            <label class="remember"><input name="remember" type="checkbox" value="1" /> Remember me on this device</label>
            <button class="primary" id="login-button" type="submit">Sign in</button>
          </form>
          <aside class="demo-box">
            <p>Demo accounts</p>
            <button type="button" data-fill-email="admin@laba101.test" data-fill-password="password"><strong>Admin</strong><span>admin@laba101.test</span></button>
            <button type="button" data-fill-email="staff@laba101.test" data-fill-password="password"><strong>Staff</strong><span>staff@laba101.test</span></button>
          </aside>
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

function renderDashboard(metrics: { openQueue: number; readyPickup: number; customerCount: number; paidToday: number; orders: OrderRow[] }) {
  const recent = metrics.orders.slice(0, 3);
  const now = new Date();
  const display = dashboardDateTime(now);
  const chartDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - index));
    return new Intl.DateTimeFormat('en-PH', { month: 'short', day: 'numeric' }).format(date);
  });
  return `
    <section class="panel dashboard-clock">
      <div>
        <p class="eyebrow">Device local time</p>
        <h2 data-dashboard-time>${escapeHtml(display.time)}</h2>
      </div>
      <strong data-dashboard-date>${escapeHtml(display.date)}</strong>
    </section>
    <section class="grid stats">
      <div class="panel stat"><div class="card-label">Active orders</div><div class="value">${metrics.openQueue}</div><div class="helper">Open queue</div></div>
      <div class="panel stat"><div class="card-label">Ready pickup</div><div class="value">${metrics.readyPickup}</div><div class="helper">Awaiting claim</div></div>
      <div class="panel stat"><div class="card-label">Paid today</div><div class="value">${money(metrics.paidToday)}</div><div class="helper">Collected cash</div></div>
      <div class="panel stat"><div class="card-label">Customers</div><div class="value">${metrics.customerCount}</div><div class="helper">Customer records</div></div>
    </section>
    <section class="dashboard-main">
      <article class="panel revenue-panel">
        ${sectionTitle('Revenue overview', 'Paid amount for the last 7 days.')}
        <div class="mini-chart">
          <span></span><span></span><span></span><span></span><span></span><span></span><span class="is-today"></span>
        </div>
        <div class="chart-days">${chartDays.map((label) => `<span>${escapeHtml(label)}</span>`).join('')}</div>
      </article>
      <article class="panel recent-panel">
        ${sectionTitle('Recent activities', 'Latest tickets and workflow movements.')}
        <div class="activity-list">
          ${recent.map((order) => `<div><strong>${escapeHtml(order.ticket)} moved to ${escapeHtml(order.status)}</strong><span>${escapeHtml(order.customer)} - just now</span></div>`).join('') || '<p class="helper">No recent activity.</p>'}
        </div>
      </article>
    </section>
  `;
}

function renderOrders(orders: OrderRow[], customers: Customer[], services: LaundryService[], categories: ItemCategory[], staff: Staff[], payments: Payment[], branch: string) {
  const orderServices = services.filter((service) => service.serviceType === 'order' && service.isActive);
  const addons = services.filter((service) => service.serviceType === 'addon' && service.isActive);
  const receipt = state.receiptOrderId ? orders.find((order) => order.id === state.receiptOrderId) : null;

  // Only show customers who have a prior order in this branch
  const branchCustomerIds = new Set(orders.map((o) => o.customerId));
  const branchCustomers = customers.filter((c) => branchCustomerIds.has(c.id));

  return `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('New POS order', 'Customer, service, weight, add-ons, and initial payment')}
        <form id="order-form" class="form">
          <div class="form-row">
            <label>Existing customer (${escapeHtml(branch)})
              <select name="customerId">
                <option value="">-- New customer --</option>
                ${branchCustomers.map((customer) => `<option value="${customer.id}" data-name="${escapeHtml(customer.name)}" data-phone="${escapeHtml(customer.phone ?? '')}">${escapeHtml(customer.name)} ${customer.phone ? `- ${escapeHtml(customer.phone)}` : ''}</option>`).join('')}
              </select>
            </label>
            <label>Customer name<input name="customerName" required placeholder="Customer name" /></label>
          </div>
          <div class="form-row">
            <label>Phone<input name="customerPhone" placeholder="09..." /></label>
          </div>

          <label>Service
            <select name="serviceId" required>
              ${orderServices.map((service) => `<option value="${service.id}">${escapeHtml(service.name)} - ${money(service.price)}</option>`).join('')}
            </select>
          </label>
          <label>Item category
            <select name="itemCategoryId" required>
              ${categories.map((category) => `<option value="${category.id}">${escapeHtml(category.name)} max ${category.maxKg}kg</option>`).join('')}
            </select>
            <span class="field-hint" data-category-weight></span>
          </label>
          <label>Weight (KG)<input name="weightKg" type="number" min="0.25" max="200" step="0.01" value="1" required /></label>

          <fieldset class="check-grid">
            <legend>Extra services</legend>
            ${addons.length ? addons.map((addon) => `<label class="check"><input type="checkbox" name="addonIds" value="${addon.id}" /> ${escapeHtml(cleanAddonName(addon.name))} ${money(addon.price)}</label>`).join('') : '<p class="helper">No extra services configured.</p>'}
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

      <article class="panel">
        ${sectionTitle('Order queue', 'Workflow, payment, and receipts')}
        <div class="table orders-table">
          <div class="table-head"><div>Ticket</div><div>Customer</div><div>Total</div><div>Status</div><div>Actions</div></div>
          ${orders.map((order) => renderOrderRow(order, staff, services)).join('') || '<div class="helper">No orders yet.</div>'}
        </div>
      </article>
      ${receipt ? renderReceipt(receipt, payments.filter((payment) => payment.orderId === receipt.id)) : ''}
    </section>
  `;
}

function renderOrderRow(order: OrderRow, staff: Staff[], services: LaundryService[]) {
  const steps = workflowSteps(order, services);
  const nextStep = steps.find((step) => !order.workflowCompleted.includes(step.key));
  const needsFoldStaff = nextStep?.key === 'fold';
  const needsExtraConfirmation = nextStep?.key === 'extras' && order.extras.length > 0;
  return `
    <div class="table-row">
      <div><strong>${escapeHtml(order.ticket)}</strong><div class="small">${escapeHtml(order.service)} / ${escapeHtml(order.itemCategory)}</div></div>
      <div>${escapeHtml(order.customer)}<div class="small">${escapeHtml(order.phone ?? '')}</div></div>
      <div class="amount-cell"><strong>${money(order.totalAmount)}</strong><div class="small">Paid ${money(order.paidAmount)} / Bal ${money(order.balance)}</div></div>
      <div>
        <div class="${order.status === 'ready' || order.status === 'claimed' ? 'ok' : 'warn'}">${escapeHtml(order.status)}</div>
        <div class="workflow-progress">
          ${steps.map((step) => `<span class="${order.workflowCompleted.includes(step.key) ? 'is-done' : nextStep?.key === step.key ? 'is-next' : ''}">${escapeHtml(step.label)}</span>`).join('')}
        </div>
      </div>
      <div class="row-actions">
        ${nextStep ? `<form class="inline-form advance-form" data-order-id="${order.id}">
          ${needsExtraConfirmation ? `<div class="extra-confirmation">Confirm extra service: <strong>${order.extras.map((extra) => escapeHtml(cleanAddonName(extra.name))).join(', ')}</strong></div>` : ''}
          ${needsFoldStaff ? `<select name="assignedStaffId" required>
            <option value="">Staff</option>
            ${staff.map((person) => `<option value="${person.id}">${escapeHtml(person.name)}</option>`).join('')}
          </select>` : ''}
          <button class="secondary" type="submit">Next: ${escapeHtml(nextStep.label)}</button>
        </form>` : ''}
        ${order.balance > 0 ? `
          <form class="inline-form payment-form" data-order-id="${order.id}">
            <input name="amount" type="number" min="0.01" step="0.01" value="${order.balance}" />
            <select name="method"><option value="cash">Cash</option><option value="gcash">GCash</option></select>
            <input name="reference" placeholder="GCash ref" hidden />
            <button class="secondary" type="submit">Pay</button>
          </form>
        ` : ''}
        <button class="secondary" data-receipt="${order.id}">Receipt</button>
      </div>
    </div>
  `;
}

function renderReceipt(order: OrderRow, payments: Payment[]) {
  const tendered = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const change = Math.max(0, Number((tendered - order.totalAmount).toFixed(2)));
  return `
    <div class="modal-backdrop" role="presentation">
      <div class="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div class="modal-actions">
          <button class="secondary" type="button" data-print-receipt>Print</button>
          <button class="secondary" type="button" data-close-receipt>Close</button>
        </div>
        <div class="receipt" id="receipt-print-area">
          <div class="receipt-head">
            <h3 id="receipt-title">Laba101</h3>
            <p>${escapeHtml(order.ticket)}<br>${escapeHtml(formatDate(order.createdAt))}</p>
          </div>
          <div class="receipt-customer">
            <strong>${escapeHtml(order.customer)}</strong>
            <span>${escapeHtml(order.phone ?? 'No phone')}</span>
          </div>
          <div class="summary-list receipt-lines">
            <div><span>Service</span><strong>${escapeHtml(order.service)}</strong></div>
            <div><span>Category</span><strong>${escapeHtml(order.itemCategory)}</strong></div>
            <div><span>Weight</span><strong>${order.weightKg} kg</strong></div>
            ${order.extras.length ? `<div><span>Extra services</span><strong>${order.extras.map((extra) => escapeHtml(cleanAddonName(extra.name))).join(', ')}</strong></div>` : ''}
            <div><span>Total</span><strong>${money(order.totalAmount)}</strong></div>
            <div><span>Tendered</span><strong>${money(tendered)}</strong></div>
            <div><span>Paid</span><strong>${money(order.paidAmount)}</strong></div>
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

function renderCustomers(customers: Customer[], orders: OrderRow[]) {
  return `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('Customer Management', 'Customer records from local offline storage')}
        <div class="summary-list">
          <div><span>Total customers</span><strong>${customers.length}</strong></div>
          <div><span>Orders linked</span><strong>${orders.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${sectionTitle('Customer list', 'Names, phones, and addresses')}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Phone</div><div>Address</div><div></div><div></div></div>
          ${customers.map((customer) => `<div class="table-row"><div><strong>${escapeHtml(customer.name)}</strong></div><div>${escapeHtml(customer.phone ?? 'No phone')}</div><div>${escapeHtml(customer.address ?? 'No address')}</div><div></div><div></div></div>`).join('') || '<div class="helper">No customers yet.</div>'}
        </div>
      </article>
    </section>
  `;
}

function renderPricing(services: LaundryService[], categories: ItemCategory[]) {
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
          <div class="form-row">
            <label>Includes<input name="includes" placeholder="Wash,Dry,Fold" /></label>
            <label>Turnaround hours<input name="turnaroundHours" type="number" min="0" step="1" value="24" /></label>
          </div>
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
          <label>Additional fee per extra KG<input name="additionalFee" type="number" min="0" step="0.01" value="0" /></label>
          <button class="primary" type="submit">Save category</button>
        </form>
      </article>
      <article class="panel span-2">
        <div class="table">
          <div class="table-head"><div>Name</div><div>Type</div><div>Price</div><div>Includes</div><div>Active</div><div>Actions</div></div>
          ${services.map((service) => `<div class="table-row"><div>${escapeHtml(service.name)}</div><div>${escapeHtml(service.serviceType)}</div><div>${money(service.price)}</div><div>${escapeHtml(service.includes.join(', '))}</div><div>${service.isActive ? 'Yes' : 'No'}</div>
          <div class="row-actions">
            <button class="secondary edit-service-btn" data-id="${service.id}">Edit</button>
            ${service.isActive ? `<button class="secondary deactivate-service-btn" data-id="${service.id}">Deactivate</button>` : `<button class="secondary activate-service-btn" data-id="${service.id}">Activate</button>`}
          </div></div>`).join('')}
        </div>
        <div class="section-divider"></div>
        <div class="table">
          <div class="table-head"><div>Name</div><div>Max KG</div><div>Extra fee</div><div></div><div></div></div>
          ${categories.map((category) => `<div class="table-row"><div>${escapeHtml(category.name)}</div><div>${category.maxKg}</div><div>${money(category.additionalFee)}</div><div></div><div></div></div>`).join('')}
        </div>
      </article>
    </section>
  `;
}

function renderDisbursements(expenses: DisbursementExpense[], sales: DailySale[]) {
  const todayValue = today();
  const monthValue = todayValue.slice(0, 7);
  const dailyExpense = expenses.filter((item) => item.expenseDate === todayValue).reduce((sum, item) => sum + item.amount, 0);
  const monthlyExpense = expenses.filter((item) => item.expenseDate.startsWith(monthValue)).reduce((sum, item) => sum + item.amount, 0);
  const todaysManualSales = sales.filter((item) => item.saleDate === todayValue).reduce((sum, item) => sum + item.totalAmount, 0);
  const monthlyManualSales = sales.filter((item) => item.saleDate.startsWith(monthValue)).reduce((sum, item) => sum + item.totalAmount, 0);
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
          <div class="form-row"><label>Date<input name="expenseDate" type="date" value="${today()}" required /></label><label>Amount<input name="amount" type="number" min="0" step="0.01" required /></label></div>
          <div class="form-row"><label>Name<input name="name" required /></label><label>Category<input name="category" required /></label></div>
          <label>Description<textarea name="description"></textarea></label>
          <button class="primary" type="submit">Save expense</button>
        </form>
      </article>
      <article class="panel">
        ${sectionTitle('Disbursement list', 'Expenses only')}
        <div class="table">
          <div class="table-head"><div>Date</div><div>No.</div><div>Name</div><div>Category</div><div>Amount</div></div>
          ${expenses.map((item) => `<div class="table-row"><div>${escapeHtml(item.expenseDate)}</div><div>${escapeHtml(item.number)}</div><div>${escapeHtml(item.name)}</div><div>${escapeHtml(item.category)}</div><div>${money(item.amount)}</div></div>`).join('') || '<div class="helper">No expenses yet.</div>'}
        </div>
      </article>
    </section>
    ` : `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('Input total sale', 'Manual cash and GCash totals')}
        <form id="sales-form" class="form">
          <label>Date<input name="saleDate" type="date" value="${today()}" required /></label>
          <label>Cash sales<input name="cashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>GCash sales<input name="gcashAmount" type="number" min="0" step="0.01" value="0" /></label>
          <label>Notes<textarea name="notes" placeholder="Optional"></textarea></label>
          <button class="primary" type="submit">Save daily sale</button>
        </form>
      </article>
      <article class="panel">
        ${sectionTitle('Daily sales history', 'Cash, GCash, total sale, notes, and updates')}
        <div class="table wide-table">
          <div class="table-head"><div>Sales #</div><div>Date</div><div>Cash</div><div>GCash</div><div>Total sale</div></div>
          ${sales.map((item) => `<div class="table-row"><div>${escapeHtml(item.saleNumber)}</div><div>${escapeHtml(item.saleDate)}</div><div>${money(item.cashAmount)}</div><div>${money(item.gcashAmount)}</div><div><strong>${money(item.totalAmount)}</strong></div></div>`).join('') || '<div class="helper">No daily sales totals yet.</div>'}
        </div>
      </article>
    </section>
    `}
  `;
}

function renderReports(orders: OrderRow[], sales: DailySale[], expenses: DisbursementExpense[], foldRate: number, salesTotal: number, disbursementTotal: number, profit: number) {
  return `
    <section class="page-head">
      <div>
        <p class="eyebrow">Exports</p>
        <h2>Report Center</h2>
      </div>
    </section>
    <section class="panel report-center">
      <div class="report-grid">
        <div>
          <h3>Date to export</h3>
          <div class="date-scopes">
            <label><input type="radio" name="dateScope" value="today" data-date-scope checked /> <span>Current</span></label>
            <label><input type="radio" name="dateScope" value="week" data-date-scope /> <span>Week</span></label>
            <label><input type="radio" name="dateScope" value="month" data-date-scope /> <span>Month</span></label>
            <label><input type="radio" name="dateScope" value="custom" data-date-scope /> <span>Custom</span></label>
          </div>
          <div class="form-row">
            <label>From<input name="dateFrom" data-date-from type="date" value="${today()}" /></label>
            <label>To<input name="dateTo" data-date-to type="date" value="${today()}" /></label>
          </div>
        </div>
        <div>
          <h3>Reports to include</h3>
          <div class="report-checks">
            <label><input type="checkbox" name="reportType" value="sales" checked /> Sales reports</label>
            <label><input type="checkbox" name="reportType" value="disbursement" checked /> Disbursement reports</label>
            <label><input type="checkbox" name="reportType" value="summary" checked /> Summary</label>
          </div>
        </div>
      </div>
      <div class="section-divider"></div>
      <div class="report-actions">
        <p>Summary computes sales minus disbursement for the selected dates.</p>
        <div>
          <button class="secondary" id="email-report" type="button">Send to Email</button>
          <button class="primary" id="export-report" type="button">Export Excel</button>
        </div>
      </div>
    </section>
  `;
}

function renderInventory(services: LaundryService[], categories: ItemCategory[]) {
  return `
    <section class="grid content full">
      <article class="panel">
        ${sectionTitle('Inventory', 'Service catalog and item load limits')}
        <div class="summary-list">
          <div><span>Active services</span><strong>${services.filter((service) => service.isActive).length}</strong></div>
          <div><span>Item categories</span><strong>${categories.length}</strong></div>
        </div>
      </article>
      <article class="panel">
        ${sectionTitle('Service inventory', 'Current sellable laundry services')}
        <div class="table">
          <div class="table-head"><div>Name</div><div>Category</div><div>Price</div><div>Max KG</div><div>Status</div></div>
          ${services.map((service) => `<div class="table-row"><div><strong>${escapeHtml(service.name)}</strong></div><div>${escapeHtml(service.category)}</div><div>${money(service.price)}</div><div>${service.maxKg} kg</div><div>${service.isActive ? 'Active' : 'Inactive'}</div></div>`).join('')}
        </div>
      </article>
    </section>
  `;
}

function renderMaintenance(machines: Machine[], subcleanings: Subcleaning[], branch: string) {
  const availableMachines = machines.filter((machine) => machine.status !== 'under_cleaning');
  const cleaningMachines = machines.filter((machine) => machine.status === 'under_cleaning');
  return `
    <section class="page-head">
      <div>
        <h2>Maintenance & Cleaning</h2>
        <p class="meta">Manage machine subcleaning and maintenance records.</p>
      </div>
      <div class="segmented">
        <button class="${state.maintenanceTab === 'cleaning' ? 'is-active' : ''}" data-maintenance-tab="cleaning" type="button">Subcleaning</button>
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
          <label>Notes <textarea name="notes" placeholder="e.g. Deep clean filters"></textarea></label>
          <input type="hidden" name="branch" value="${escapeHtml(branch)}" />
          <button class="primary" type="submit">Start Cleaning</button>
        </form>
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
        ${sectionTitle('Daily Cleaning Checklist', 'Track which machines have been cleaned today.')}
        <div class="table">
          <div class="table-head"><div>Machine</div><div>Type</div><div>Status</div><div>Notes</div><div>Date</div></div>
          ${machines.map((machine) => {
            const record = subcleanings.find((row) => row.machineIds.includes(machine.id) && row.date === today());
            return `<div class="table-row"><div><strong>${escapeHtml(machine.machineName)}</strong></div><div>${escapeHtml(machine.machineType)}</div><div>${record ? escapeHtml(record.cleaningStatus.replace('_', ' ')) : 'Not Cleaned'}</div><div>${escapeHtml(record?.notes ?? '-')}</div><div>${today()}</div></div>`;
          }).join('')}
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
        <div class="table">
          <div class="table-head staff-table-head"><div>Name</div><div>Email</div><div>Role</div><div>Branch</div><div>Status</div><div>Actions</div></div>
          ${staff.length ? staff.map((person) => `<div class="table-row staff-table-row"><div><strong>${escapeHtml(person.name)}</strong></div><div>${escapeHtml(person.email)}</div><div class="small">${escapeHtml(person.role)}</div><div>${escapeHtml(person.branch)}</div><div>${person.isActive !== 0 ? 'Active' : 'Inactive'}</div>
          <div class="row-actions">
            <button class="secondary edit-staff-btn" data-id="${person.id}">Edit</button>
            ${person.isActive !== 0 ? `<button class="secondary deactivate-staff-btn" data-id="${person.id}">Deactivate</button>` : `<button class="secondary activate-staff-btn" data-id="${person.id}">Activate</button>`}
          </div></div>`).join('') : '<div class="helper" style="padding:18px 0">No staff records yet. Click <strong>+ Add staff</strong> to create one.</div>'}
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
          <label>Fold rate<input name="foldRate" type="number" min="0" step="0.01" value="${foldRate}" /></label>
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
      void render();
    });
  });
  document.querySelector<HTMLButtonElement>('[data-close-receipt]')?.addEventListener('click', () => {
    state.receiptOrderId = 0;
    void render();
  });
  document.querySelector<HTMLButtonElement>('[data-print-receipt]')?.addEventListener('click', () => {
    window.print();
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
  const timeTarget = document.querySelector<HTMLElement>('[data-dashboard-time]');
  const dateTarget = document.querySelector<HTMLElement>('[data-dashboard-date]');
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

function bindOrderForms(data: Awaited<ReturnType<typeof loadData>>) {
  const form = document.querySelector<HTMLFormElement>('#order-form');
  const preview = document.querySelector<HTMLDivElement>('#price-preview');
  const saveButton = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  const customerSelect = form?.querySelector<HTMLSelectElement>('select[name="customerId"]');
  const customerName = form?.querySelector<HTMLInputElement>('input[name="customerName"]');
  const customerPhone = form?.querySelector<HTMLInputElement>('input[name="customerPhone"]');
  const categoryWeight = form?.querySelector<HTMLElement>('[data-category-weight]');
  const orderError = form?.querySelector<HTMLElement>('[data-order-error]');
  const paymentMethod = form?.querySelector<HTMLSelectElement>('select[name="paymentMethod"]');
  const paymentReferenceWrap = form?.querySelector<HTMLElement>('.gcash-reference');
  const paymentReference = form?.querySelector<HTMLInputElement>('input[name="paymentReference"]');
  const syncCustomer = () => {
    if (!customerSelect || !customerName || !customerPhone) return;
    const option = customerSelect.selectedOptions[0];
    customerName.value = option?.dataset.name ?? '';
    customerPhone.value = option?.dataset.phone ?? '';
  };
  const syncGcashReference = () => {
    const isGcash = paymentMethod?.value === 'gcash';
    if (paymentReferenceWrap) paymentReferenceWrap.hidden = !isGcash;
    if (paymentReference) {
      paymentReference.required = isGcash;
      if (!isGcash) paymentReference.value = '';
    }
  };
  const refreshPreview = () => {
    if (!form || !preview) return;
    const formData = new FormData(form);
    const service = data.services.find((item) => item.id === Number(formData.get('serviceId')));
    const category = data.categories.find((item) => item.id === Number(formData.get('itemCategoryId')));
    const addons = data.services.filter((item) => formData.getAll('addonIds').map(Number).includes(item.id));
    if (!service || !category) return;
    const price = calculatePricing(service, category, Number(formData.get('weightKg') ?? 0), addons);
    if (categoryWeight) categoryWeight.textContent = `Allowed item weight: ${category.maxKg} kg`;
    const selectedExtras = addons.map((addon) => cleanAddonName(addon.name));
    const overweight = price.extraKg > 0;
    if (saveButton) saveButton.disabled = overweight;
    if (orderError) {
      orderError.hidden = !overweight;
      orderError.textContent = price.warning ?? '';
    }
    preview.classList.toggle('has-error', overweight);
    preview.innerHTML = `
      <div class="preview-line"><span>Base price</span><strong>${money(price.price)}</strong></div>
      ${price.extraServiceAmount > 0 ? `<div class="preview-line"><span>Extra services${selectedExtras.length ? ` (${escapeHtml(selectedExtras.join(', '))})` : ''}</span><strong>${money(price.extraServiceAmount)}</strong></div>` : ''}
      <div class="preview-total"><span>Total amount</span><strong>${money(price.totalAmount)}</strong></div>
      ${price.warning ? `<span class="warn">${escapeHtml(price.warning)}</span>` : ''}
    `;
  };
  customerSelect?.addEventListener('change', syncCustomer);
  paymentMethod?.addEventListener('change', syncGcashReference);
  syncGcashReference();
  form?.addEventListener('input', refreshPreview);
  form?.addEventListener('change', refreshPreview);
  refreshPreview();
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(form);
    const service = data.services.find((item) => item.id === Number(fd.get('serviceId')));
    const category = data.categories.find((item) => item.id === Number(fd.get('itemCategoryId')));
    const addons = data.services.filter((item) => fd.getAll('addonIds').map(Number).includes(item.id));
    if (service && category) {
      const price = calculatePricing(service, category, Number(fd.get('weightKg') ?? 0), addons);
      if (price.extraKg > 0) {
        if (orderError) {
          orderError.hidden = false;
          orderError.textContent = price.warning ?? 'Weight exceeds the allowed limit.';
        }
        return;
      }
    }
    try {
      await createOrder({
        customerId: Number(fd.get('customerId')) || undefined,
        customerName: String(fd.get('customerName') ?? ''),
        customerPhone: String(fd.get('customerPhone') ?? '') || null,
        serviceId: Number(fd.get('serviceId')),
        itemCategoryId: Number(fd.get('itemCategoryId')),
        branch: data.branch,
        weightKg: Number(fd.get('weightKg')),
        addonIds: fd.getAll('addonIds').map(Number),
        paidAmount: Number(fd.get('paidAmount') ?? 0),
        paymentMethod: String(fd.get('paymentMethod') ?? 'cash') as 'cash' | 'gcash',
        paymentReference: String(fd.get('paymentReference') ?? '') || null,
        notes: String(fd.get('notes') ?? '') || null,
      });
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
      const fd = new FormData(advanceForm);
      await advanceOrder(Number(advanceForm.dataset.orderId), Number(fd.get('assignedStaffId')) || null);
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
      await recordPayment(Number(paymentForm.dataset.orderId), { amount: Number(fd.get('amount')), method: String(fd.get('method')) as 'cash' | 'gcash', reference: String(fd.get('reference') ?? '') || null });
      await render();
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
      includes: String(fd.get('includes') ?? '').split(',').map((item) => item.trim()).filter(Boolean),
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
        (form.querySelector('[name=includes]') as HTMLInputElement).value = service.includes.join(', ');
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

function bindDisbursementForms() {
  document.querySelector<HTMLFormElement>('#expense-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    await createExpense({ expenseDate: String(fd.get('expenseDate') ?? ''), name: String(fd.get('name') ?? ''), category: String(fd.get('category') ?? ''), description: String(fd.get('description') ?? ''), amount: Number(fd.get('amount') ?? 0) });
    await render();
  });
  document.querySelector<HTMLFormElement>('#fold-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    await createFoldLog({ orderTicket: String(fd.get('orderTicket') ?? ''), staffName: String(fd.get('staffName') ?? ''), foldCount: Number(fd.get('foldCount') ?? 1), rate: Number(fd.get('rate') ?? 5) });
    await render();
  });
}

function bindReportActions(orders: OrderRow[], sales: DailySale[], expenses: DisbursementExpense[], foldRate: number) {
  document.querySelector<HTMLFormElement>('#sales-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    await saveDailySale({ saleDate: String(fd.get('saleDate') ?? ''), cashAmount: Number(fd.get('cashAmount') ?? 0), gcashAmount: Number(fd.get('gcashAmount') ?? 0), notes: String(fd.get('notes') ?? '') });
    await render();
  });
  const dateFromInput = document.querySelector<HTMLInputElement>('[data-date-from]');
  const dateToInput = document.querySelector<HTMLInputElement>('[data-date-to]');
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

  const selectedReportTypes = () => new Set(
    Array.from(document.querySelectorAll<HTMLInputElement>('input[name="reportType"]:checked')).map((input) => input.value),
  );
  const selectedDateRange = () => ({
    from: dateFromInput?.value || '0000-01-01',
    to: dateToInput?.value || '9999-12-31',
  });
  const inRange = (date: string) => {
    const range = selectedDateRange();
    return date >= range.from && date <= range.to;
  };
  const reportRows = () => {
    const types = selectedReportTypes();
    const filteredOrders = orders.filter((order) => inRange(localDateFromIso(order.createdAt)));
    const filteredSales = sales.filter((sale) => inRange(sale.saleDate));
    const filteredExpenses = expenses.filter((expense) => inRange(expense.expenseDate));
    const filteredFoldPayouts = foldPayoutRowsFromOrders(
      orders.filter((order) => inRange(localDateFromIso(order.createdAt))),
      foldRate,
    );
    const totalSales = filteredOrders.reduce((sum, order) => sum + order.paidAmount, 0) + filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalDisbursement = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0) + filteredFoldPayouts.reduce((sum, row) => sum + row.total, 0);
    const rows: Array<Array<string | number>> = [
      ['Type', 'Date', 'Number', 'Name', 'Cash', 'GCash', 'Total', 'Balance'],
    ];
    if (types.has('sales')) {
      rows.push(...filteredOrders.map((order) => ['Order', localDateFromIso(order.createdAt), order.ticket, order.customer, '', '', order.paidAmount, order.balance]));
      rows.push(...filteredSales.map((sale) => ['Manual Sale', sale.saleDate, sale.saleNumber, sale.notes ?? '', sale.cashAmount, sale.gcashAmount, sale.totalAmount, '']));
    }
    if (types.has('disbursement')) {
      rows.push(...filteredExpenses.map((expense) => ['Expense', expense.expenseDate, expense.number, expense.name, '', '', expense.amount, '']));
      rows.push(...filteredFoldPayouts.map((row) => ['Fold Payout', selectedDateRange().from, `${row.folds} fold(s)`, row.staffName, '', '', row.total, '']));
    }
    if (types.has('summary')) {
      rows.push([]);
      rows.push(['Summary', selectedDateRange().from, 'to', selectedDateRange().to, '', '', '', '']);
      rows.push(['Total Sales', '', '', '', '', '', totalSales, '']);
      rows.push(['Total Disbursement', '', '', '', '', '', totalDisbursement, '']);
      rows.push(['Profit', '', '', '', '', '', totalSales - totalDisbursement, '']);
    }
    return rows;
  };
  const excelFromRows = (rows: Array<Array<string | number>>) => {
    const htmlRows = rows.map((row) => {
      if (!row.length) return '<tr><td colspan="8">&nbsp;</td></tr>';
      return `<tr>${row.map((cell) => `<td>${escapeHtml(String(cell ?? ''))}</td>`).join('')}</tr>`;
    }).join('');
    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; }
    table { border-collapse: collapse; }
    td { border: 1px solid #c8d3ea; padding: 6px 10px; }
    tr:first-child td { background: #061a42; color: #fff; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Laba101 POS Export</h1>
  <p><strong>Date from:</strong> ${escapeHtml(selectedDateRange().from)}</p>
  <p><strong>Date to:</strong> ${escapeHtml(selectedDateRange().to)}</p>
  <table>${htmlRows}</table>
</body>
</html>`;
  };
  const reportFile = () => {
    const range = selectedDateRange();
    const html = excelFromRows(reportRows());
    const fileName = `laba101-report-${range.from}-to-${range.to}.xls`;
    return new File([html], fileName, { type: 'application/vnd.ms-excel' });
  };
  const saveReportToDevice = async () => {
    const file = reportFile();
    if (!Capacitor.isNativePlatform()) {
      return { fileName: file.name, uri: '' };
    }

    const html = await file.text();
    await Filesystem.writeFile({
      path: file.name,
      data: html,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    const { uri } = await Filesystem.getUri({ path: file.name, directory: Directory.Documents });
    return { fileName: file.name, uri };
  };
  const downloadReport = () => {
    const html = excelFromRows(reportRows());
    const range = selectedDateRange();
    const fileName = `laba101-report-${range.from}-to-${range.to}.xls`;
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
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
          alert(`Report saved to device storage: ${saved.fileName}`);
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
        const range = selectedDateRange();
        const title = `Laba101 report ${range.from} to ${range.to}`;
        if (Capacitor.isNativePlatform()) {
          const saved = await saveReportToDevice();
          await Share.share({
            title,
            text: `Please find the attached Laba101 report file: ${saved.fileName}`,
            files: [saved.uri],
            dialogTitle: 'Send report via email',
          });
          alert(`Report saved and shared as "${saved.fileName}".`);
        } else {
          const fileName = downloadReport();
          const body = `Hi,\n\nPlease find the attached Laba101 report file: ${fileName}\n\nDate range: ${range.from} to ${range.to}`;
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
    await saveSubcleaning({ date: String(fd.get('date') ?? ''), machineIds, cleaningStatus: String(fd.get('cleaningStatus') ?? ''), notes: String(fd.get('notes') ?? ''), branch: String(fd.get('branch') ?? '') });
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
    await render();
  });
}

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
