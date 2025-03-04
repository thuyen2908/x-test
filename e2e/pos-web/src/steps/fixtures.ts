import { expect } from '@playwright/test';
import { test as base, createBdd } from 'playwright-bdd';

import { type TestConfig, getConfig } from '../test-config';
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

// Clean up redundant on-going tickets (in case the test fails and did not clean up properly)
AfterScenario(async ({ browser, testConfig, testStorage }) => {
	const redundantTickets = Array.from(testStorage.ongoingTickets);
	const context = await browser.newContext();

	const cleanupTasks = redundantTickets.map(async (ticketNumber) => {
		const page = await context.newPage();
		const homePage = new HomePage(testConfig, testStorage, page);
		const ticketViewPage = new TicketViewPage(testConfig, testStorage, page);

		await homePage.open();
		await homePage.waitForResponseOfAPI('Get In-Service Tickets');

		const isTicketExist = await homePage.locators
			.ticketById(ticketNumber)
			.isVisible();
		if (!isTicketExist) {
			console.info(
				`Ticket #${ticketNumber} does not exist, skipping cleanup...`,
			);
			return;
		}

		console.info(`Cleaning up ticket #${ticketNumber}...`);
		await homePage.selectTicketById(ticketNumber);

		await expect(ticketViewPage.locators.pageName).toHaveText(
			TicketViewPage.TITLE,
		);
		await ticketViewPage.voidTicket();

		console.info(`Ticket #${ticketNumber} cleaned up successfully`);
	});

	await Promise.all(cleanupTasks);

	await context.close();
});
