const sqlite3 = require('sqlite3').verbose();
const table = 'chips'

const db = new sqlite3.Database('data.db', (err: { message: any; }) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        // console.log('Connected to the SQLite.');
    }
});

function run(sql: string, params: any) {
    return new Promise<void>((resolve, reject) => {
        db.run(sql, params, (err: Error) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

function get(sql: string, params: any) {
    return new Promise<string | undefined>((resolve, reject) => {
        db.get(sql, params, (err: Error, row: { value: string | PromiseLike<string | undefined> | undefined; }) => {
            if (err) {
                reject(err)
            } else {
                resolve(row ? row.value : undefined)
            }
        })
    })
}

export function initializeDatabase(): Promise<void> {
    console.log('Initializing database...')
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE IF NOT EXISTS ${table} (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )`, (err: { message: any; }) => {
            if (err) {
                console.error('Error creating table:', err.message);
                reject(err);
            } else {
                console.log(`Table ${table} is ready.`);
                resolve();
            }
        });
    });
}

// 添加记录
export async function addRecord(key: string, value: string): Promise<void> {
    try {
        await run(`INSERT OR REPLACE INTO ${table} (key, value) VALUES (?, ?)`, [key, value])
    } catch (err: any) {
        if (err.message.includes('no such table')) {
            await initializeDatabase().catch((error) => {
                throw error
            })
        }
    }
}

// 查询记录
export async function queryRecord(key: string): Promise<string | undefined> {
    try {
        return await get(`SELECT value FROM ${table} WHERE key = ?`, [key])
    } catch (err: any) {
        if (err.message.includes('no such table')) {
            await initializeDatabase().catch((error) => {
                throw error
            })
        }
    }
}

export function deleteRecord(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM ${table} WHERE key = ?`, [key], function (err: Error) {
            if (err) {
                if (err.message.includes('no such table')) {
                    initializeDatabase().then(() => {
                        return deleteRecord(key);
                    }).then(resolve).catch(reject);
                }
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export async function saveObject(key: string, obj: { [key: string]: any }): Promise<void> {
    const serialized = JSON.stringify(obj);
    await addRecord(key, serialized);
    console.log('Object saved successfully.');
}

export async function retrieveObject(key: string): Promise<any | undefined> {
    const serialized = await queryRecord(key);
    if (serialized !== undefined) {
        try {
            // console.log(`Object ${key} retrieved successfully`);
            return JSON.parse(serialized);
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    } else {
        console.log('Object not found.');
    }
}
