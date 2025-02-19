import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { constants, type PageId } from '#const';
import { env } from '#env';

const { Given, When, Then, BeforeScenario } = createBdd();

BeforeScenario(async ({ page }) => {
	// TODO: this is just a temporary solution for the issue of unable to click payment button
	//   in headless browsers, somehow our website relies on window.chrome.webview to function properly,
	//   which is not available in headless browsers
	// Consider using a fixture to inject this script instead of doing it in every scenario
	await page.addInitScript(() => {
		// biome-ignore lint/suspicious/noExplicitAny: workaround for now
		(window as any).chrome = {};
	});
});

Given('I am on the {pageId} page', async ({ page }, pageId: PageId) => {
	const pageUrl = constants.PageUrl[pageId];

	await page.goto(pageUrl);
});

Then(
	'I should be redirected to {pageId} page',
	async ({ page }, pageId: PageId) => {
		const pageUrl = constants.PageUrl[pageId];

		await page.waitForURL(pageUrl);
		await expect(page).toHaveURL(pageUrl);
	},
);

When('I clock in the timesheet', async ({ page }) => {
	// click on the Timesheet button
	await page.getByText('Timesheet').click();

	// find and click on the Clock In button
	const clockInButton = page.getByText('Clock In', { exact: true });
	await expect(clockInButton).toBeVisible();
	await clockInButton.click();

	// expect the clock in password dialog to be visible
	const clockInPasswordDialog = page.locator('div.MuiDialogContent-root');
	await expect(clockInPasswordDialog).toBeVisible();

	// enter the clock in password
	const { clockInPassword } = env.posConfig;
	for (const passwordDigit of clockInPassword) {
		const passwordDigitButton = clockInPasswordDialog.getByText(passwordDigit, {
			exact: true,
		});

		await passwordDigitButton.click();
	}

	const successfullyClockedInToast = page.getByText('clocked in successfully'); // in case of new clock in session
	const alreadyClockedInToast = page.getByText('has clocked in'); // in case there's an existing clock in session

	// expect a toast message indicating the result of the clock in operation
	await expect(
		successfullyClockedInToast.or(alreadyClockedInToast),
	).toBeVisible();

	// refresh the page to get the latest data
	await page.reload();
});

Then(
	'I should see the employee {string} in the employee list',
	async ({ page }, employeeName: string) => {
		const employeeList = page.locator('ul.ListItemEmployee__wrap');

		await expect(employeeList).toBeVisible();

		await expect(
			employeeList.getByText(employeeName, { exact: true }),
		).toBeVisible();
	},
);

// TODO: reduce duplicated codes by using fixtures and POM in the future
When(
	'I select the {string} employee',
	async ({ page }, employeeName: string) => {
		const employeeList = page.locator('ul.ListItemEmployee__wrap');

		await expect(employeeList).toBeVisible();

		const employee = employeeList.getByText(employeeName, { exact: true });
		await expect(employee).toBeVisible();

		await employee.click();
	},
);

Then(
	'I should see the {string} screen',
	async ({ page }, screenName: string) => {
		const screenTitle = page
			.locator('p.MuiTypography-body1.pageName')
			.getByText(screenName, { exact: true });

		await expect(screenTitle).toBeVisible();
	},
);

Then(
	'I should see the {string} service',
	async ({ page }, serviceName: string) => {
		const service = page
			.locator('li.ItemService')
			.getByText(serviceName, { exact: true });
		await expect(service).toBeVisible();
	},
);

// TODO: reduce duplicated codes by using fixtures and POM in the future
When(
	'I add the {string} service to my cart',
	async ({ page }, serviceName: string) => {
		const service = page
			.locator('li.ItemService')
			.getByText(serviceName, { exact: true });
		await expect(service).toBeVisible();

		await service.click();
	},
);

Then(
	'I should see my cart showing {int} item added',
	async ({ page }, itemCount: number) => {
		const itemCountElement = page.locator(
			'svg[data-testid="LocalPrintshopIcon"] + span',
		);

		await expect(itemCountElement).toBeVisible();

		expect(itemCountElement).toHaveText(itemCount.toString());
	},
);

When('I click on the {string} button', async ({ page }, buttonText: string) => {
	const button = page.getByRole('button', { name: buttonText });
	await expect(button).toBeVisible();

	await button.click();
});

Then(
	'I should see the text {string} visible',
	async ({ page }, text: string) => {
		await expect(page.getByText(text, { exact: true })).toBeVisible();
	},
);

Then(
	'I should see the button with id {string} visible',
	async ({ page }, buttonId: string) => {
		await expect(page.locator(`button#${buttonId}`)).toBeVisible();
	},
);

When(
	'I click on the element with id {string}',
	async ({ page }, elementId: string) => {
		const element = page.locator(`#${elementId}`);

		await expect(element).toBeVisible();

		await element.click();
	},
);

Then(
	'I should see a popup dialog with title {string}',
	async ({ page }, dialogTitle: string) => {
		// TODO: consider using a fixture to reduce duplicated codes
		const dialogTitleElement = page.locator('.MuiDialogTitle-root');

		await expect(dialogTitleElement).toBeVisible();
		await expect(dialogTitleElement).toHaveText(dialogTitle);
	},
);

Then(
	'I should see a popup dialog with content {string}',
	async ({ page }, content: string) => {
		const dialogContentElement = page.locator('.MuiDialogContent-root');

		await expect(dialogContentElement).toBeVisible();
		await expect(dialogContentElement).toHaveText(content);
	},
);

When('I wait for {int} seconds', async ({ page }, seconds: number) => {
	await page.waitForTimeout(seconds * 1000);
});

Then('The test should pause here for debugging', async ({ page }) => {
	await page.pause();
});

When('I wait for the network to be idle', async ({ page }) => {
	await page.waitForLoadState('networkidle');
});

When(
	'I click on the {string} button in the popup dialog',
	async ({ page }, buttonText: string) => {
		const dialog = page.locator('div[role="dialog"]');

		const button = dialog.getByRole('button', {
			name: buttonText,
			exact: true,
		});
		await expect(button).toBeVisible();

		await button.click();
	},
);

When('I clock out the timesheet', async ({ page }) => {
	// click on the Timesheet button
	await page.getByText('Timesheet').click();

	// find and click on the Clock Out button
	const clockOutButton = page.getByText('Clock Out', { exact: true });
	await expect(clockOutButton).toBeVisible();
	await clockOutButton.click();

	// expect the clock out password dialog to be visible
	const clockOutPasswordDialog = page.locator('div.MuiDialogContent-root');
	await expect(clockOutPasswordDialog).toBeVisible();

	// enter the clock out password
	const { clockInPassword: clockOutPassword } = env.posConfig; // clock in and clock out share the same password
	for (const passwordDigit of clockOutPassword) {
		const passwordDigitButton = clockOutPasswordDialog.getByText(
			passwordDigit,
			{
				exact: true,
			},
		);

		await passwordDigitButton.click();
	}

	const successfullyClockedOutToast = page.getByText(
		'clocked out successfully',
	);
	const alreadyClockedOutToast = page.getByText('has not clocked in yet'); // in case user has not clocked in yet

	// expect a toast message indicating the result of the clock out operation
	await expect(
		successfullyClockedOutToast.or(alreadyClockedOutToast),
	).toBeVisible();

	// refresh the page to get the latest data
	await page.reload();
});
