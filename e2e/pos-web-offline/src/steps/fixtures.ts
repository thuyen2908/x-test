import { test as base, createBdd } from 'playwright-bdd';

import { getConfig, type TestConfig } from '../test-config';
import { TestStorage } from '../test-storage';
import { HomePage } from './home.page';
import { LoginPage } from './login.page';
import { TicketViewPage } from './ticket-view.page';
import { xPage } from './x.page';

export interface Fixtures {
	testConfig: TestConfig;
	testStorage: TestStorage;
	xPage: xPage;

	loginPage: LoginPage;
	homePage: HomePage;
	ticketViewPage: TicketViewPage;
}

export const test = base.extend<Fixtures>({
	testConfig: [getConfig(), { option: true }],
	testStorage: async ({ testConfig }, use) => use(new TestStorage(testConfig)),
	xPage: ({ testConfig, testStorage, page }, use) =>
		use(new xPage(testConfig, testStorage, page)),

	loginPage: ({ testConfig, testStorage, page }, use) =>
		use(new LoginPage(testConfig, testStorage, page)),
	homePage: ({ testConfig, testStorage, page }, use) =>
		use(new HomePage(testConfig, testStorage, page)),
	ticketViewPage: ({ testConfig, testStorage, page }, use) =>
		use(new TicketViewPage(testConfig, testStorage, page)),
});

export const { Given, When, Then, AfterScenario } = createBdd(test);

/* -------------------------------------------------------------------------- */
/*                                 Test hooks                                 */
/* -------------------------------------------------------------------------- */
