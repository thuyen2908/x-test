import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { constants } from '#const';
import { PageId } from '#types';

import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

/**
 * Navigate to the booking-online homepage
 */
Given('I navigate to the booking-online homepage', async ({ page }) => {
	const url = constants.PageUrl[PageId.HOME];
	console.log(`Navigating to: ${url}`);
	await page.goto(url);
});

/**
 * Verify the page title is visible
 */
Then('I should see the page title', async ({ page }) => {
	// Wait for the page to be loaded
	await page.waitForLoadState('domcontentloaded');

	// Get the page title
	const title = await page.title();
	console.log(`Page title: ${title}`);

	// Assert that the title is not empty
	expect(title).toBeTruthy();
	expect(title.length).toBeGreaterThan(0);
});

/**
 * Verify the page loads successfully
 */
Then('The page should be loaded successfully', async ({ page }) => {
	// Wait for the page to be fully loaded
	await page.waitForLoadState('networkidle');

	// Verify we're on the correct URL
	const currentUrl = page.url();
	console.log(`Current URL: ${currentUrl}`);

	expect(currentUrl).toContain(constants.PageUrl[PageId.HOME]);

	// Optionally, verify that the page body is visible
	const bodyVisible = await page.locator('body').isVisible();
	expect(bodyVisible).toBeTruthy();
});

Then(
	'I should see the text {string} visible',
	async ({ page }, text: string) => {
		await expect(page.getByText(text)).toBeVisible();
	},
);

Then('I should see the date default to today', async ({ page }) => {
	const today = new Date();

	// Format to match "Sun, 19 Oct 2025" (day before month)
	const weekday = today.toLocaleDateString('en-US', { weekday: 'short' });
	const day = today.getDate(); // No padding
	const month = today.toLocaleDateString('en-US', { month: 'short' });
	const year = today.getFullYear();

	const formattedToday = `${weekday}, ${day} ${month} ${year}`;

	const dateInput = page.locator('input[placeholder="EEEE, DD MMMM YYYY"]');

	await expect(dateInput).toHaveValue(formattedToday);
});

When('I click to select service', async ({ page }) => {
	const selectService = page.locator('[title="Click to select service"]');

	await expect(selectService).toBeVisible();
	await selectService.click();
});

Then(
	'I should see a popup dialog with title {string}',
	async ({ page }, title) => {
		const dialogTitle = page
			.getByRole('dialog')
			.getByText(title, { exact: true });

		await expect(dialogTitle).toBeVisible();
	},
);

Then('I should see the categories displayed correctly', async ({ page }) => {
	const expectedCategories = [
		'MANI & PEDI',
		'FULL SET & FILL IN',
		'ADDITIONAL SERVICE',
	];

	const categoryElements = page.locator('.box-package-name li');
	for (const expectedCategory of expectedCategories) {
		const categoryElement = categoryElements.getByText(expectedCategory);
		await expect(categoryElement).toBeVisible();
		await expect(categoryElement).toHaveText(expectedCategory);
	}
	await expect(categoryElements).toHaveCount(expectedCategories.length);
});

When(
	'I click on the {string} text inside the content section of the opening dialog',
	async ({ page }, text: string) => {
		const contentSection = page.getByRole('dialog').getByText(text).last();
		await expect(contentSection).toBeVisible();
		await contentSection.click();
	},
);

Then(
	'I should see the selected service {string}',
	async ({ page }, service: string) => {
		const selectedServiceInput = page.locator(
			'input[name$=".service.serviceNameDisplay"][placeholder="Service"][readonly]',
		);

		await expect(selectedServiceInput).toBeVisible();
		await expect(selectedServiceInput).toHaveValue(service);
	},
);

When('I click to select technician', async ({ page }) => {
	const selectTechnician = page.locator('[placeholder="Technician"]');

	await expect(selectTechnician).toBeVisible();
	await selectTechnician.click();
});

Then('I should see the technicians displayed correctly', async ({ page }) => {
	const expectedTechnicians = ['Addison', 'Anna', 'Any Technician'];

	const technicianElements = page.locator('.box-item-click-employee');
	for (const expectedTechnician of expectedTechnicians) {
		const technicianElement = technicianElements.getByText(expectedTechnician);
		await expect(technicianElement).toBeVisible();
		await expect(technicianElement).toHaveText(expectedTechnician);
	}
	await expect(technicianElements).toHaveCount(expectedTechnicians.length);
});

Then(
	'I should see the selected technician {string}',
	async ({ page }, technician: string) => {
		const selectedTechnicianInput = page.locator(
			'input[name$=".employee.name"][placeholder="Technician"][readonly]',
		);

		await expect(selectedTechnicianInput).toBeVisible();
		await expect(selectedTechnicianInput).toHaveValue(technician);
	},
);

When('I click to add notes', async ({ page }) => {
	const addNotes = page.locator('.note-area');

	await expect(addNotes).toBeVisible();
	await addNotes.click();
});

When('I enter a note {string}', async ({ page }, note: string) => {
	const noteTextarea = page.locator(
		'.note-area textarea[name$=".notes"][placeholder="Notes"]:not([aria-hidden="true"])',
	);

	await expect(noteTextarea).toBeVisible();
	await noteTextarea.fill(note);
	await expect(noteTextarea).toHaveValue(note);
});

When('I click on the {string} button', async ({ page }, button: string) => {
	const buttonElement = page.getByRole('button', { name: button });
	await expect(buttonElement).toBeVisible();
	await buttonElement.click();
});

When('I wait for the page fully loaded', async ({ page }) => {
	await page.waitForLoadState('networkidle');
});

When('I select the next date', async ({ page }) => {
	const dateElement = page.locator('[placeholder="EEEE, DD MMMM YYYY"]');

	await expect(dateElement).toBeVisible();
	await dateElement.click();

	const nextDate = new Date();
	nextDate.setDate(nextDate.getDate() + 1);
	nextDate.setHours(0, 0, 0, 0);

	const nextDateTimestamp = nextDate.getTime();
	const nextDateButton = page.locator(
		`button.MuiPickersDay-root[data-timestamp="${nextDateTimestamp}"]:not([disabled])`,
	);

	if (!(await nextDateButton.isVisible())) {
		const rightArrow = page.locator('[data-testid="ArrowRightIcon"]');

		await expect(rightArrow).toBeVisible();
		await rightArrow.click();
		await expect(nextDateButton).toBeVisible();
	}

	await nextDateButton.click();

	const formattedNextDate = `${nextDate.toLocaleDateString('en-US', {
		weekday: 'short',
	})}, ${nextDate.getDate()} ${nextDate.toLocaleDateString('en-US', {
		month: 'short',
	})} ${nextDate.getFullYear()}`;

	await expect(dateElement).toHaveValue(formattedNextDate);
});

When('I select the time slot {string}', async ({ page }, time: string) => {
	const timeSlotElement = page.locator(`.MuiGrid-item:has-text("${time}")`);

	await expect(timeSlotElement).toBeVisible();
	await timeSlotElement.click();
});

When('I fill the new customer phone', async ({ page }) => {
	const cellPhone = page.locator('input[name="cellPhone"]');
	const rawPhone = Math.floor(
		1000000000 + Math.random() * 9000000000,
	).toString();
	const formattedPhone = `(${rawPhone.substring(0, 3)}) ${rawPhone.substring(3, 6)}-${rawPhone.substring(6)}`;

	await cellPhone.fill(rawPhone);
	await expect(cellPhone).toHaveValue(formattedPhone);
});

When('I fill the first name {string}', async ({ page }, name: string) => {
	const firstNameInput = page.locator('input[name="firstName"]');
	await firstNameInput.click();
	await firstNameInput.fill(name, { force: true });
	await expect(firstNameInput).toHaveValue(name);
});

Then(
	'I should see the first name value {string}',
	async ({ page }, name: string) => {
		const firstName = page.locator('input[name="firstName"]:has-value');

		await expect(firstName).toHaveValue(name);
	},
);

When('I fill the last name {string}', async ({ page }, name: string) => {
	const lastName = page.locator('input[name="lastName"]');
	await lastName.click();
	await lastName.fill(name, { force: true });
	await expect(lastName).toHaveValue(name);
});

When('I enable google Captcha', async ({ page }) => {
	const googleCaptcha = page.locator('input[name="googleCaptcha"]');
	await expect(googleCaptcha).toBeVisible();
	await googleCaptcha.check({ force: true });
	await expect(googleCaptcha).toBeChecked();
});

Then('I should see the booked for next day', async ({ page }) => {
	const dateElement = page.locator('.customer-info');

	const nextDate = new Date();
	nextDate.setDate(nextDate.getDate() + 1);
	nextDate.setHours(0, 0, 0, 0);

	const formattedNextDate = `${nextDate.toLocaleDateString('en-US', {
		weekday: 'long',
	})}, ${nextDate.getDate()} ${nextDate.toLocaleDateString('en-US', {
		month: 'short',
	})} ${nextDate.getFullYear()}`;

	await expect(dateElement).toContainText(formattedNextDate);
});

Then(
	'I should see the booked appointment at {string}',
	async ({ page }, time: string) => {
		const timeElement = page.locator('.customer-info').getByText(time);
		await expect(timeElement).toBeVisible();
		await expect(timeElement).toContainText(time);
	},
);

Then(
	'I should see the fisrt name displayed {string}',
	async ({ page }, name: string) => {
		const firstName = page.locator('[name="firstName"]has-value');
		await expect(firstName).toBeVisible();
		await expect(firstName).toContainText(name);
	},
);
