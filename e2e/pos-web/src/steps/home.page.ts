import { expect } from '@playwright/test';
import { Fixture, When } from 'playwright-bdd/decorators';

import { constants } from '#const';
import { PageId, type TestOptions } from '#types';

import { TicketViewPage } from './ticket-view.page';
import { xPage } from './x.page';

export
@Fixture('homePage')
class HomePage extends xPage {
	override open() {
		return this.page.goto(constants.PageUrl[PageId.HOME]);
	}

	/**
	 * A list of this page specific locators
	 */
	public override get locators() {
		const { page } = this;

		const employeeList = page.locator('div.xQueueList');
		const ticketList = page.locator('div.ListTicket');

		return {
			...super.locators,

			/**
			 * Locate the employee list section, which is the middle column of the {@link PageId.HOME} screen
			 */
			employeeList,
			/**
			 * Locate an employee by their name
			 */
			employee: (employeeName: string) =>
				employeeList.getByText(employeeName, { exact: true }),

			/**
			 * Locate the on-going ticket list, which is the right column of the {@link PageId.HOME} screen
			 */
			ticketList,
			/**
			 * Locate an on-going ticket by its ID
			 */
			ticketById: (ticketId: string) =>
				ticketList.getByText(`#${ticketId}`, { exact: true }),
		};
	}

	/**
	 * Select an on-going ticket (by its number) on the home screen
	 */
	public selectTicketById(id: string, options: TestOptions = {}) {
		const { locators } = this;

		return locators.ticketById(id).click({ timeout: options.timeout });
	}

	/* -------------------------------- BDD steps ------------------------------- */

	/**
	 * Select an employee on {@link PageId.HOME} screen
	 */
	@When('I select the {string} employee')
	public async selectEmployee(employeeName: string) {
		const { locators } = this;

		const employee = locators.employee(employeeName);
		await employee.click();

		await this.waitForResponseOfAPI('Create a ticket');
		await expect(locators.pageName).toHaveText(TicketViewPage.TITLE);

		const ticketViewPage = new TicketViewPage(
			this.testConfig,
			this.testStorage,
			this.page,
		);
		const ticketNumber = await ticketViewPage.getTicketNumber();

		// keep track ongoing tickets, used for cleanup in case of test failure
		ticketNumber && this.testStorage.ongoingTickets.add(ticketNumber);
	}
}
