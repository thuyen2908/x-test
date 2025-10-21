import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { constants } from '#const';
import { PageId } from '#types';

import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

/**
 * Navigate to the galaxy-in-pink homepage
 */
Given('I navigate to the galaxy-in-pink homepage', async ({ page }) => {
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
Then('the page should be loaded successfully', async ({ page }) => {
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

When('I fill the activation code {string}', async ({ page }, code: string) => {
	await page.locator('input[name="activationCode"]').fill(code);
});

Then(
	'I should see the text {string} visible',
	async ({ page }, text: string) => {
		await expect(page.getByText(text)).toBeVisible();
	},
);

When('I click on the {string} button', async ({ page }, button: string) => {
	const buttonElement = page.getByRole('button', { name: button });
	await expect(buttonElement).toBeVisible();
	await buttonElement.click();
});
