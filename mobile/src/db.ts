import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

export type Staff = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'staff';
  branch: string;
  isActive?: number;
};

export type Customer = {
  id: number;
  name: string;
  phone: string | null;
  address: string | null;
};

export type LaundryService = {
  id: number;
  name: string;
  description: string | null;
  category: string;
  serviceType: 'order' | 'addon';
  price: number;
  maxKg: number;
  dryingMinutes: number | null;
  includes: string[];
  additionalCharge: number;
  turnaroundHours: number;
  isActive: number;
};

export type ItemCategory = {
  id: number;
  name: string;
  maxKg: number;
  additionalFee: number;
  isActive: number;
};

export type Payment = {
  id: number;
  orderId: number;
  amount: number;
  method: 'cash' | 'gcash';
  reference: string | null;
  receivedAt: string;
  branch: string;
};

export type OrderRow = {
  id: number;
  ticket: string;
  customerId: number;
  customer: string;
  phone: string | null;
  serviceId: number;
  service: string;
  itemCategoryId: number;
  itemCategory: string;
  branch: string;
  status: string;
  workflowCompleted: string[];
  weightKg: number;
  price: number;
  additionalCharge: number;
  extraServiceAmount: number;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  extras: Array<{ id: number; name: string; price: number }>;
  notes: string | null;
  foldedBy: number | null;
  foldedByName: string | null;
  dueAt: string;
  createdAt: string;
};

export type FoldLog = {
  id: number;
  orderTicket: string;
  staffName: string;
  foldCount: number;
  rate: number;
  total: number;
  createdAt: string;
};

export type DisbursementExpense = {
  id: number;
  expenseDate: string;
  number: string;
  name: string;
  category: string;
  description: string | null;
  amount: number;
};

export type DailySale = {
  id: number;
  saleDate: string;
  saleNumber: string;
  cashAmount: number;
  gcashAmount: number;
  totalAmount: number;
  notes: string | null;
};

export type Machine = {
  id: number;
  machineName: string;
  machineType: 'washer' | 'dryer';
  status: 'available' | 'under_cleaning' | 'maintenance' | 'inactive';
  branch: string;
};

export type Subcleaning = {
  id: number;
  date: string;
  machineIds: number[];
  machineNames: string;
  cleaningStatus: string;
  notes: string | null;
  branch: string;
};

type AppSetting = {
  key: string;
  value: string;
};

type PricingResult = {
  price: number;
  additionalCharge: number;
  extraServiceAmount: number;
  totalAmount: number;
  allowedKg: number;
  extraKg: number;
  warning: string | null;
  extras: Array<{ id: number; name: string; price: number }>;
};

function cleanAddonName(name: string) {
  return name.replace(/^(add[- ]?on|additional)\s+/i, '').trim();
}

const dbName = 'laba101_offline';
const sqlite = new SQLiteConnection(CapacitorSQLite);
let nativeDb: SQLiteDBConnection | null = null;

const seedStaff: Staff[] = [
  { id: 1, name: 'Laba101 Admin', email: 'admin@laba101.test', password: 'password', role: 'admin', branch: 'Main Store' },
  { id: 2, name: 'Laba101 Staff', email: 'staff@laba101.test', password: 'password', role: 'staff', branch: 'Main Store' },
  { id: 3, name: 'Mintal Staff', email: 'mintal@laba101.test', password: 'password', role: 'staff', branch: 'Mintal Branch' },
  { id: 4, name: 'Gensan Staff', email: 'gensan@laba101.test', password: 'password', role: 'staff', branch: 'Gensan Branch' },
];

const seedCustomers: Customer[] = [
  { id: 1, name: 'Mara Santos', phone: '0917 482 1101', address: 'Bajada, Davao City' },
  { id: 2, name: 'Jun Rivera', phone: '0928 314 7720', address: 'Lanang, Davao City' },
  { id: 3, name: 'Ana Cruz', phone: '0935 901 2234', address: 'Matina, Davao City' },
];

const seedServices: LaundryService[] = [
  serviceSeed(1, 'Drop-off', 'Wash, dry and fold.', 'Drop-Off', 'order', 185, 8, 40, ['Wash', 'Dry', 'Fold'], 0, 24),
  serviceSeed(2, 'Full Service', 'Wash, dry, fold, detergent and Fabcon.', 'Full Service', 'order', 200, 8, 40, ['Wash', 'Dry', 'Fold', 'Detergent', 'Fabcon'], 0, 24),
  serviceSeed(3, 'Self Service Wash', 'Max of 8kg per load.', 'Self Service', 'order', 60, 8, null, ['Wash'], 0, 1),
  serviceSeed(4, 'Self Service Dry', 'Regular 40 mins drying time.', 'Self Service', 'order', 70, 8, 40, ['Dry'], 0, 1),
  serviceSeed(5, 'Dry Only', 'Standard drying rate.', 'Dry Only', 'order', 70, 8, 40, ['Dry'], 0, 1),
  serviceSeed(6, 'Additional Dry 10 mins', 'Additional drying time.', 'Dry Only', 'order', 30, 8, 10, ['Dry'], 0, 1),
  serviceSeed(7, 'Additional Dry 20 mins', 'Additional drying time.', 'Dry Only', 'order', 50, 8, 20, ['Dry'], 0, 1),
  serviceSeed(8, 'Additional Dry 40 mins', 'Additional drying time.', 'Dry Only', 'order', 70, 8, 40, ['Dry'], 0, 1),
  serviceSeed(9, 'Additional Zonrox', 'Extra bleach add-on per load.', 'Add-on', 'addon', 25, 0, null, ['Zonrox'], 0, 0),
  serviceSeed(10, 'Additional Fabcon', 'Extra fabric conditioner add-on per load.', 'Add-on', 'addon', 25, 0, null, ['Fabcon'], 0, 0),
  serviceSeed(11, 'Comforter / Bulky Load', 'Comforter and bulky item service.', 'Comforter', 'order', 200, 8, 40, ['Wash', 'Dry', 'Fold'], 0, 24),
];

const seedItemCategories: ItemCategory[] = [
  { id: 1, name: 'Regular Clothes', maxKg: 8, additionalFee: 0, isActive: 1 },
  { id: 2, name: 'Comforter', maxKg: 4, additionalFee: 0, isActive: 1 },
  { id: 3, name: 'Thin Blankets', maxKg: 6, additionalFee: 0, isActive: 1 },
  { id: 4, name: 'Bedsheets', maxKg: 6, additionalFee: 0, isActive: 1 },
  { id: 5, name: 'Bath Towels', maxKg: 6, additionalFee: 0, isActive: 1 },
  { id: 6, name: 'Curtains', maxKg: 6, additionalFee: 0, isActive: 1 },
];

const seedOrders: OrderRow[] = [
  {
    id: 1,
    ticket: 'LB260527-001',
    customerId: 1,
    customer: 'Mara Santos',
    phone: '0917 482 1101',
    serviceId: 1,
    service: 'Drop-off',
    itemCategoryId: 1,
    itemCategory: 'Regular Clothes',
    branch: 'Main Store',
    status: 'washing',
    workflowCompleted: ['received', 'wash'],
    weightKg: 5.75,
    price: 185,
    additionalCharge: 0,
    extraServiceAmount: 0,
    totalAmount: 185,
    paidAmount: 185,
    balance: 0,
    extras: [],
    notes: 'Separate white uniforms.',
    foldedBy: null,
    foldedByName: null,
    dueAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

const seedPayments: Payment[] = [
  { id: 1, orderId: 1, amount: 185, method: 'cash', reference: null, receivedAt: new Date().toISOString(), branch: 'Main Store' },
];

const seedExpenses: DisbursementExpense[] = [
  { id: 1, expenseDate: '2026-05-27', number: 'DISB-01', name: 'Water refill', category: 'Supplies', description: 'Weekly supply', amount: 250 },
  { id: 2, expenseDate: '2026-05-27', number: 'DISB-02', name: 'Detergent', category: 'Supplies', description: 'Laundry detergent', amount: 500 },
];

const seedSales: DailySale[] = [
  { id: 1, saleDate: '2026-05-27', saleNumber: 'SALE-01', cashAmount: 1200, gcashAmount: 500, totalAmount: 1700, notes: 'Seed day total' },
];

const seedMachines: Machine[] = [
  ...[1, 2, 3, 4].map((id) => ({ id, machineName: `Washer ${id}`, machineType: 'washer' as const, status: 'available' as const, branch: 'Main Store' })),
  ...[1, 2, 3, 4].map((n) => ({ id: n + 4, machineName: `Dryer ${n}`, machineType: 'dryer' as const, status: 'available' as const, branch: 'Main Store' })),
];

const seedSettings: AppSetting[] = [
  { key: 'branch', value: 'Main Store' },
  { key: 'fold_rate', value: '5' },
  { key: 'report_email', value: 'admin@laba101.test' },
];

function serviceSeed(
  id: number,
  name: string,
  description: string,
  category: string,
  serviceType: 'order' | 'addon',
  price: number,
  maxKg: number,
  dryingMinutes: number | null,
  includes: string[],
  additionalCharge: number,
  turnaroundHours: number,
): LaundryService {
  return { id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive: 1 };
}

function browserKey(name: string) {
  return `laba101-mobile-${name}`;
}

function readBrowser<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(browserKey(key));
  if (!raw) return structuredClone(fallback);
  try {
    return JSON.parse(raw) as T;
  } catch {
    return structuredClone(fallback);
  }
}

function writeBrowser<T>(key: string, value: T) {
  localStorage.setItem(browserKey(key), JSON.stringify(value));
}

function nextNumericId<T extends { id: number }>(items: T[]) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function nowIso() {
  return new Date().toISOString();
}

function localDateInput(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function todayStamp() {
  return localDateInput().slice(2).replaceAll('-', '');
}

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

async function ensureNativeDb() {
  if (!nativeDb) {
    nativeDb = await sqlite.createConnection(dbName, false, 'no-encryption', 1, false);
    await nativeDb.open();
  }
  return nativeDb;
}

async function addColumnIfMissing(db: SQLiteDBConnection, table: string, column: string, sql: string) {
  const info = await db.query(`PRAGMA table_info(${table})`);
  const exists = (info.values ?? []).some((row) => (row as { name?: string }).name === column);
  if (!exists) {
    await db.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${sql}`);
  }
}

async function ensureSchema() {
  if (!Capacitor.isNativePlatform()) {
    if (!localStorage.getItem(browserKey('seeded_v3'))) {
      writeBrowser('staff', seedStaff);
      writeBrowser('customers', seedCustomers);
      writeBrowser('services', seedServices);
      writeBrowser('item_categories', seedItemCategories);
      writeBrowser('orders', seedOrders);
      writeBrowser('payments', seedPayments);
      writeBrowser('fold_logs', []);
      writeBrowser('expenses', seedExpenses);
      writeBrowser('sales', seedSales);
      writeBrowser('machines', seedMachines);
      writeBrowser('subcleanings', []);
      writeBrowser('settings', seedSettings);
      writeBrowser('seeded_v3', true);
    }
    return;
  }

  const db = await ensureNativeDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS staff (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT, password TEXT, role TEXT, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, phone TEXT, address TEXT);
    CREATE TABLE IF NOT EXISTS laundry_services (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      serviceType TEXT NOT NULL,
      price REAL NOT NULL,
      maxKg REAL NOT NULL,
      dryingMinutes INTEGER,
      includes TEXT,
      additionalCharge REAL NOT NULL DEFAULT 0,
      turnaroundHours INTEGER NOT NULL DEFAULT 24,
      isActive INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS item_categories (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, maxKg REAL NOT NULL, additionalFee REAL NOT NULL DEFAULT 0, isActive INTEGER NOT NULL DEFAULT 1);
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY NOT NULL,
      ticket TEXT NOT NULL,
      customerId INTEGER NOT NULL,
      customer TEXT NOT NULL,
      phone TEXT,
      serviceId INTEGER NOT NULL,
      service TEXT NOT NULL,
      itemCategoryId INTEGER NOT NULL,
      itemCategory TEXT NOT NULL,
      branch TEXT NOT NULL,
      status TEXT NOT NULL,
      workflowCompleted TEXT,
      weightKg REAL NOT NULL,
      price REAL NOT NULL,
      additionalCharge REAL NOT NULL DEFAULT 0,
      extraServiceAmount REAL NOT NULL DEFAULT 0,
      totalAmount REAL NOT NULL,
      paidAmount REAL NOT NULL DEFAULT 0,
      extras TEXT,
      notes TEXT,
      foldedBy INTEGER,
      dueAt TEXT,
      createdAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      orderId INTEGER NOT NULL,
      amount REAL NOT NULL,
      method TEXT NOT NULL,
      reference TEXT,
      receivedAt TEXT NOT NULL,
      branch TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS fold_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, orderTicket TEXT NOT NULL, staffName TEXT NOT NULL, foldCount INTEGER NOT NULL, rate REAL NOT NULL, total REAL NOT NULL, createdAt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS disbursement_expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, expenseDate TEXT NOT NULL, number TEXT NOT NULL, name TEXT NOT NULL, category TEXT NOT NULL, description TEXT, amount REAL NOT NULL);
    CREATE TABLE IF NOT EXISTS daily_sales (id INTEGER PRIMARY KEY AUTOINCREMENT, saleDate TEXT NOT NULL, saleNumber TEXT, cashAmount REAL NOT NULL, gcashAmount REAL NOT NULL, totalAmount REAL NOT NULL, notes TEXT);
    CREATE TABLE IF NOT EXISTS machines (id INTEGER PRIMARY KEY AUTOINCREMENT, machineName TEXT NOT NULL, machineType TEXT NOT NULL, status TEXT NOT NULL, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS subcleanings (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, machineIds TEXT NOT NULL, machineNames TEXT NOT NULL, cleaningStatus TEXT NOT NULL, notes TEXT, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);
  `);

  await addColumnIfMissing(db, 'staff', 'email', 'TEXT');
  await addColumnIfMissing(db, 'staff', 'password', 'TEXT');
  await addColumnIfMissing(db, 'staff', 'role', 'TEXT');
  await addColumnIfMissing(db, 'staff', 'isActive', 'INTEGER NOT NULL DEFAULT 1');
  await db.run('UPDATE staff SET password = ? WHERE password IS NULL OR password = ""', ['password']);
  await db.run('UPDATE staff SET role = ? WHERE role IS NULL OR role = ""', ['staff']);
  await addColumnIfMissing(db, 'orders', 'customerId', 'INTEGER NOT NULL DEFAULT 0');
  await addColumnIfMissing(db, 'orders', 'phone', 'TEXT');
  await addColumnIfMissing(db, 'orders', 'serviceId', 'INTEGER NOT NULL DEFAULT 0');
  await addColumnIfMissing(db, 'orders', 'itemCategoryId', 'INTEGER NOT NULL DEFAULT 0');
  await addColumnIfMissing(db, 'orders', 'itemCategory', 'TEXT NOT NULL DEFAULT "Regular Clothes"');
  await addColumnIfMissing(db, 'orders', 'workflowCompleted', 'TEXT');
  await addColumnIfMissing(db, 'orders', 'weightKg', 'REAL NOT NULL DEFAULT 0');
  await addColumnIfMissing(db, 'orders', 'price', 'REAL NOT NULL DEFAULT 0');
  await addColumnIfMissing(db, 'orders', 'additionalCharge', 'REAL NOT NULL DEFAULT 0');
  await addColumnIfMissing(db, 'orders', 'extraServiceAmount', 'REAL NOT NULL DEFAULT 0');
  await addColumnIfMissing(db, 'orders', 'totalAmount', 'REAL NOT NULL DEFAULT 0');
  await addColumnIfMissing(db, 'orders', 'paidAmount', 'REAL NOT NULL DEFAULT 0');
  await addColumnIfMissing(db, 'orders', 'extras', 'TEXT');
  await addColumnIfMissing(db, 'orders', 'notes', 'TEXT');
  await addColumnIfMissing(db, 'orders', 'dueAt', 'TEXT');
  await addColumnIfMissing(db, 'orders', 'createdAt', 'TEXT NOT NULL DEFAULT ""');
  await addColumnIfMissing(db, 'daily_sales', 'saleNumber', 'TEXT');

  const staffCount = await db.query('SELECT COUNT(*) as count FROM staff');
  if (((staffCount.values?.[0] as { count: number } | undefined)?.count ?? 0) === 0) {
    for (const staff of seedStaff) await db.run('INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)', [staff.id, staff.name, staff.email, staff.password, staff.role, staff.branch, 1]);
    for (const customer of seedCustomers) await db.run('INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)', [customer.id, customer.name, customer.phone, customer.address]);
    for (const service of seedServices) await db.run('INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [service.id, service.name, service.description, service.category, service.serviceType, service.price, service.maxKg, service.dryingMinutes, JSON.stringify(service.includes), service.additionalCharge, service.turnaroundHours, service.isActive]);
    for (const category of seedItemCategories) await db.run('INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)', [category.id, category.name, category.maxKg, category.additionalFee, category.isActive]);
    for (const order of seedOrders) await insertNativeOrder(db, order);
    for (const payment of seedPayments) await db.run('INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)', [payment.id, payment.orderId, payment.amount, payment.method, payment.reference, payment.receivedAt, payment.branch]);
    for (const expense of seedExpenses) await db.run('INSERT INTO disbursement_expenses (id, expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)', [expense.id, expense.expenseDate, expense.number, expense.name, expense.category, expense.description, expense.amount]);
    for (const sale of seedSales) await db.run('INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)', [sale.id, sale.saleDate, sale.saleNumber, sale.cashAmount, sale.gcashAmount, sale.totalAmount, sale.notes]);
    for (const machine of seedMachines) await db.run('INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)', [machine.id, machine.machineName, machine.machineType, machine.status, machine.branch]);
    for (const setting of seedSettings) await db.run('INSERT INTO settings (key, value) VALUES (?, ?)', [setting.key, setting.value]);
  }
}

async function insertNativeOrder(db: SQLiteDBConnection, order: OrderRow) {
  await db.run(
    'INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [order.id, order.ticket, order.customerId, order.customer, order.phone, order.serviceId, order.service, order.itemCategoryId, order.itemCategory, order.branch, order.status, JSON.stringify(order.workflowCompleted), order.weightKg, order.price, order.additionalCharge, order.extraServiceAmount, order.totalAmount, order.paidAmount, JSON.stringify(order.extras), order.notes, order.foldedBy, order.dueAt, order.createdAt],
  );
}

function hydrateOrder(row: Record<string, unknown>): OrderRow {
  const paidAmount = Number(row.paidAmount ?? 0);
  const totalAmount = Number(row.totalAmount ?? 0);
  const foldedBy = Number(row.foldedBy);
  return {
    id: Number(row.id),
    ticket: String(row.ticket),
    customerId: Number(row.customerId),
    customer: String(row.customer),
    phone: row.phone ? String(row.phone) : null,
    serviceId: Number(row.serviceId),
    service: String(row.service),
    itemCategoryId: Number(row.itemCategoryId),
    itemCategory: String(row.itemCategory),
    branch: String(row.branch),
    status: String(row.status),
    workflowCompleted: parseJson<string[]>(row.workflowCompleted as string | null, []),
    weightKg: Number(row.weightKg),
    price: Number(row.price),
    additionalCharge: Number(row.additionalCharge),
    extraServiceAmount: Number(row.extraServiceAmount),
    totalAmount,
    paidAmount,
    balance: Number((totalAmount - paidAmount).toFixed(2)),
    extras: parseJson<Array<{ id: number; name: string; price: number }>>(row.extras as string | null, []),
    notes: row.notes ? String(row.notes) : null,
    foldedBy: Number.isFinite(foldedBy) && foldedBy > 0 ? foldedBy : null,
    foldedByName: row.foldedByName ? String(row.foldedByName) : null,
    dueAt: String(row.dueAt),
    createdAt: String(row.createdAt),
  };
}

export async function initOfflineStore() {
  await ensureSchema();
}

export async function getBranch() {
  const settings = await listSettings();
  return settings.find((item) => item.key === 'branch')?.value ?? 'Main Store';
}

export async function getFoldRate() {
  const settings = await listSettings();
  return Number(settings.find((item) => item.key === 'fold_rate')?.value ?? '5');
}

export async function getSetting(key: string) {
  const settings = await listSettings();
  return settings.find((item) => item.key === key)?.value;
}

export async function listSettings() {
  if (!Capacitor.isNativePlatform()) return readBrowser<AppSetting[]>('settings', seedSettings);
  const db = await ensureNativeDb();
  const result = await db.query('SELECT key, value FROM settings ORDER BY key');
  return (result.values ?? []) as AppSetting[];
}

export async function setSetting(key: string, value: string) {
  if (!Capacitor.isNativePlatform()) {
    const settings = readBrowser<AppSetting[]>('settings', seedSettings).filter((item) => item.key !== key);
    settings.push({ key, value });
    writeBrowser('settings', settings);
    return;
  }
  const db = await ensureNativeDb();
  await db.run('REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
}

export async function listStaff(branch: string): Promise<Staff[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<Staff[]>('staff', seedStaff).filter((staff) => staff.branch === branch);
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff WHERE branch = ? ORDER BY name ASC', [branch]);
  return (result.values ?? []) as Staff[];
}

export async function listAllStaff(): Promise<Staff[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<Staff[]>('staff', seedStaff);
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, name, COALESCE(email, "") as email, COALESCE(password, "password") as password, COALESCE(role, "staff") as role, branch, COALESCE(isActive, 1) as isActive FROM staff ORDER BY name ASC');
  return (result.values ?? []) as Staff[];
}

export async function authenticateUser(email: string, password: string): Promise<Staff | null> {
  const normalized = email.trim().toLowerCase();
  const users = await listAllStaff();
  return users.find((user) => user.email.toLowerCase() === normalized && user.password === password && user.isActive !== 0) ?? null;
}

export async function createStaff(input: { name: string; email: string; password: string; role: 'admin' | 'staff'; branch: string }) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<Staff[]>('staff', seedStaff);
    items.unshift({ id: nextNumericId(items), ...input, isActive: 1 });
    writeBrowser('staff', items);
    return;
  }
  const db = await ensureNativeDb();
  await db.run('INSERT INTO staff (name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?)', [input.name, input.email, input.password, input.role, input.branch, 1]);
}

export async function updateStaff(id: number, input: Partial<Staff>) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<Staff[]>('staff', seedStaff);
    const existing = items.find((item) => item.id === id);
    if (existing) {
      Object.assign(existing, input);
      writeBrowser('staff', items);
    }
    return;
  }
  const db = await ensureNativeDb();
  const updates: string[] = [];
  const values: any[] = [];
  for (const [key, val] of Object.entries(input)) {
    if (key === 'id') continue;
    updates.push(`${key} = ?`);
    values.push(val);
  }
  if (!updates.length) return;
  values.push(id);
  await db.run(`UPDATE staff SET ${updates.join(', ')} WHERE id = ?`, values);
}

export async function listCustomers(): Promise<Customer[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<Customer[]>('customers', seedCustomers).sort((a, b) => a.name.localeCompare(b.name));
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, name, phone, address FROM customers ORDER BY name ASC');
  return (result.values ?? []) as Customer[];
}

export async function upsertCustomer(input: { id?: number; name: string; phone?: string | null; address?: string | null }): Promise<Customer> {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<Customer[]>('customers', seedCustomers);
    const existing = input.id ? items.find((item) => item.id === input.id) : items.find((item) => item.name.toLowerCase() === input.name.toLowerCase() && (input.phone ? item.phone === input.phone : true));
    if (existing) {
      existing.name = input.name;
      existing.phone = input.phone ?? existing.phone;
      existing.address = input.address ?? existing.address;
      writeBrowser('customers', items);
      return existing;
    }
    const customer = { id: nextNumericId(items), name: input.name, phone: input.phone ?? null, address: input.address ?? null };
    items.push(customer);
    writeBrowser('customers', items);
    return customer;
  }
  const db = await ensureNativeDb();
  if (input.id) {
    await db.run('UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?', [input.name, input.phone ?? null, input.address ?? null, input.id]);
    return { id: input.id, name: input.name, phone: input.phone ?? null, address: input.address ?? null };
  }
  const result = await db.query('SELECT COALESCE(MAX(id), 0) + 1 as id FROM customers');
  const id = Number((result.values?.[0] as { id: number }).id);
  await db.run('INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)', [id, input.name, input.phone ?? null, input.address ?? null]);
  return { id, name: input.name, phone: input.phone ?? null, address: input.address ?? null };
}

export async function listServices(type?: 'order' | 'addon'): Promise<LaundryService[]> {
  if (!Capacitor.isNativePlatform()) {
    return readBrowser<LaundryService[]>('services', seedServices).filter((service) => !type || service.serviceType === type);
  }
  const db = await ensureNativeDb();
  const result = await db.query(`SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ${type ? 'WHERE serviceType = ?' : ''} ORDER BY name ASC`, type ? [type] : []);
  return (result.values ?? []).map((row) => ({ ...(row as LaundryService), includes: parseJson<string[]>((row as { includes?: string }).includes, []) }));
}

export async function listAllServices(): Promise<LaundryService[]> {
  if (!Capacitor.isNativePlatform()) {
    return readBrowser<LaundryService[]>('services', seedServices);
  }
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC');
  return (result.values ?? []).map((row) => ({ ...(row as LaundryService), includes: parseJson<string[]>((row as { includes?: string }).includes, []) }));
}

export async function saveService(input: Omit<LaundryService, 'id'> & { id?: number }) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<LaundryService[]>('services', seedServices);
    const existing = input.id ? items.find((item) => item.id === input.id) : null;
    if (existing) Object.assign(existing, input);
    else items.unshift({ ...input, id: nextNumericId(items) });
    writeBrowser('services', items);
    return;
  }
  const db = await ensureNativeDb();
  if (input.id) {
    await db.run('UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = ? WHERE id = ?', [input.name, input.description, input.category, input.serviceType, input.price, input.maxKg, input.dryingMinutes, JSON.stringify(input.includes), input.additionalCharge, input.turnaroundHours, input.isActive, input.id]);
  } else {
    await db.run('INSERT INTO laundry_services (name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [input.name, input.description, input.category, input.serviceType, input.price, input.maxKg, input.dryingMinutes, JSON.stringify(input.includes), input.additionalCharge, input.turnaroundHours, input.isActive]);
  }
}

export async function deleteService(id: number) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<LaundryService[]>('services', seedServices);
    const service = items.find((item) => item.id === id);
    if (service) service.isActive = 0;
    writeBrowser('services', items);
    return;
  }
  const db = await ensureNativeDb();
  await db.run('UPDATE laundry_services SET isActive = 0 WHERE id = ?', [id]);
}

export async function listItemCategories(): Promise<ItemCategory[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<ItemCategory[]>('item_categories', seedItemCategories).filter((item) => item.isActive);
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC');
  return (result.values ?? []) as ItemCategory[];
}

export async function saveItemCategory(input: Omit<ItemCategory, 'id'> & { id?: number }) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<ItemCategory[]>('item_categories', seedItemCategories);
    const existing = input.id ? items.find((item) => item.id === input.id) : null;
    if (existing) Object.assign(existing, input);
    else items.unshift({ ...input, id: nextNumericId(items) });
    writeBrowser('item_categories', items);
    return;
  }
  const db = await ensureNativeDb();
  if (input.id) await db.run('UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = ? WHERE id = ?', [input.name, input.maxKg, input.additionalFee, input.isActive, input.id]);
  else await db.run('INSERT INTO item_categories (name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?)', [input.name, input.maxKg, input.additionalFee, input.isActive]);
}

export function calculatePricing(service: LaundryService, category: ItemCategory, weightKg: number, addons: LaundryService[]): PricingResult {
  const allowedKg = Number(category.maxKg);
  const extraKg = Math.max(0, weightKg - allowedKg);
  const additionalCharge = 0;
  const extraServiceAmount = addons.reduce((sum, addon) => sum + Number(addon.price), 0);
  const extras = addons.map((addon) => ({ id: addon.id, name: cleanAddonName(addon.name), price: Number(addon.price) }));
  const totalAmount = Number((Number(service.price) + additionalCharge + extraServiceAmount).toFixed(2));
  return {
    price: Number(service.price),
    additionalCharge: Number(additionalCharge.toFixed(2)),
    extraServiceAmount: Number(extraServiceAmount.toFixed(2)),
    totalAmount,
    allowedKg,
    extraKg: Number(extraKg.toFixed(2)),
    warning: extraKg > 0 ? `Weight exceeds the ${category.name} load limit of ${allowedKg.toFixed(2)} kg.` : null,
    extras,
  };
}

export function workflowSteps(order: Pick<OrderRow, 'serviceId' | 'extras' | 'workflowCompleted'>, services: LaundryService[]) {
  const service = services.find((item) => item.id === order.serviceId);
  const includes = service?.includes ?? [];
  const steps = [{ key: 'received', label: 'Received' }];
  if (includes.includes('Wash')) steps.push({ key: 'wash', label: 'Wash' });
  if (order.extras.length) steps.push({ key: 'extras', label: 'Extra services' });
  if (includes.includes('Dry') || (service?.dryingMinutes ?? 0) > 0) steps.push({ key: 'dry', label: 'Dry' });
  if (includes.includes('Fold')) steps.push({ key: 'fold', label: 'Fold' });
  steps.push({ key: 'ready', label: 'Ready' }, { key: 'claimed', label: 'Claimed' });
  return steps;
}

function statusFromCompleted(completed: string[]) {
  if (completed.includes('claimed')) return 'claimed';
  if (completed.includes('ready')) return 'ready';
  if (completed.includes('dry')) return 'drying';
  if (completed.includes('extras') || completed.includes('wash')) return 'washing';
  return 'received';
}

export async function listOrders(branch: string): Promise<OrderRow[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<OrderRow[]>('orders', seedOrders).filter((order) => order.branch === branch).map((order) => ({ ...order, balance: Number((order.totalAmount - order.paidAmount).toFixed(2)) }));
  const db = await ensureNativeDb();
  const result = await db.query('SELECT o.*, s.name as foldedByName FROM orders o LEFT JOIN staff s ON s.id = o.foldedBy WHERE o.branch = ? ORDER BY o.id DESC', [branch]);
  return (result.values ?? []).map((row) => hydrateOrder(row as Record<string, unknown>));
}

export async function createOrder(input: { customerId?: number; customerName: string; customerPhone?: string | null; serviceId: number; itemCategoryId: number; branch: string; weightKg: number; addonIds: number[]; paidAmount: number; paymentMethod: 'cash' | 'gcash'; paymentReference?: string | null; notes?: string | null }) {
  const [services, categories] = await Promise.all([listServices(), listItemCategories()]);
  const service = services.find((item) => item.id === input.serviceId);
  const category = categories.find((item) => item.id === input.itemCategoryId);
  if (!service || !category) throw new Error('Service or item category is missing.');
  const addons = services.filter((item) => input.addonIds.includes(item.id));
  const pricing = calculatePricing(service, category, input.weightKg, addons);
  if (pricing.extraKg > 0) throw new Error(pricing.warning ?? 'Weight exceeds the allowed limit.');
  const customer = await upsertCustomer({ id: input.customerId || undefined, name: input.customerName, phone: input.customerPhone ?? null });
  const tenderedAmount = Math.max(0, input.paidAmount);
  const paidAmount = Math.min(pricing.totalAmount, tenderedAmount);
  const orderBase = {
    ticket: await nextOrderNumber(),
    customerId: customer.id,
    customer: customer.name,
    phone: customer.phone,
    serviceId: service.id,
    service: service.name,
    itemCategoryId: category.id,
    itemCategory: category.name,
    branch: input.branch,
    status: 'received',
    workflowCompleted: ['received'],
    weightKg: input.weightKg,
    price: pricing.price,
    additionalCharge: pricing.additionalCharge,
    extraServiceAmount: pricing.extraServiceAmount,
    totalAmount: pricing.totalAmount,
    paidAmount,
    balance: Number((pricing.totalAmount - paidAmount).toFixed(2)),
    extras: pricing.extras,
    notes: [input.notes, pricing.warning].filter(Boolean).join('\n') || null,
    foldedBy: null,
    foldedByName: null,
    dueAt: new Date(Date.now() + service.turnaroundHours * 60 * 60 * 1000).toISOString(),
    createdAt: nowIso(),
  };

  if (!Capacitor.isNativePlatform()) {
    const orders = readBrowser<OrderRow[]>('orders', seedOrders);
    const order = { ...orderBase, id: nextNumericId(orders) };
    orders.unshift(order);
    writeBrowser('orders', orders);
    if (tenderedAmount > 0) await recordPayment(order.id, { amount: tenderedAmount, method: input.paymentMethod, reference: input.paymentReference ?? null });
    return order;
  }
  const db = await ensureNativeDb();
  const idResult = await db.query('SELECT COALESCE(MAX(id), 0) + 1 as id FROM orders');
  const order = { ...orderBase, id: Number((idResult.values?.[0] as { id: number }).id) };
  await insertNativeOrder(db, order);
  if (tenderedAmount > 0) await db.run('INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)', [order.id, tenderedAmount, input.paymentMethod, input.paymentReference ?? null, nowIso(), input.branch]);
  return order;
}

export async function nextOrderNumber() {
  const prefix = `LB${todayStamp()}`;
  const branch = await getBranch();
  const orders = await listOrders(branch);
  const last = orders.filter((order) => order.ticket.startsWith(prefix)).sort((a, b) => b.ticket.localeCompare(a.ticket))[0];
  const next = last ? Number(last.ticket.slice(-3)) + 1 : 1;
  return `${prefix}-${String(next).padStart(3, '0')}`;
}

export async function advanceOrder(orderId: number, assignedStaffId?: number | null) {
  const branch = await getBranch();
  const [orders, services] = await Promise.all([listOrders(branch), listServices()]);
  const order = orders.find((item) => item.id === orderId);
  if (!order) return;
  const steps = workflowSteps(order, services).map((step) => step.key);
  const next = steps.find((key) => !order.workflowCompleted.includes(key));
  if (!next) return;
  order.workflowCompleted = [...order.workflowCompleted, next];
  order.status = statusFromCompleted(order.workflowCompleted);
  if (next === 'fold' && assignedStaffId) order.foldedBy = assignedStaffId;
  if (!Capacitor.isNativePlatform()) {
    const all = readBrowser<OrderRow[]>('orders', seedOrders);
    const existing = all.find((item) => item.id === order.id);
    if (existing) Object.assign(existing, order);
    writeBrowser('orders', all);
    return;
  }
  const db = await ensureNativeDb();
  await db.run('UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ? WHERE id = ?', [JSON.stringify(order.workflowCompleted), order.status, order.foldedBy, order.id]);
}

export async function recordPayment(orderId: number, input: { amount: number; method: 'cash' | 'gcash'; reference?: string | null }) {
  const branch = await getBranch();
  const orders = await listOrders(branch);
  const order = orders.find((item) => item.id === orderId);
  if (!order) return;
  const amount = Math.max(0, input.amount);
  if (amount <= 0) return;
  if (!Capacitor.isNativePlatform()) {
    const payments = readBrowser<Payment[]>('payments', seedPayments);
    payments.unshift({ id: nextNumericId(payments), orderId, amount, method: input.method, reference: input.reference ?? null, receivedAt: nowIso(), branch });
    writeBrowser('payments', payments);
    const allOrders = readBrowser<OrderRow[]>('orders', seedOrders);
    const existing = allOrders.find((item) => item.id === orderId);
    if (existing) existing.paidAmount = Math.min(existing.totalAmount, Number((existing.paidAmount + amount).toFixed(2)));
    writeBrowser('orders', allOrders);
    return;
  }
  const db = await ensureNativeDb();
  await db.run('INSERT INTO payments (orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?)', [orderId, amount, input.method, input.reference ?? null, nowIso(), branch]);
  await db.run('UPDATE orders SET paidAmount = MIN(totalAmount, paidAmount + ?) WHERE id = ?', [amount, orderId]);
}

export async function listPayments(orderId?: number): Promise<Payment[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<Payment[]>('payments', seedPayments).filter((payment) => !orderId || payment.orderId === orderId);
  const db = await ensureNativeDb();
  const result = await db.query(`SELECT id, orderId, amount, method, reference, receivedAt, branch FROM payments ${orderId ? 'WHERE orderId = ?' : ''} ORDER BY receivedAt DESC`, orderId ? [orderId] : []);
  return (result.values ?? []) as Payment[];
}

export async function listFoldLogs(): Promise<FoldLog[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<FoldLog[]>('fold_logs', []);
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, orderTicket, staffName, foldCount, rate, total, createdAt FROM fold_logs ORDER BY id DESC');
  return (result.values ?? []) as FoldLog[];
}

export async function createFoldLog(input: { orderTicket: string; staffName: string; foldCount: number; rate: number }) {
  const total = Number((input.foldCount * input.rate).toFixed(2));
  if (!Capacitor.isNativePlatform()) {
    const logs = readBrowser<FoldLog[]>('fold_logs', []);
    logs.unshift({ id: Date.now(), ...input, total, createdAt: nowIso() });
    writeBrowser('fold_logs', logs);
    return;
  }
  const db = await ensureNativeDb();
  await db.run('INSERT INTO fold_logs (orderTicket, staffName, foldCount, rate, total, createdAt) VALUES (?, ?, ?, ?, ?, ?)', [input.orderTicket, input.staffName, input.foldCount, input.rate, total, nowIso()]);
}

export async function listExpenses(): Promise<DisbursementExpense[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<DisbursementExpense[]>('expenses', seedExpenses);
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, expenseDate, number, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC');
  return (result.values ?? []) as DisbursementExpense[];
}

export async function createExpense(input: { expenseDate: string; name: string; category: string; description: string; amount: number }) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<DisbursementExpense[]>('expenses', seedExpenses);
    const id = nextNumericId(items);
    items.unshift({ id, expenseDate: input.expenseDate, number: `DISB-${String(id).padStart(2, '0')}`, name: input.name, category: input.category, description: input.description || null, amount: input.amount });
    writeBrowser('expenses', items);
    return;
  }
  const db = await ensureNativeDb();
  const countResult = await db.query('SELECT COALESCE(MAX(id), 0) + 1 as id FROM disbursement_expenses');
  const nextId = Number((countResult.values?.[0] as { id: number }).id);
  await db.run('INSERT INTO disbursement_expenses (expenseDate, number, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?)', [input.expenseDate, `DISB-${String(nextId).padStart(2, '0')}`, input.name, input.category, input.description || null, input.amount]);
}

export async function listDailySales(): Promise<DailySale[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<DailySale[]>('sales', seedSales);
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes FROM daily_sales ORDER BY saleDate DESC, id DESC');
  return (result.values ?? []) as DailySale[];
}

export async function saveDailySale(input: { saleDate: string; cashAmount: number; gcashAmount: number; notes: string }) {
  const totalAmount = Number((input.cashAmount + input.gcashAmount).toFixed(2));
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<DailySale[]>('sales', seedSales);
    const existing = items.find((item) => item.saleDate === input.saleDate);
    if (existing) Object.assign(existing, { cashAmount: input.cashAmount, gcashAmount: input.gcashAmount, totalAmount, notes: input.notes || null });
    else {
      const id = nextNumericId(items);
      items.unshift({ id, saleDate: input.saleDate, saleNumber: `SALE-${String(id).padStart(2, '0')}`, cashAmount: input.cashAmount, gcashAmount: input.gcashAmount, totalAmount, notes: input.notes || null });
    }
    writeBrowser('sales', items);
    return;
  }
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?', [input.saleDate]);
  const existing = result.values?.[0] as { id: number; saleNumber?: string } | undefined;
  if (existing) await db.run('UPDATE daily_sales SET cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?', [input.cashAmount, input.gcashAmount, totalAmount, input.notes || null, existing.id]);
  else {
    const idResult = await db.query('SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales');
    const id = Number((idResult.values?.[0] as { id: number }).id);
    await db.run('INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)', [input.saleDate, `SALE-${String(id).padStart(2, '0')}`, input.cashAmount, input.gcashAmount, totalAmount, input.notes || null]);
  }
}

export async function listMachines(branch: string): Promise<Machine[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<Machine[]>('machines', seedMachines).filter((machine) => machine.branch === branch);
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName', [branch]);
  return (result.values ?? []) as Machine[];
}

export async function saveMachine(input: { machineName: string; machineType: 'washer' | 'dryer'; status: 'available' | 'under_cleaning' | 'maintenance'; branch: string }) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<Machine[]>('machines', seedMachines);
    items.unshift({ id: nextNumericId(items), ...input });
    writeBrowser('machines', items);
    return;
  }
  const db = await ensureNativeDb();
  await db.run('INSERT INTO machines (machineName, machineType, status, branch) VALUES (?, ?, ?, ?)', [input.machineName, input.machineType, input.status, input.branch]);
}

export async function updateMachine(id: number, status: string) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<Machine[]>('machines', seedMachines);
    const existing = items.find((item) => item.id === id);
    if (existing) {
      existing.status = status as any;
      writeBrowser('machines', items);
    }
    return;
  }
  const db = await ensureNativeDb();
  await db.run('UPDATE machines SET status = ? WHERE id = ?', [status, id]);
}

export async function listSubcleanings(branch: string): Promise<Subcleaning[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<Subcleaning[]>('subcleanings', []).filter((item) => item.branch === branch);
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, date, machineIds, machineNames, cleaningStatus, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC', [branch]);
  return (result.values ?? []).map((row) => ({ ...(row as Subcleaning), machineIds: parseJson<number[]>((row as { machineIds: string }).machineIds, []) }));
}

export async function saveSubcleaning(input: { date: string; machineIds: number[]; cleaningStatus: string; notes: string; branch: string }) {
  const machines = await listMachines(input.branch);
  const machineNames = machines.filter((machine) => input.machineIds.includes(machine.id)).map((machine) => machine.machineName).join(', ');
  if (!Capacitor.isNativePlatform()) {
    const logs = readBrowser<Subcleaning[]>('subcleanings', []);
    logs.unshift({ id: nextNumericId(logs), date: input.date, machineIds: input.machineIds, machineNames, cleaningStatus: input.cleaningStatus, notes: input.notes || null, branch: input.branch });
    writeBrowser('subcleanings', logs);
    const allMachines = readBrowser<Machine[]>('machines', seedMachines);
    allMachines.forEach((machine) => {
      if (input.machineIds.includes(machine.id)) machine.status = input.cleaningStatus === 'completed' ? 'available' : 'under_cleaning';
    });
    writeBrowser('machines', allMachines);
    return;
  }
  const db = await ensureNativeDb();
  await db.run('INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)', [input.date, JSON.stringify(input.machineIds), machineNames, input.cleaningStatus, input.notes || null, input.branch]);
  const status = input.cleaningStatus === 'completed' ? 'available' : 'under_cleaning';
  for (const id of input.machineIds) await db.run('UPDATE machines SET status = ? WHERE id = ?', [status, id]);
}

export async function completeCleaning(machineId: number, branch: string): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    const allMachines = readBrowser<Machine[]>('machines', seedMachines);
    const machine = allMachines.find((m) => m.id === machineId);
    if (machine) machine.status = 'available';
    writeBrowser('machines', allMachines);
    const logs = readBrowser<Subcleaning[]>('subcleanings', []);
    const todayStr = localDateInput();
    logs.unshift({ id: nextNumericId(logs), date: todayStr, machineIds: [machineId], machineNames: machine?.machineName ?? '', cleaningStatus: 'completed', notes: null, branch });
    writeBrowser('subcleanings', logs);
    return;
  }
  const db = await ensureNativeDb();
  const nameResult = await db.query('SELECT machineName FROM machines WHERE id = ?', [machineId]);
  const machineName = (nameResult.values?.[0] as { machineName: string } | undefined)?.machineName ?? '';
  await db.run('UPDATE machines SET status = ? WHERE id = ?', ['available', machineId]);
  const todayStr = localDateInput();
  await db.run(
    'INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, notes, branch) VALUES (?, ?, ?, ?, ?, ?)',
    [todayStr, JSON.stringify([machineId]), machineName, 'completed', null, branch]
  );
}
