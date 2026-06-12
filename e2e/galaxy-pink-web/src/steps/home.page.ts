import { expect, type Response } from '@playwright/test';
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
		const ticketList = page.locator('div.MainPOS__right');

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

	private async captureCreatedTicket(response: Response) {
		const responseBody = await response.json();
		const ticketNo = responseBody?.dataSource?.ticketNo;

		console.info(
			`[captureCreatedTicket] status=${response.status()} url=${response.url()} ticketNo=${ticketNo ?? '<empty>'}`,
		);

		if (!ticketNo) return;

		this.testStorage.currentTicketId = ticketNo;
		this.testStorage.ongoingTickets.add(ticketNo);
		console.info(
			`[captureCreatedTicket] currentTicketId=${this.testStorage.currentTicketId} ongoingTickets=${this.testStorage.ongoingTickets.size}`,
		);
	}

	public async createTicketByEmployee(employeeName: string) {
		const { locators } = this;

		const createTicketResponse = this.waitForResponseOfAPI('Create a ticket', {
			timeout: 15_000,
		}).catch((error) => {
			console.warn(
				`[captureCreatedTicket] Create ticket response was not observed for employee="${employeeName}": ${error.message}`,
			);
			return undefined;
		});

		await locators.employee(employeeName).click();

		await expect(locators.pageName).toHaveText(TicketViewPage.TITLE);

		const response = await Promise.race([
			createTicketResponse,
			this.page.waitForTimeout(1_000).then(() => undefined),
		]);
		if (response) {
			await this.captureCreatedTicket(response);
		}

		const ticketViewPage = new TicketViewPage(
			this.testConfig,
			this.testStorage,
			this.page,
		);
		const headerTicketNo = await ticketViewPage.getTicketNumber();
		console.info(
			`[captureCreatedTicket] headerTicketNo=${headerTicketNo ?? '<empty>'} storedTicketId=${this.testStorage.currentTicketId ?? '<empty>'}`,
		);
		if (headerTicketNo) {
			this.testStorage.currentTicketId = headerTicketNo;
			this.testStorage.ongoingTickets.add(headerTicketNo);
		}
	}

	/* -------------------------------- BDD steps ------------------------------- */

	/**
	 * Select an employee on {@link PageId.HOME} screen
	 */
	@When('I select the {string} employee')
	public async selectEmployee(employeeName: string) {
		await this.createTicketByEmployee(employeeName);
	}
	@When('I hold the {string} employee two seconds')
	public async selectHoldEmployee(employeeName: string) {
		const { locators } = this;

		const employee = locators.employee(employeeName);

		await employee.hover();
		await this.page.mouse.down();
		await this.page.waitForTimeout(1500);
		await this.page.mouse.up();
	}
}
