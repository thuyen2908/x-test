import { expect } from '@playwright/test';
import { Fixture } from 'playwright-bdd/decorators';

import { xPage } from './x.page';

export
@Fixture('closedTicketPage')
class ClosedTicketPage extends xPage {
	public override get locators() {
		const { page } = this;

		const dateRangeButton = page.locator('button.btn-range-calendar');
		const grid = page.locator('.MuiDataGrid-root');
		const calendar = page.locator('.MuiDateCalendar-root');

		return {
			...super.locators,

			/**
			 * Locate the date range button in the closed ticket
			 */
			dateRangeButton,
			/**
			 * Locate data grid in the closed ticket
			 */
			grid,
			/**
			 * Locate the opened date calendar
			 */
			calendar,
		};
	}

	public waitForClosedTicketsResponse(timeout = 30_000) {
		return this.page.waitForResponse(
			(response) =>
				response.url().includes('/api/composite/closed-tickets/') &&
				response.status() < 400,
			{ timeout },
		);
	}

	public async waitForReady() {
		await expect(this.locators.dateRangeButton).toBeVisible();
		await expect(this.locators.grid).toBeVisible();
	}

	public async openDateCalendar() {
		await expect(this.locators.dateRangeButton).toBeVisible();
		await this.locators.dateRangeButton.click();
		await expect(this.locators.calendar).toBeVisible();
	}

	public async refresh() {
		const response = this.waitForClosedTicketsResponse();
		await expect(this.locators.refreshButton).toBeVisible();
		await this.locators.refreshButton.click();
		await response;
		await this.waitForReady();
	}

	public async selectPreviousDate() {
		const { calendar } = this.locators;

		if (!(await calendar.isVisible().catch(() => false))) {
			await this.openDateCalendar();
		}

		const todayButton = calendar.locator('button[aria-current="date"]');
		await expect(todayButton).toBeVisible();

		const todayText = await todayButton.textContent();
		const todayNumber = Number.parseInt(todayText?.trim() || '0', 10);
		const response = this.waitForClosedTicketsResponse();

		if (todayNumber === 1) {
			await calendar.locator('button[title="Previous month"]').click();
			const previousDay = calendar
				.locator('button.MuiPickersDay-root:not([disabled])')
				.last();
			await expect(previousDay).toBeVisible();
			await previousDay.click();
		} else {
			const previousDayNumber = todayNumber - 1;
			const previousDayLocator = calendar
				.locator('button.MuiPickersDay-root:not(.MuiPickersDay-dayOutsideMonth)')
				.filter({ visible: true })
				.getByText(new RegExp(`^${previousDayNumber}$`), { exact: true });

			const previousDay =
				(await previousDayLocator.count()) > 1
					? previousDayLocator
							.filter({
								hasNot: this.page.locator('[aria-selected="true"]'),
							})
							.first()
					: previousDayLocator.first();

			await expect(previousDay).toBeVisible();
			await previousDay.click({ force: true });
		}

		await response;
		await this.waitForReady();
	}
}
