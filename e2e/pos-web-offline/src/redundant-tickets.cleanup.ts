import { type Browser, expect } from '@playwright/test';

import { HomePage } from './steps/home.page';
import { TicketViewPage } from './steps/ticket-view.page';
import { type TestConfig } from './test-config';
import { type TestStorage } from './test-storage';

interface CleanupRedundantTicketsArgs {
	browser: Browser;
	testConfig: TestConfig;
	testStorage: TestStorage;
}

/**
 * Clean up redundant on-going tickets (in case the test fails and did not clean up properly)
 */
export const cleanupRedundantTickets = async ({
	browser,
	testConfig,
	testStorage,
}: CleanupRedundantTicketsArgs) => {
	try {
		const ongoingTickets = Array.from(testStorage.ongoingTickets);
		const context = await browser.newContext();

		console.info('On-going tickets:', ongoingTickets);

		if (!ongoingTickets.length) {
			console.info('No on-going tickets to clean up');
			return;
		}

		const cleanupTasks = ongoingTickets.map(async (ticketNumber) => {
			const page = await context.newPage();
			const homePage = new HomePage(testConfig, testStorage, page);
			const ticketViewPage = new TicketViewPage(testConfig, testStorage, page);

			await homePage.open();
			await homePage.waitForResponseOfAPI('Get In-Service Tickets', {
				timeout: 10_000,
			});

			// verify if the ticket still exists
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
	} catch (error) {
		console.error(error);
	}
};
