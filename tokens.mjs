import { createTransaction, storage } from '…/storage.mjs';

export const tokens = {
	delete(key) {
		return storage.then((db) => createTransaction(db, (store) => store.delete(key)));
	},
	get(key) {
		return storage.then((db) => createTransaction(db, (store) => store.get(key)));
	},
	put(key, token) {
		return storage.then((db) => createTransaction(db, (store) => store.put(token, key)));
	},
};
