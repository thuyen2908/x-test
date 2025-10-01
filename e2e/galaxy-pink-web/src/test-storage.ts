import { Fixture } from 'playwright-bdd/decorators';

import type { TestConfig } from './test-config';

/**
 * Test storage, used to persist data between tests
 */
export
@Fixture('testStorage')
class TestStorage {
	static readonly #ongoingTickets: Set<string> = new Set();

	constructor(protected readonly testConfig: TestConfig) {}

	/**
	 * Keep track of ongoing tickets, used for test cleanup at the end of the test suite
	 */
	public get ongoingTickets() {
		return TestStorage.#ongoingTickets;
	}
}
