import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';

import * as td from 'testdouble';


describe('tokens', () => {
	let tokens;

	before(async () => {
		({ tokens } = await import('./tokens.mjs'));
		console.log('tokens before() mocked modules:', td.listReplacedModules());
		console.log('tokens before() storage:', await import('./storage.mjs'));
	});

	it('should not blow up', () => {
		assert.doesNotThrow(() => tokens.put('access', 'a123def'));
	});
});
