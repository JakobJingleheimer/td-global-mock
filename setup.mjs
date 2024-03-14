console.log('__SETUP__ start', td.listReplacedModules());

import {
  afterEach,
} from 'node:test';

import * as td from 'testdouble';


const dbStore = {
  __data: new Map(),

  async delete(k) {
    this.__data.delete(k);
    return { result: undefined };
  },
  async get(k) {
    return { result: this.__data.get(k) };
  },
  async put(v, k) {
    return { result: this.__data.set(k, v) };
  },
};
await td.replaceEsm('./storage.mjs', {
  createTransaction: function mock_createTransaction(db, fn) {
    return new Promise((res, rej) => {
      fn(dbStore)
        .then(({ result }) => res(result))
        .catch(({ error }) => rej(error));
    });
  },
  storage: Promise.resolve(dbStore),
});
afterEach(() => dbStore.__data.clear());

console.log('__SETUP__ end', td.listReplacedModules());
