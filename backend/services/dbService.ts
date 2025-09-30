import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { Employee } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../../data/main.db');

class DbService {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error connecting to database:', err.message);
            } else {
                console.log('Connected to SQLite database');
            }
        });
    }

    query(sql: string, params: unknown = []): Promise<unknown> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows as Employee[]);
                }
            });
        });
    }

    async getEmployees(): Promise<Employee[]> {
        return this.query('SELECT * FROM employees') as unknown as Employee[];
    }

    async getEmployeeById(id: number): Promise<Employee | null> {
        const employees = await this.query('SELECT * FROM employees WHERE id = ?', [id]) as unknown as Employee[];
        return employees.length > 0 ? employees[0] : null;
    }

    async createEmployee(employee: Employee): Promise<Employee> {
        const { firstName, lastName, age } = employee;
        return this.query(
            'INSERT INTO employees (firstName, lastName, age) VALUES (?, ?, ?) RETURNING *',
            [firstName, lastName, age]
        ) as unknown as Employee;
    }

    async updateEmployee(id: number, employee: Employee): Promise<Employee> {
        const { firstName, lastName, age } = employee;
        return this.query(
            'UPDATE employees SET firstName = ?, lastName = ?, age = ? WHERE id = ? RETURNING *',
            [firstName, lastName, age, id]
        ) as unknown as Employee;
    }

    async deleteEmployee(id: number): Promise<Employee | null> {
        const employee = await this.getEmployeeById(id);
        if (employee === null) {
            return null;
        }
        await this.query('DELETE FROM employees WHERE id = ?', [id]);
        return employee;
    }

    close(): void {
        this.db.close((err) => {
            if (err) {
                console.error('Error closing database', err.message);
            } else {
                console.log('Connection to database closed');
            }
        });
    }
}

// Esporta un'istanza singleton del servizio
export const dbService = new DbService();