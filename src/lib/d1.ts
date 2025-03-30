import type { D1Database } from '@cloudflare/workers-types';
import type { Customer } from '../types/d1';

export async function getCustomersByCompany(db: D1Database, companyFilter: string): Promise<Customer[]> {
  const stmt = db.prepare('SELECT CustomerId, CompanyName, ContactName FROM Customers WHERE CompanyName LIKE ? ORDER BY CustomerId ASC');
  const { results } = await stmt.bind(`%${companyFilter}%`).all<Customer>();
  return results || [];
}

export async function getAllCustomers(db: D1Database): Promise<Customer[]> {
  const stmt = db.prepare('SELECT CustomerId, CompanyName, ContactName FROM Customers ORDER BY CustomerId ASC');
  const { results } = await stmt.all<Customer>();
  return results || [];
}