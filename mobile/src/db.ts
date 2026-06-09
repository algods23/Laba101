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

export type OrderLine = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

export type OrderRow = {
  id: number;
  ticket: string;
  customerId: number;
  customer: string;
  phone: string | null;
  serviceId: number;
  service: string;
  serviceLines?: OrderLine[];
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
  extras: Array<{ id: number; name: string; price: number; quantity?: number; total?: number }>;
  notes: string | null;
  foldedBy: number | null;
  foldedByName: string | null;
  foldedByStaffIds: number[];
  releasedBy: number | null;
  releasedByName: string | null;
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
  disbursementType?: 'daily' | 'monthly';
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
  status?: string | null;
  endorsedTo?: string | null;
  statusUpdatedAt?: string | null;
};

export type RevolvingHistory = {
  id: number;
  revolvingNumber: string;
  name: string;
  amount: number;
  category: string;
  description: string | null;
  type: 'disbursement' | 'add';
  createdAt: string;
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
  cleaningType?: 'tube' | 'general';
  notes: string | null;
  branch: string;
};

export type ActivityLog = {
  id: number;
  timestamp: string;
  staffId: number | null;
  staffName: string;
  action: string;
  details: string;
  branch: string;
};

export type InventoryItem = {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  reorderLevel: number;
  notes: string | null;
  branch: string;
  updatedAt: string;
};

export type InventoryMovement = {
  id: number;
  itemId: number;
  itemName: string;
  movementType: 'in' | 'out';
  quantity: number;
  notes: string | null;
  staffName: string;
  branch: string;
  createdAt: string;
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
  warning: null;
  serviceLines: OrderLine[];
  extras: Array<{ id: number; name: string; price: number; quantity: number; total: number }>;
};

function cleanAddonName(name: string) {
  return name.replace(/^(add[- ]?on|additional)\s+/i, '').trim();
}

const dbName = 'laba101_offline';
const freshStartResetKey = 'fresh_start_reset_v1';
const sqlite = new SQLiteConnection(CapacitorSQLite);
let nativeDb: SQLiteDBConnection | null = null;

/** Default logins bundled on a fresh APK install (offline SQLite). */
export const defaultLoginAccounts = [
  { role: 'Admin', branch: 'Main Store', email: 'admin@laba101.test', password: 'password' },
  { role: 'Staff (Gensan)', branch: 'Gensan Branch', email: 'staff@laba101.gensan', password: 'password' },
] as const;

const seedStaff: Staff[] = [
  { id: 1, name: 'Laba101 Admin', email: 'admin@laba101.test', password: 'password', role: 'admin', branch: 'Main Store' },
  { id: 2, name: 'Gensan Branch Staff', email: 'staff@laba101.gensan', password: 'password', role: 'staff', branch: 'Gensan Branch' },
];

const seedCustomers: Customer[] = [];

/** Core laundry services (fresh install). Add-ons are optional extras for POS. */
const seedServices: LaundryService[] = [
  serviceSeed(1, 'Drop-off', 'P185. Includes wash, dry, and fold.', 'Drop-Off', 'order', 185, 8, 40, ['Wash', 'Dry', 'Fold'], 0, 24),
  serviceSeed(2, 'Full Service', 'P200. Wash, Fabcon, detergent, dry, and fold.', 'Full Service', 'order', 200, 8, 40, ['Wash', 'Dry', 'Fold', 'Detergent', 'Fabcon'], 0, 24),
  serviceSeed(3, 'Self Service Wash', 'P60. Self-service wash (max 8kg per load).', 'Self Service', 'order', 60, 8, null, ['Wash'], 0, 1),
  serviceSeed(4, 'Self Service Dry', 'P70. Self-service dry (40 mins).', 'Self Service', 'order', 70, 8, 40, ['Dry'], 0, 1),
  serviceSeed(6, 'Dry 10 mins', 'Additional drying time (10 mins).', 'Add-on', 'addon', 30, 8, 10, ['Dry'], 0, 1),
  serviceSeed(7, 'Dry 20 mins', 'Additional drying time (20 mins).', 'Add-on', 'addon', 50, 8, 20, ['Dry'], 0, 1),
  serviceSeed(8, 'Dry 40 mins', 'Additional drying time (40 mins).', 'Add-on', 'addon', 70, 8, 40, ['Dry'], 0, 1),
  serviceSeed(9, 'Additional Zonrox', 'Extra Zonrox bleach add-on per load.', 'Add-on', 'addon', 10, 0, null, ['Zonrox'], 0, 0),
  serviceSeed(10, 'Additional Fabcon', 'Extra Fabcon fabric conditioner add-on per load.', 'Add-on', 'addon', 10, 0, null, ['Fabcon'], 0, 0),
  serviceSeed(11, 'Additional Finishing', 'Extra finishing spray add-on per load.', 'Add-on', 'addon', 20, 0, null, ['Finishing'], 0, 0),
];

const seedItemCategories: ItemCategory[] = [
  { id: 1, name: 'Regular Clothes', maxKg: 8, additionalFee: 0, isActive: 1 },
  { id: 2, name: 'Comforter', maxKg: 4, additionalFee: 0, isActive: 1 },
  { id: 3, name: 'Thin Blankets', maxKg: 6, additionalFee: 0, isActive: 1 },
  { id: 4, name: 'Bedsheets', maxKg: 6, additionalFee: 0, isActive: 1 },
  { id: 5, name: 'Bath Towels', maxKg: 6, additionalFee: 0, isActive: 1 },
  { id: 6, name: 'Curtains', maxKg: 6, additionalFee: 0, isActive: 1 },
];

function syncBrowserSeedRows<T extends { id: number; isActive: number }>(key: string, seedRows: T[]) {
  const currentRows = readBrowser<T[]>(key, []);
  const rowsById = new Map(currentRows.map((row) => [row.id, row]));
  const mergedRows = seedRows.map((seedRow) => {
    const existing = rowsById.get(seedRow.id);
    return existing ? { ...seedRow, ...existing, isActive: existing.isActive ?? seedRow.isActive } : seedRow;
  });
  if (currentRows.length !== mergedRows.length || mergedRows.some((row, index) => row.id !== currentRows[index]?.id || JSON.stringify(row) !== JSON.stringify(currentRows[index]))) {
    writeBrowser(key, mergedRows);
  }
}

async function syncBrowserSeedLaundryCatalog() {
  syncBrowserSeedRows('services', seedServices);
  syncBrowserSeedRows('item_categories', seedItemCategories);
}

async function syncSeedLaundryCatalog(db: SQLiteDBConnection) {
  for (const service of seedServices) {
    const existing = await db.query('SELECT id FROM laundry_services WHERE id = ?', [service.id]);
    if ((existing.values ?? []).length > 0) {
      await db.run(
        'UPDATE laundry_services SET name = ?, description = ?, category = ?, serviceType = ?, price = ?, maxKg = ?, dryingMinutes = ?, includes = ?, additionalCharge = ?, turnaroundHours = ?, isActive = COALESCE(isActive, ?) WHERE id = ?',
        [service.name, service.description, service.category, service.serviceType, service.price, service.maxKg, service.dryingMinutes, JSON.stringify(service.includes), service.additionalCharge, service.turnaroundHours, service.isActive, service.id],
      );
    } else {
      await db.run('INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [service.id, service.name, service.description, service.category, service.serviceType, service.price, service.maxKg, service.dryingMinutes, JSON.stringify(service.includes), service.additionalCharge, service.turnaroundHours, service.isActive]);
    }
  }

  for (const category of seedItemCategories) {
    const existing = await db.query('SELECT id FROM item_categories WHERE id = ?', [category.id]);
    if ((existing.values ?? []).length > 0) {
      await db.run(
        'UPDATE item_categories SET name = ?, maxKg = ?, additionalFee = ?, isActive = COALESCE(isActive, ?) WHERE id = ?',
        [category.name, category.maxKg, category.additionalFee, category.isActive, category.id],
      );
    } else {
      await db.run('INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)', [category.id, category.name, category.maxKg, category.additionalFee, category.isActive]);
    }
  }
}

const seedOrders: OrderRow[] = [];

const seedPayments: Payment[] = [];

const seedExpenses: DisbursementExpense[] = [];

const seedSales: DailySale[] = [];

const seedRevolvingHistory: RevolvingHistory[] = [];

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

function syncBrowserSeedStaff() {
  const items = readBrowser<Staff[]>('staff', seedStaff);
  const byId = new Map(items.map((row) => [row.id, row]));
  let changed = false;
  for (const account of seedStaff) {
    const existing = byId.get(account.id);
    if (!existing) {
      byId.set(account.id, { ...account, isActive: 1 });
      changed = true;
      continue;
    }
    const updated = { ...existing, name: account.name, email: account.email, password: account.password, role: account.role, branch: account.branch, isActive: 1 };
    if (JSON.stringify(updated) !== JSON.stringify(existing)) {
      byId.set(account.id, updated);
      changed = true;
    }
  }
  if (changed) writeBrowser('staff', Array.from(byId.values()).sort((a, b) => a.id - b.id));
}

async function resetBrowserToFreshStart() {
  if (localStorage.getItem(browserKey(freshStartResetKey))) return;

  writeBrowser('staff', seedStaff);
  writeBrowser('customers', []);
  writeBrowser('orders', []);
  writeBrowser('payments', []);
  writeBrowser('fold_logs', []);
  writeBrowser('expenses', []);
  writeBrowser('sales', []);
  if (!localStorage.getItem(browserKey('services'))) writeBrowser('services', seedServices);
  if (!localStorage.getItem(browserKey('item_categories'))) writeBrowser('item_categories', seedItemCategories);
  if (!localStorage.getItem(browserKey('machines'))) writeBrowser('machines', seedMachines);
  if (!localStorage.getItem(browserKey('subcleanings'))) writeBrowser('subcleanings', []);
  if (!localStorage.getItem(browserKey('settings'))) writeBrowser('settings', seedSettings);
  localStorage.removeItem('laba101-mobile-session');
  writeBrowser(freshStartResetKey, true);
}

async function ensureNativeSeedStaff(db: SQLiteDBConnection) {
  for (const account of seedStaff) {
    const existing = await db.query('SELECT id FROM staff WHERE id = ?', [account.id]);
    if ((existing.values ?? []).length > 0) {
      await db.run(
        'UPDATE staff SET name = ?, email = ?, password = ?, role = ?, branch = ?, isActive = 1 WHERE id = ?',
        [account.name, account.email, account.password, account.role, account.branch, account.id],
      );
      continue;
    }
    await db.run(
      'INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [account.id, account.name, account.email, account.password, account.role, account.branch, 1],
    );
  }
}

async function ensureNativeSeedMachines(db: SQLiteDBConnection) {
  const machineCount = await db.query('SELECT COUNT(*) as count FROM machines');
  if (((machineCount.values?.[0] as { count: number } | undefined)?.count ?? 0) > 0) return;
  for (const machine of seedMachines) {
    await db.run('INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)', [machine.id, machine.machineName, machine.machineType, machine.status, machine.branch]);
  }
}

async function ensureNativeSeedSettings(db: SQLiteDBConnection) {
  for (const setting of seedSettings) {
    await db.run('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)', [setting.key, setting.value]);
  }
}

async function seedNativeInitialCatalog(db: SQLiteDBConnection) {
  for (const service of seedServices) {
    const existing = await db.query('SELECT id FROM laundry_services WHERE id = ?', [service.id]);
    if ((existing.values ?? []).length > 0) continue;
    await db.run(
      'INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [service.id, service.name, service.description, service.category, service.serviceType, service.price, service.maxKg, service.dryingMinutes, JSON.stringify(service.includes), service.additionalCharge, service.turnaroundHours, service.isActive],
    );
  }
  for (const category of seedItemCategories) {
    const existing = await db.query('SELECT id FROM item_categories WHERE id = ?', [category.id]);
    if ((existing.values ?? []).length > 0) continue;
    await db.run('INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)', [category.id, category.name, category.maxKg, category.additionalFee, category.isActive]);
  }
}

async function resetNativeToFreshStart(db: SQLiteDBConnection) {
  const reset = await db.query('SELECT value FROM settings WHERE key = ?', [freshStartResetKey]);
  if ((reset.values ?? []).length > 0) return;

  await db.execute(`
    DELETE FROM payments;
    DELETE FROM orders;
    DELETE FROM customers;
    DELETE FROM fold_logs;
    DELETE FROM disbursement_expenses;
    DELETE FROM daily_sales;
    DELETE FROM revolving_history;
    DELETE FROM staff WHERE id NOT IN (1, 2);
  `);
  await ensureNativeSeedStaff(db);
  await seedNativeInitialCatalog(db);
  await ensureNativeSeedMachines(db);
  await ensureNativeSeedSettings(db);
  await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [freshStartResetKey, nowIso()]);
  localStorage.removeItem('laba101-mobile-session');
}

async function ensureSchema() {
  if (!Capacitor.isNativePlatform()) {
    await resetBrowserToFreshStart();
    if (!localStorage.getItem(browserKey('seeded_v4')) && !localStorage.getItem(browserKey('services')) && !localStorage.getItem(browserKey('staff'))) {
      writeBrowser('staff', seedStaff);
      writeBrowser('customers', seedCustomers);
      writeBrowser('services', seedServices);
      writeBrowser('item_categories', seedItemCategories);
      writeBrowser('orders', seedOrders);
      writeBrowser('payments', seedPayments);
      writeBrowser('fold_logs', []);
      writeBrowser('expenses', seedExpenses);
      writeBrowser('sales', seedSales);
      writeBrowser('revolving_history', seedRevolvingHistory);
      writeBrowser('machines', seedMachines);
      writeBrowser('subcleanings', []);
      writeBrowser('settings', seedSettings);
      writeBrowser('seeded_v4', true);
    }
    await syncBrowserSeedLaundryCatalog();
    syncBrowserSeedStaff();
    if (!localStorage.getItem(browserKey('seeded_v4'))) writeBrowser('seeded_v4', true);
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
      serviceLines TEXT,
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
      foldedByStaffIds TEXT,
      releasedBy INTEGER,
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
    CREATE TABLE IF NOT EXISTS disbursement_expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, expenseDate TEXT NOT NULL, number TEXT NOT NULL, disbursementType TEXT NOT NULL DEFAULT 'daily', name TEXT NOT NULL, category TEXT NOT NULL, description TEXT, amount REAL NOT NULL);
    CREATE TABLE IF NOT EXISTS daily_sales (id INTEGER PRIMARY KEY AUTOINCREMENT, saleDate TEXT NOT NULL, saleNumber TEXT, cashAmount REAL NOT NULL, gcashAmount REAL NOT NULL, totalAmount REAL NOT NULL, notes TEXT);
    CREATE TABLE IF NOT EXISTS revolving_history (id INTEGER PRIMARY KEY AUTOINCREMENT, revolvingNumber TEXT NOT NULL, name TEXT NOT NULL, amount REAL NOT NULL, category TEXT NOT NULL, description TEXT, type TEXT NOT NULL, createdAt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS machines (id INTEGER PRIMARY KEY AUTOINCREMENT, machineName TEXT NOT NULL, machineType TEXT NOT NULL, status TEXT NOT NULL, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS subcleanings (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, machineIds TEXT NOT NULL, machineNames TEXT NOT NULL, cleaningStatus TEXT NOT NULL, cleaningType TEXT NOT NULL DEFAULT 'tube', notes TEXT, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS activity_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp TEXT NOT NULL, staffId INTEGER, staffName TEXT NOT NULL, action TEXT NOT NULL, details TEXT, branch TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS inventory_items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, unit TEXT NOT NULL, quantity REAL NOT NULL DEFAULT 0, reorderLevel REAL NOT NULL DEFAULT 0, notes TEXT, branch TEXT NOT NULL, updatedAt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS inventory_movements (id INTEGER PRIMARY KEY AUTOINCREMENT, itemId INTEGER NOT NULL, itemName TEXT NOT NULL, movementType TEXT NOT NULL, quantity REAL NOT NULL, notes TEXT, staffName TEXT NOT NULL, branch TEXT NOT NULL, createdAt TEXT NOT NULL);
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
  await addColumnIfMissing(db, 'orders', 'serviceLines', 'TEXT');
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
  await addColumnIfMissing(db, 'orders', 'foldedByStaffIds', 'TEXT');
  await addColumnIfMissing(db, 'orders', 'releasedBy', 'INTEGER');
  await addColumnIfMissing(db, 'orders', 'dueAt', 'TEXT');
  await addColumnIfMissing(db, 'orders', 'createdAt', 'TEXT NOT NULL DEFAULT ""');
  await addColumnIfMissing(db, 'daily_sales', 'saleNumber', 'TEXT');
  await addColumnIfMissing(db, 'daily_sales', 'status', 'TEXT');
  await addColumnIfMissing(db, 'daily_sales', 'endorsedTo', 'TEXT');
  await addColumnIfMissing(db, 'daily_sales', 'statusUpdatedAt', 'TEXT');
  await addColumnIfMissing(db, 'disbursement_expenses', 'disbursementType', 'TEXT NOT NULL DEFAULT "daily"');
  await addColumnIfMissing(db, 'subcleanings', 'cleaningType', 'TEXT NOT NULL DEFAULT "tube"');

  const staffCount = await db.query('SELECT COUNT(*) as count FROM staff');
  const isFreshInstall = ((staffCount.values?.[0] as { count: number } | undefined)?.count ?? 0) === 0;
  if (isFreshInstall) {
    for (const staff of seedStaff) await db.run('INSERT INTO staff (id, name, email, password, role, branch, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)', [staff.id, staff.name, staff.email, staff.password, staff.role, staff.branch, 1]);
    for (const customer of seedCustomers) await db.run('INSERT INTO customers (id, name, phone, address) VALUES (?, ?, ?, ?)', [customer.id, customer.name, customer.phone, customer.address]);
    for (const service of seedServices) await db.run('INSERT INTO laundry_services (id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [service.id, service.name, service.description, service.category, service.serviceType, service.price, service.maxKg, service.dryingMinutes, JSON.stringify(service.includes), service.additionalCharge, service.turnaroundHours, service.isActive]);
    for (const category of seedItemCategories) await db.run('INSERT INTO item_categories (id, name, maxKg, additionalFee, isActive) VALUES (?, ?, ?, ?, ?)', [category.id, category.name, category.maxKg, category.additionalFee, category.isActive]);
    for (const order of seedOrders) await insertNativeOrder(db, order);
    for (const payment of seedPayments) await db.run('INSERT INTO payments (id, orderId, amount, method, reference, receivedAt, branch) VALUES (?, ?, ?, ?, ?, ?, ?)', [payment.id, payment.orderId, payment.amount, payment.method, payment.reference, payment.receivedAt, payment.branch]);
    for (const expense of seedExpenses) await db.run('INSERT INTO disbursement_expenses (id, expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [expense.id, expense.expenseDate, expense.number, expense.disbursementType ?? 'daily', expense.name, expense.category, expense.description, expense.amount]);
    for (const sale of seedSales) await db.run('INSERT INTO daily_sales (id, saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?, ?)', [sale.id, sale.saleDate, sale.saleNumber, sale.cashAmount, sale.gcashAmount, sale.totalAmount, sale.notes]);
    for (const rh of seedRevolvingHistory) await db.run('INSERT INTO revolving_history (id, revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [rh.id, rh.revolvingNumber, rh.name, rh.amount, rh.category, rh.description, rh.type, rh.createdAt]);
    for (const machine of seedMachines) await db.run('INSERT INTO machines (id, machineName, machineType, status, branch) VALUES (?, ?, ?, ?, ?)', [machine.id, machine.machineName, machine.machineType, machine.status, machine.branch]);
    for (const setting of seedSettings) await db.run('INSERT INTO settings (key, value) VALUES (?, ?)', [setting.key, setting.value]);
    await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['fresh_install_defaults', nowIso()]);
  }

  await syncSeedLaundryCatalog(db);
  await ensureNativeSeedStaff(db);
  if (!isFreshInstall) await seedNativeInitialCatalog(db);
  await resetNativeToFreshStart(db);
}

async function insertNativeOrder(db: SQLiteDBConnection, order: OrderRow) {
  await db.run(
    'INSERT INTO orders (id, ticket, customerId, customer, phone, serviceId, service, serviceLines, itemCategoryId, itemCategory, branch, status, workflowCompleted, weightKg, price, additionalCharge, extraServiceAmount, totalAmount, paidAmount, extras, notes, foldedBy, foldedByStaffIds, dueAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [order.id, order.ticket, order.customerId, order.customer, order.phone, order.serviceId, order.service, JSON.stringify(order.serviceLines ?? []), order.itemCategoryId, order.itemCategory, order.branch, order.status, JSON.stringify(order.workflowCompleted), order.weightKg, order.price, order.additionalCharge, order.extraServiceAmount, order.totalAmount, order.paidAmount, JSON.stringify(order.extras), order.notes, order.foldedBy, JSON.stringify(order.foldedByStaffIds ?? []), order.dueAt, order.createdAt],
  );
}

function hydrateOrder(row: Record<string, unknown>): OrderRow {
  const paidAmount = Number(row.paidAmount ?? 0);
  const totalAmount = Number(row.totalAmount ?? 0);
  const foldedBy = Number(row.foldedBy);
  const releasedBy = Number(row.releasedBy);
  const serviceLines = parseJson<OrderLine[]>(row.serviceLines as string | null, []);
  const serviceId = Number(row.serviceId);
  const service = String(row.service);
  const price = Number(row.price);
  return {
    id: Number(row.id),
    ticket: String(row.ticket),
    customerId: Number(row.customerId),
    customer: String(row.customer),
    phone: row.phone ? String(row.phone) : null,
    serviceId,
    service,
    serviceLines: serviceLines.length ? serviceLines : [{ id: serviceId, name: service, price, quantity: 1, total: price }],
    itemCategoryId: Number(row.itemCategoryId),
    itemCategory: String(row.itemCategory),
    branch: String(row.branch),
    status: String(row.status),
    workflowCompleted: parseJson<string[]>(row.workflowCompleted as string | null, []),
    weightKg: Number(row.weightKg),
    price,
    additionalCharge: Number(row.additionalCharge),
    extraServiceAmount: Number(row.extraServiceAmount),
    totalAmount,
    paidAmount,
    balance: Number((totalAmount - paidAmount).toFixed(2)),
    extras: parseJson<Array<{ id: number; name: string; price: number }>>(row.extras as string | null, []),
    notes: row.notes ? String(row.notes) : null,
    foldedBy: Number.isFinite(foldedBy) && foldedBy > 0 ? foldedBy : null,
    foldedByName: row.foldedByName ? String(row.foldedByName) : null,
    foldedByStaffIds: parseJson<number[]>(row.foldedByStaffIds as string | null, []),
    releasedBy: Number.isFinite(releasedBy) && releasedBy > 0 ? releasedBy : null,
    releasedByName: row.releasedByName ? String(row.releasedByName) : null,
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
  if ((result.values ?? []).length === 0) {
    await syncSeedLaundryCatalog(db);
    const repaired = await db.query(`SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ${type ? 'WHERE serviceType = ?' : ''} ORDER BY name ASC`, type ? [type] : []);
    return (repaired.values ?? []).map((row) => ({ ...(row as LaundryService), includes: parseJson<string[]>((row as { includes?: string }).includes, []) }));
  }
  return (result.values ?? []).map((row) => ({ ...(row as LaundryService), includes: parseJson<string[]>((row as { includes?: string }).includes, []) }));
}

export async function listAllServices(): Promise<LaundryService[]> {
  if (!Capacitor.isNativePlatform()) {
    return readBrowser<LaundryService[]>('services', seedServices);
  }
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC');
  if ((result.values ?? []).length === 0) {
    await syncSeedLaundryCatalog(db);
    const repaired = await db.query('SELECT id, name, description, category, serviceType, price, maxKg, dryingMinutes, includes, additionalCharge, turnaroundHours, isActive FROM laundry_services ORDER BY name ASC');
    return (repaired.values ?? []).map((row) => ({ ...(row as LaundryService), includes: parseJson<string[]>((row as { includes?: string }).includes, []) }));
  }
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
  if ((result.values ?? []).length === 0) {
    await syncSeedLaundryCatalog(db);
    const repaired = await db.query('SELECT id, name, maxKg, additionalFee, isActive FROM item_categories WHERE isActive = 1 ORDER BY name ASC');
    return (repaired.values ?? []) as ItemCategory[];
  }
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

type AddonInput = LaundryService & { quantity?: number };
type ServiceInput = LaundryService & { quantity?: number };

export function calculatePricing(service: ServiceInput | ServiceInput[], category: ItemCategory, weightKg: number, addons: AddonInput[]): PricingResult {
  const selectedServices = (Array.isArray(service) ? service : [service])
    .map((item) => {
      const quantity = Math.max(0, Number(item.quantity ?? 1));
      const price = Number(item.price);
      return { id: item.id, name: item.name, price, quantity, total: Number((price * quantity).toFixed(2)) };
    })
    .filter((item) => item.quantity > 0);
  const allowedKg = Number(category.maxKg);
  const extraKg = 0;
  const additionalCharge = 0;
  const extras = addons
    .map((addon) => {
      const quantity = Math.max(0, Number(addon.quantity ?? 1));
      const price = Number(addon.price);
      return { id: addon.id, name: cleanAddonName(addon.name), price, quantity, total: Number((price * quantity).toFixed(2)) };
    })
    .filter((addon) => addon.quantity > 0);
  const serviceAmount = selectedServices.reduce((sum, item) => sum + item.total, 0);
  const extraServiceAmount = extras.reduce((sum, addon) => sum + addon.total, 0);
  const totalAmount = Number((serviceAmount + additionalCharge + extraServiceAmount).toFixed(2));
  return {
    price: Number(serviceAmount.toFixed(2)),
    additionalCharge: Number(additionalCharge.toFixed(2)),
    extraServiceAmount: Number(extraServiceAmount.toFixed(2)),
    totalAmount,
    allowedKg,
    extraKg: Number(extraKg.toFixed(2)),
    warning: null,
    serviceLines: selectedServices,
    extras,
  };
}

export function workflowSteps(order: Pick<OrderRow, 'serviceId' | 'serviceLines' | 'extras' | 'workflowCompleted'>, services: LaundryService[]) {
  const serviceLines = order.serviceLines && order.serviceLines.length
    ? order.serviceLines
    : order.serviceId
      ? [{ id: order.serviceId }]
      : [];
  const hasFoldService = serviceLines.some((line) => {
    const service = services.find((item) => item.id === line.id);
    return Array.isArray(service?.includes) && service.includes.includes('Fold');
  });

  return [
    ...(hasFoldService ? [{ key: 'fold', label: 'Fold' }] : []),
    { key: 'claimed', label: 'Claimed' },
  ];
}

function statusFromCompleted(completed: string[]) {
  if (completed.includes('claimed')) return 'claimed';
  if (completed.includes('fold')) return 'ready';
  return 'received';
}

export async function listOrders(branch: string): Promise<OrderRow[]> {
  if (!Capacitor.isNativePlatform()) {
    return readBrowser<OrderRow[]>('orders', seedOrders)
      .filter((order) => order.branch === branch)
      .map((order) => ({
        ...order,
        serviceLines: order.serviceLines ?? [{ id: order.serviceId, name: order.service, price: Number(order.price), quantity: 1, total: Number(order.price) }],
        foldedByStaffIds: order.foldedByStaffIds ?? [],
        releasedBy: order.releasedBy ?? null,
        releasedByName: order.releasedByName ?? null,
        balance: Number((order.totalAmount - order.paidAmount).toFixed(2)),
      }));
  }
  const db = await ensureNativeDb();
  const result = await db.query('SELECT o.*, folded.name as foldedByName, released.name as releasedByName FROM orders o LEFT JOIN staff folded ON folded.id = o.foldedBy LEFT JOIN staff released ON released.id = o.releasedBy WHERE o.branch = ? ORDER BY o.id DESC', [branch]);
  return (result.values ?? []).map((row) => hydrateOrder(row as Record<string, unknown>));
}

export async function createOrder(input: { customerId?: number; customerName: string; customerPhone?: string | null; serviceId?: number; serviceQuantities?: Record<number, number>; itemCategoryId?: number; branch: string; weightKg?: number; addonIds?: number[]; addonQuantities?: Record<number, number>; paidAmount: number; paymentMethod: 'cash' | 'gcash'; paymentReference?: string | null; notes?: string | null }) {
  const [services, categories] = await Promise.all([listServices(), listItemCategories()]);
  const serviceQuantities = input.serviceQuantities ?? (input.serviceId ? { [input.serviceId]: 1 } : {});
  const selectedServices = services
    .filter((item) => item.serviceType === 'order' && Number(serviceQuantities[item.id] ?? 0) > 0)
    .map((item) => ({ ...item, quantity: Number(serviceQuantities[item.id] ?? 0) }));
  const service = selectedServices[0];
  const category = categories.find((item) => item.id === input.itemCategoryId)
    ?? categories.find((item) => item.name.toLowerCase() === (service?.category ?? '').toLowerCase())
    ?? categories.find((item) => item.name === 'Regular Clothes')
    ?? categories[0];
  const addonQuantities = input.addonQuantities ?? Object.fromEntries((input.addonIds ?? []).map((id) => [id, 1]));
  const addons = services
    .filter((item) => item.serviceType === 'addon' && Number(addonQuantities[item.id] ?? 0) > 0)
    .map((item) => ({ ...item, quantity: Number(addonQuantities[item.id] ?? 0) }));
  
  if (!selectedServices.length && !addons.length) throw new Error('Please select at least one service or extra service.');
  
  const weightKg = input.weightKg ?? Math.max(1, Number(category?.maxKg || service?.maxKg || 1));
  const pricing = calculatePricing(selectedServices, category, weightKg, addons);
  const customer = await upsertCustomer({ id: input.customerId || undefined, name: input.customerName, phone: input.customerPhone ?? null });
  const tenderedAmount = Math.max(0, input.paidAmount);
  const paidAmount = Math.min(pricing.totalAmount, tenderedAmount);
  const orderBase = {
    ticket: await nextOrderNumber(),
    customerId: customer.id,
    customer: customer.name,
    phone: customer.phone,
    serviceId: service?.id ?? 0,
    service: pricing.serviceLines.length ? pricing.serviceLines.map((line) => `${line.name} x${line.quantity}`).join(', ') : 'Extras only',
    serviceLines: pricing.serviceLines,
    itemCategoryId: category.id,
    itemCategory: category.name,
    branch: input.branch,
    status: 'received',
    workflowCompleted: ['received'],
    weightKg,
    price: pricing.price,
    additionalCharge: pricing.additionalCharge,
    extraServiceAmount: pricing.extraServiceAmount,
    totalAmount: pricing.totalAmount,
    paidAmount,
    balance: Number((pricing.totalAmount - paidAmount).toFixed(2)),
    extras: pricing.extras,
    notes: input.notes || null,
    foldedBy: null,
    foldedByName: null,
    foldedByStaffIds: [],
    releasedBy: null,
    releasedByName: null,
    dueAt: new Date(Date.now() + Math.max(1, ...selectedServices.map((item) => item.turnaroundHours)) * 60 * 60 * 1000).toISOString(),
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

export async function advanceOrder(orderId: number, assignedStaffId?: number | null | number[]) {
  const branch = await getBranch();
  const [orders, services] = await Promise.all([listOrders(branch), listServices()]);
  const order = orders.find((item) => item.id === orderId);
  if (!order) return;
  const steps = workflowSteps(order, services).map((step) => step.key);
  const next = steps.find((key) => !order.workflowCompleted.includes(key));
  if (!next) return;
  order.workflowCompleted = [...order.workflowCompleted, next];
  order.status = statusFromCompleted(order.workflowCompleted);
  if (next === 'fold' && assignedStaffId) {
    const assignedIds = Array.isArray(assignedStaffId) ? assignedStaffId : [assignedStaffId];
    order.foldedBy = assignedIds[0] || null;
    // Append these staff IDs (one per load folded by that staff)
    const ids = Array.isArray(order.foldedByStaffIds) ? [...order.foldedByStaffIds] : [];
    ids.push(...assignedIds);
    order.foldedByStaffIds = ids;
  }
  if (next === 'claimed' && assignedStaffId) {
    const assignedIds = Array.isArray(assignedStaffId) ? assignedStaffId : [assignedStaffId];
    order.releasedBy = assignedIds[0] || null;
  }
  if (!Capacitor.isNativePlatform()) {
    const all = readBrowser<OrderRow[]>('orders', seedOrders);
    const existing = all.find((item) => item.id === order.id);
    if (existing) Object.assign(existing, order);
    writeBrowser('orders', all);
    return;
  }
  const db = await ensureNativeDb();
  await db.run(
    'UPDATE orders SET workflowCompleted = ?, status = ?, foldedBy = ?, foldedByStaffIds = ?, releasedBy = ? WHERE id = ?',
    [JSON.stringify(order.workflowCompleted), order.status, order.foldedBy, JSON.stringify(order.foldedByStaffIds ?? []), order.releasedBy, order.id],
  );
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

export async function cancelOrder(orderId: number) {
  const branch = await getBranch();
  const orders = await listOrders(branch);
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;

  // Cancel is allowed only for unpaid orders.
  if (order.paidAmount > 0) throw new Error('Cancel is only allowed for unpaid orders. Use Delete (admin) to refund paid orders.');

  if (!Capacitor.isNativePlatform()) {
    const allOrders = readBrowser<OrderRow[]>('orders', seedOrders);
    const allPayments = readBrowser<Payment[]>('payments', seedPayments);
    const allFoldLogs = readBrowser<FoldLog[]>('fold_logs', []);

    const remainingOrders = allOrders.filter((o) => o.id !== orderId);
    const remainingPayments = allPayments.filter((p) => p.orderId !== orderId);
    const remainingFoldLogs = allFoldLogs.filter((log) => log.orderTicket !== order.ticket);

    writeBrowser('orders', remainingOrders);
    writeBrowser('payments', remainingPayments);
    writeBrowser('fold_logs', remainingFoldLogs);
    return;
  }

  const db = await ensureNativeDb();
  await db.run('DELETE FROM payments WHERE orderId = ?', [orderId]);
  await db.run('DELETE FROM fold_logs WHERE orderTicket = ?', [order.ticket]);
  await db.run('DELETE FROM orders WHERE id = ?', [orderId]);
}

export async function deleteOrderForRefund(orderId: number) {
  const branch = await getBranch();
  const orders = await listOrders(branch);
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;

  if (order.paidAmount <= 0) throw new Error('Delete (refund) is only allowed for paid orders.');

  if (!Capacitor.isNativePlatform()) {
    const allOrders = readBrowser<OrderRow[]>('orders', seedOrders);
    const allPayments = readBrowser<Payment[]>('payments', seedPayments);
    const allFoldLogs = readBrowser<FoldLog[]>('fold_logs', []);

    const remainingOrders = allOrders.filter((o) => o.id !== orderId);
    const remainingPayments = allPayments.filter((p) => p.orderId !== orderId);
    const remainingFoldLogs = allFoldLogs.filter((log) => log.orderTicket !== order.ticket);

    writeBrowser('orders', remainingOrders);
    writeBrowser('payments', remainingPayments);
    writeBrowser('fold_logs', remainingFoldLogs);
    return;
  }

  const db = await ensureNativeDb();
  await db.run('DELETE FROM payments WHERE orderId = ?', [orderId]);
  await db.run('DELETE FROM fold_logs WHERE orderTicket = ?', [order.ticket]);
  await db.run('DELETE FROM orders WHERE id = ?', [orderId]);
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

export async function listActivityLogs(branch: string): Promise<ActivityLog[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<ActivityLog[]>('activity_logs', []).filter((item) => item.branch === branch).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, timestamp, staffId, staffName, action, details, branch FROM activity_logs WHERE branch = ? ORDER BY timestamp DESC, id DESC', [branch]);
  return (result.values ?? []) as ActivityLog[];
}

export async function recordActivityLog(input: { staffId?: number | null; staffName: string; action: string; details?: string; branch: string }) {
  const row = { timestamp: nowIso(), staffId: input.staffId ?? null, staffName: input.staffName, action: input.action, details: input.details ?? '', branch: input.branch };
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<ActivityLog[]>('activity_logs', []);
    items.unshift({ id: nextNumericId(items), ...row });
    writeBrowser('activity_logs', items);
    return;
  }
  const db = await ensureNativeDb();
  await db.run('INSERT INTO activity_logs (timestamp, staffId, staffName, action, details, branch) VALUES (?, ?, ?, ?, ?, ?)', [row.timestamp, row.staffId, row.staffName, row.action, row.details, row.branch]);
}

export async function listExpenses(): Promise<DisbursementExpense[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<DisbursementExpense[]>('expenses', seedExpenses).map((expense) => ({ ...expense, disbursementType: expense.disbursementType ?? 'daily' }));
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, expenseDate, number, COALESCE(disbursementType, "daily") as disbursementType, name, category, description, amount FROM disbursement_expenses ORDER BY expenseDate DESC, id DESC');
  return (result.values ?? []) as DisbursementExpense[];
}

function parseDisbursementSequence(value: string) {
  const match = /^DISB-(\d+)$/i.exec(String(value ?? '').trim());
  return match ? Number(match[1]) : 0;
}

function parseRevolvingAddSequence(value: string) {
  const match = /^REV-(\d+)$/i.exec(String(value ?? '').trim());
  return match ? Number(match[1]) : 0;
}

async function maxDisbursementSequence() {
  let max = 0;
  if (!Capacitor.isNativePlatform()) {
    const expenses = readBrowser<DisbursementExpense[]>('expenses', seedExpenses);
    const revolving = readBrowser<RevolvingHistory[]>('revolving_history', seedRevolvingHistory);
    for (const expense of expenses) max = Math.max(max, parseDisbursementSequence(expense.number));
    for (const row of revolving) {
      if (row.type === 'disbursement') max = Math.max(max, parseDisbursementSequence(row.revolvingNumber));
    }
    return max;
  }
  const db = await ensureNativeDb();
  const expenseResult = await db.query('SELECT number FROM disbursement_expenses');
  const revolvingResult = await db.query("SELECT revolvingNumber as number FROM revolving_history WHERE type = 'disbursement'");
  for (const row of [...(expenseResult.values ?? []), ...(revolvingResult.values ?? [])]) {
    max = Math.max(max, parseDisbursementSequence(String((row as { number: string }).number)));
  }
  return max;
}

async function nextDisbursementNumber() {
  const next = (await maxDisbursementSequence()) + 1;
  return `DISB-${String(next).padStart(2, '0')}`;
}

async function nextRevolvingAddNumber() {
  let max = 0;
  if (!Capacitor.isNativePlatform()) {
    const revolving = readBrowser<RevolvingHistory[]>('revolving_history', seedRevolvingHistory);
    for (const row of revolving) {
      if (row.type === 'add') max = Math.max(max, parseRevolvingAddSequence(row.revolvingNumber));
    }
    return `REV-${String(max + 1).padStart(2, '0')}`;
  }
  const db = await ensureNativeDb();
  const result = await db.query("SELECT revolvingNumber FROM revolving_history WHERE type = 'add'");
  for (const row of result.values ?? []) {
    max = Math.max(max, parseRevolvingAddSequence(String((row as { revolvingNumber: string }).revolvingNumber)));
  }
  return `REV-${String(max + 1).padStart(2, '0')}`;
}

async function insertExpenseRecord(input: { expenseDate: string; number: string; disbursementType?: 'daily' | 'monthly'; name: string; category: string; description: string; amount: number }) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<DisbursementExpense[]>('expenses', seedExpenses);
    const id = nextNumericId(items);
    items.unshift({
      id,
      expenseDate: input.expenseDate,
      number: input.number,
      disbursementType: input.disbursementType ?? 'daily',
      name: input.name,
      category: input.category,
      description: input.description || null,
      amount: input.amount,
    });
    writeBrowser('expenses', items);
    return;
  }
  const db = await ensureNativeDb();
  await db.run(
    'INSERT INTO disbursement_expenses (expenseDate, number, disbursementType, name, category, description, amount) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [input.expenseDate, input.number, input.disbursementType ?? 'daily', input.name, input.category, input.description || null, input.amount],
  );
}

export async function createExpense(input: { expenseDate: string; disbursementType?: 'daily' | 'monthly'; name: string; category: string; description: string; amount: number }) {
  const number = await nextDisbursementNumber();
  await insertExpenseRecord({
    expenseDate: input.expenseDate,
    number,
    disbursementType: input.disbursementType ?? 'daily',
    name: input.name,
    category: input.category,
    description: input.description,
    amount: input.amount,
  });
}

export async function updateExpense(id: number, input: { expenseDate: string; disbursementType?: 'daily' | 'monthly'; name: string; category: string; description: string; amount: number }) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<DisbursementExpense[]>('expenses', seedExpenses);
    const existing = items.find((item) => item.id === id);
    if (existing) {
      Object.assign(existing, {
        expenseDate: input.expenseDate,
        disbursementType: input.disbursementType ?? 'daily',
        name: input.name,
        category: input.category,
        description: input.description || null,
        amount: input.amount,
      });
      writeBrowser('expenses', items);
    }
    return;
  }
  const db = await ensureNativeDb();
  await db.run(
    'UPDATE disbursement_expenses SET expenseDate = ?, disbursementType = ?, name = ?, category = ?, description = ?, amount = ? WHERE id = ?',
    [input.expenseDate, input.disbursementType ?? 'daily', input.name, input.category, input.description || null, input.amount, id],
  );
}

export async function deleteExpense(id: number) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<DisbursementExpense[]>('expenses', seedExpenses);
    writeBrowser('expenses', items.filter((item) => item.id !== id));
    return;
  }
  const db = await ensureNativeDb();
  await db.run('DELETE FROM disbursement_expenses WHERE id = ?', [id]);
}

export async function listDailySales(): Promise<DailySale[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<DailySale[]>('sales', seedSales);
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, saleDate, COALESCE(saleNumber, "") as saleNumber, cashAmount, gcashAmount, totalAmount, notes, status, endorsedTo, statusUpdatedAt FROM daily_sales ORDER BY saleDate DESC, id DESC');
  return (result.values ?? []) as DailySale[];
}

export async function saveDailySale(input: { id?: number; saleDate: string; cashAmount: number; gcashAmount: number; notes: string }) {
  const totalAmount = Number((input.cashAmount + input.gcashAmount).toFixed(2));
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<DailySale[]>('sales', seedSales);
    const existing = input.id ? items.find((item) => item.id === input.id) : items.find((item) => item.saleDate === input.saleDate);
    if (existing) Object.assign(existing, { saleDate: input.saleDate, cashAmount: input.cashAmount, gcashAmount: input.gcashAmount, totalAmount, notes: input.notes || null });
    else {
      const id = nextNumericId(items);
      items.unshift({ id, saleDate: input.saleDate, saleNumber: `SALE-${String(id).padStart(2, '0')}`, cashAmount: input.cashAmount, gcashAmount: input.gcashAmount, totalAmount, notes: input.notes || null });
    }
    writeBrowser('sales', items);
    return;
  }
  const db = await ensureNativeDb();
  const result = input.id
    ? await db.query('SELECT id, saleNumber FROM daily_sales WHERE id = ?', [input.id])
    : await db.query('SELECT id, saleNumber FROM daily_sales WHERE saleDate = ?', [input.saleDate]);
  const existing = result.values?.[0] as { id: number; saleNumber?: string } | undefined;
  if (existing) await db.run('UPDATE daily_sales SET saleDate = ?, cashAmount = ?, gcashAmount = ?, totalAmount = ?, notes = ? WHERE id = ?', [input.saleDate, input.cashAmount, input.gcashAmount, totalAmount, input.notes || null, existing.id]);
  else {
    const idResult = await db.query('SELECT COALESCE(MAX(id), 0) + 1 as id FROM daily_sales');
    const id = Number((idResult.values?.[0] as { id: number }).id);
    await db.run('INSERT INTO daily_sales (saleDate, saleNumber, cashAmount, gcashAmount, totalAmount, notes) VALUES (?, ?, ?, ?, ?, ?)', [input.saleDate, `SALE-${String(id).padStart(2, '0')}`, input.cashAmount, input.gcashAmount, totalAmount, input.notes || null]);
  }
}

export async function deleteDailySale(id: number) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<DailySale[]>('sales', seedSales);
    writeBrowser('sales', items.filter((item) => item.id !== id));
    return;
  }
  const db = await ensureNativeDb();
  await db.run('DELETE FROM daily_sales WHERE id = ?', [id]);
}

export async function updateDailySaleStatus(id: number, status: string, endorsedTo: string | null = null, statusUpdatedAt: string) {
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<DailySale[]>('sales', seedSales);
    const existing = items.find((item) => item.id === id);
    if (existing) {
      existing.status = status;
      existing.endorsedTo = endorsedTo;
      existing.statusUpdatedAt = statusUpdatedAt;
      writeBrowser('sales', items);
    }
    return;
  }
  const db = await ensureNativeDb();
  await db.run('UPDATE daily_sales SET status = ?, endorsedTo = ?, statusUpdatedAt = ? WHERE id = ?', [status, endorsedTo, statusUpdatedAt, id]);
}

export async function listRevolvingHistory(): Promise<RevolvingHistory[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<RevolvingHistory[]>('revolving_history', seedRevolvingHistory).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, revolvingNumber, name, amount, category, description, type, createdAt FROM revolving_history ORDER BY createdAt DESC, id DESC');
  return (result.values ?? []) as RevolvingHistory[];
}

export async function saveRevolvingHistory(input: {
  name: string;
  amount: number;
  category: string;
  description: string | null;
  type: 'disbursement' | 'add';
  createdAt: string;
  expenseDate?: string;
}) {
  const revolvingNumber = input.type === 'disbursement'
    ? await nextDisbursementNumber()
    : await nextRevolvingAddNumber();

  if (input.type === 'disbursement') {
    const expenseDate = input.expenseDate ?? input.createdAt.slice(0, 10);
    await insertExpenseRecord({
      expenseDate,
      number: revolvingNumber,
      name: input.name,
      category: input.category,
      description: input.description ?? '',
      amount: input.amount,
    });
  }

  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<RevolvingHistory[]>('revolving_history', seedRevolvingHistory);
    const id = nextNumericId(items);
    items.unshift({ id, revolvingNumber, ...input });
    writeBrowser('revolving_history', items);
    return;
  }
  const db = await ensureNativeDb();
  await db.run(
    'INSERT INTO revolving_history (revolvingNumber, name, amount, category, description, type, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [revolvingNumber, input.name, input.amount, input.category, input.description || null, input.type, input.createdAt],
  );
}

export async function listMachines(branch: string): Promise<Machine[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<Machine[]>('machines', seedMachines).filter((machine) => machine.branch === branch);
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, machineName, machineType, status, branch FROM machines WHERE branch = ? ORDER BY machineType, machineName', [branch]);
  return (result.values ?? []) as Machine[];
}

export async function listInventoryItems(branch: string): Promise<InventoryItem[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<InventoryItem[]>('inventory_items', []).filter((item) => item.branch === branch).sort((a, b) => a.name.localeCompare(b.name));
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, name, unit, quantity, reorderLevel, notes, branch, updatedAt FROM inventory_items WHERE branch = ? ORDER BY name ASC', [branch]);
  return (result.values ?? []) as InventoryItem[];
}

export async function saveInventoryItem(input: { id?: number; name: string; unit: string; quantity: number; reorderLevel: number; notes: string; branch: string }) {
  const row = { name: input.name, unit: input.unit, quantity: input.quantity, reorderLevel: input.reorderLevel, notes: input.notes || null, branch: input.branch, updatedAt: nowIso() };
  if (!Capacitor.isNativePlatform()) {
    const items = readBrowser<InventoryItem[]>('inventory_items', []);
    const existing = input.id ? items.find((item) => item.id === input.id) : null;
    if (existing) Object.assign(existing, row);
    else items.unshift({ id: nextNumericId(items), ...row });
    writeBrowser('inventory_items', items);
    return;
  }
  const db = await ensureNativeDb();
  if (input.id) {
    await db.run('UPDATE inventory_items SET name = ?, unit = ?, quantity = ?, reorderLevel = ?, notes = ?, updatedAt = ? WHERE id = ?', [row.name, row.unit, row.quantity, row.reorderLevel, row.notes, row.updatedAt, input.id]);
  } else {
    await db.run('INSERT INTO inventory_items (name, unit, quantity, reorderLevel, notes, branch, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)', [row.name, row.unit, row.quantity, row.reorderLevel, row.notes, row.branch, row.updatedAt]);
  }
}

export async function listInventoryMovements(branch: string): Promise<InventoryMovement[]> {
  if (!Capacitor.isNativePlatform()) return readBrowser<InventoryMovement[]>('inventory_movements', []).filter((item) => item.branch === branch).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt FROM inventory_movements WHERE branch = ? ORDER BY createdAt DESC, id DESC', [branch]);
  return (result.values ?? []) as InventoryMovement[];
}

export async function recordInventoryMovement(input: { itemId: number; movementType: 'in' | 'out'; quantity: number; notes: string; staffName: string; branch: string }) {
  const quantity = Math.max(0, Number(input.quantity || 0));
  if (quantity <= 0) throw new Error('Quantity must be greater than zero.');
  const items = await listInventoryItems(input.branch);
  const item = items.find((entry) => entry.id === input.itemId);
  if (!item) throw new Error('Inventory item not found.');
  const nextQuantity = input.movementType === 'in' ? item.quantity + quantity : item.quantity - quantity;
  if (nextQuantity < 0) throw new Error('Stock-out quantity is greater than current stock.');
  const movement = { itemId: item.id, itemName: item.name, movementType: input.movementType, quantity, notes: input.notes || null, staffName: input.staffName, branch: input.branch, createdAt: nowIso() };

  if (!Capacitor.isNativePlatform()) {
    const allItems = readBrowser<InventoryItem[]>('inventory_items', []);
    const existing = allItems.find((entry) => entry.id === item.id);
    if (existing) {
      existing.quantity = Number(nextQuantity.toFixed(2));
      existing.updatedAt = movement.createdAt;
    }
    writeBrowser('inventory_items', allItems);
    const movements = readBrowser<InventoryMovement[]>('inventory_movements', []);
    movements.unshift({ id: nextNumericId(movements), ...movement });
    writeBrowser('inventory_movements', movements);
    return;
  }

  const db = await ensureNativeDb();
  await db.run('UPDATE inventory_items SET quantity = ?, updatedAt = ? WHERE id = ?', [Number(nextQuantity.toFixed(2)), movement.createdAt, item.id]);
  await db.run('INSERT INTO inventory_movements (itemId, itemName, movementType, quantity, notes, staffName, branch, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [movement.itemId, movement.itemName, movement.movementType, movement.quantity, movement.notes, movement.staffName, movement.branch, movement.createdAt]);
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
  if (!Capacitor.isNativePlatform()) return readBrowser<Subcleaning[]>('subcleanings', []).filter((item) => item.branch === branch).map((item) => ({ ...item, cleaningType: item.cleaningType ?? 'tube' }));
  const db = await ensureNativeDb();
  const result = await db.query('SELECT id, date, machineIds, machineNames, cleaningStatus, COALESCE(cleaningType, "tube") as cleaningType, notes, branch FROM subcleanings WHERE branch = ? ORDER BY date DESC, id DESC', [branch]);
  return (result.values ?? []).map((row) => ({ ...(row as Subcleaning), machineIds: parseJson<number[]>((row as { machineIds: string }).machineIds, []) }));
}

export async function saveSubcleaning(input: { date: string; machineIds: number[]; cleaningStatus: string; notes: string; branch: string; cleaningType?: 'tube' | 'general' }) {
  const machines = await listMachines(input.branch);
  const machineNames = machines.filter((machine) => input.machineIds.includes(machine.id)).map((machine) => machine.machineName).join(', ');
  const cleaningType = input.cleaningType ?? 'tube';
  if (!Capacitor.isNativePlatform()) {
    const logs = readBrowser<Subcleaning[]>('subcleanings', []);
    logs.unshift({ id: nextNumericId(logs), date: input.date, machineIds: input.machineIds, machineNames, cleaningStatus: input.cleaningStatus, cleaningType, notes: input.notes || null, branch: input.branch });
    writeBrowser('subcleanings', logs);
    const allMachines = readBrowser<Machine[]>('machines', seedMachines);
    allMachines.forEach((machine) => {
      if (input.machineIds.includes(machine.id)) machine.status = input.cleaningStatus === 'completed' ? 'available' : 'under_cleaning';
    });
    writeBrowser('machines', allMachines);
    return;
  }
  const db = await ensureNativeDb();
  await db.run('INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)', [input.date, JSON.stringify(input.machineIds), machineNames, input.cleaningStatus, cleaningType, input.notes || null, input.branch]);
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
    logs.unshift({ id: nextNumericId(logs), date: todayStr, machineIds: [machineId], machineNames: machine?.machineName ?? '', cleaningStatus: 'completed', cleaningType: 'tube', notes: null, branch });
    writeBrowser('subcleanings', logs);
    return;
  }
  const db = await ensureNativeDb();
  const nameResult = await db.query('SELECT machineName FROM machines WHERE id = ?', [machineId]);
  const machineName = (nameResult.values?.[0] as { machineName: string } | undefined)?.machineName ?? '';
  await db.run('UPDATE machines SET status = ? WHERE id = ?', ['available', machineId]);
  const todayStr = localDateInput();
  await db.run(
    'INSERT INTO subcleanings (date, machineIds, machineNames, cleaningStatus, cleaningType, notes, branch) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [todayStr, JSON.stringify([machineId]), machineName, 'completed', 'tube', null, branch]
  );
}

export async function confirmGeneralCleaning(branch: string, staffName: string) {
  await saveSubcleaning({ date: localDateInput(), machineIds: [], cleaningStatus: 'completed', cleaningType: 'general', notes: `Confirmed by ${staffName}`, branch });
}
