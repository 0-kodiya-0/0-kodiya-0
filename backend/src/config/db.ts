import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Get current file path in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Creates a database instance with the specified name and default data
 * @param dbName - The name of the database file (without extension)
 * @param defaultData - The default data structure for an empty database
 * @returns A configured Low database instance
 */
export function createDatabase<T>(dbName: string, defaultData: T): Low<T> {
  // Set up path for the database file
  const dbFile = join(__dirname, `../../data/${dbName}.json`);

  // Configure the adapter and database
  const adapter = new JSONFile<T>(dbFile);
  return new Low<T>(adapter, defaultData);
}