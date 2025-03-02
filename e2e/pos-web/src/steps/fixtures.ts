import { test as base, createBdd } from 'playwright-bdd';

import { Storage } from '../storage';
import { type TestConfig, getConfig } from '../test-config';

import { HomePage } from './home.page';
import { LoginPage } from './login.page';
import { TicketViewPage } from './ticket-view.page';
import { xPage } from './x.page';

export interface Fixtures {
	testConfig: TestConfig;
	storage: Storage;
	xPage: xPage;

	loginPage: LoginPage;
	homePage: HomePage;
	ticketViewPage: TicketViewPage;
}

export const test = base.extend<Fixtures>({
	testConfig: [getConfig(), { option: true }],
	storage: ({ page }, use) => use(new Storage(page)),
	xPage: ({ page }, use) => use(new xPage(page)),

	loginPage: ({ page }, use) => use(new LoginPage(page)),
	homePage: ({ page }, use) => use(new HomePage(page)),
	ticketViewPage: ({ page }, use) => use(new TicketViewPage(page)),
});

export const { Given, When, Then } = createBdd(test);
