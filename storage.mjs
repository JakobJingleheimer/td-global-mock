console.trace('__STORAGE__');


const DB_NAME = 'example.com';
const STORE_NAME = 'config';

export function getStorage(dbName, storeName) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName, 1);

    req.onerror = () => {
      console.error(`opening indexedDb failed ${req.error?.stack}`);

      reject(req.error);
    };
    req.onsuccess = () => resolve(req.result);

    req.onupgradeneeded = () => {
      req.result.createObjectStore(storeName);
    };
  });
}

export const storage = getStorage(DB_NAME, STORE_NAME);

export function createTransaction(
  db,
  interaction,
  storeName = STORE_NAME,
) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');

    transaction.oncomplete = () => resolve(objectStoreRequest.result);
    transaction.onabort = transaction.onerror = () => reject(transaction.error);

    const objectStoreRequest = interaction(transaction.objectStore(storeName));
  });
}
