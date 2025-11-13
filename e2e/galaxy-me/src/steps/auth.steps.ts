import { Given, Then, When } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

import { getLoginScreen } from '#screens';
import { logAssertion, logStep } from '#utils';

/**
 * Authentication Step Definitions
 * Implements Cucumber steps for login, signup, and logout flows
 */

/* ========================================================================
 * Given Steps - Setup/Preconditions
 * ======================================================================== */

Given('the Galaxy Me app is launched', async () => {
	logStep('Launching Galaxy Me app');
	// App is automatically launched by Appium based on capabilities
	await driver.pause(2000); // Wait for app to initialize
});

Given('I am on the login screen', async () => {
	logStep('Verifying login screen is displayed');
	const loginScreen = getLoginScreen();
	await loginScreen.waitForLoad();

	const isDisplayed = await loginScreen.isDisplayed();
	logAssertion('Login screen is displayed', isDisplayed);
	expect(isDisplayed).toBe(true);
});

/* ========================================================================
 * When Steps - Actions
 * ======================================================================== */

When('I enter username {string}', async (username: string) => {
	logStep(`Entering username: ${username}`);
	const loginScreen = getLoginScreen();
	await loginScreen.enterUsername(username);
});

When('I enter password {string}', async (password: string) => {
	logStep('Entering password');
	const loginScreen = getLoginScreen();
	await loginScreen.enterPassword(password);
});

When('I tap the login button', async () => {
	logStep('Tapping login button');
	const loginScreen = getLoginScreen();
	await loginScreen.tapLoginButton();
});

When('I tap the forgot password link', async () => {
	logStep('Tapping forgot password link');
	const loginScreen = getLoginScreen();
	await loginScreen.tapForgotPassword();
});

When('I tap the signup link', async () => {
	logStep('Tapping signup link');
	const loginScreen = getLoginScreen();
	await loginScreen.tapSignup();
});

When(
	'I perform complete login with {string} and {string}',
	async (username: string, password: string) => {
		logStep(`Performing complete login for: ${username}`);
		const loginScreen = getLoginScreen();
		await loginScreen.login(username, password);
	},
);

/* ========================================================================
 * Then Steps - Assertions
 * ======================================================================== */

Then('I should see the login screen', async () => {
	logStep('Verifying login screen is visible');
	const loginScreen = getLoginScreen();
	const isDisplayed = await loginScreen.isDisplayed();

	logAssertion('Login screen is displayed', isDisplayed);
	expect(isDisplayed).toBe(true);
});

Then('I should remain on the login screen', async () => {
	logStep('Verifying still on login screen');
	const loginScreen = getLoginScreen();

	// Wait a moment for any navigation attempts
	await driver.pause(1000);

	const isDisplayed = await loginScreen.isDisplayed();
	logAssertion('Still on login screen', isDisplayed);
	expect(isDisplayed).toBe(true);
});

Then('I should see error message {string}', async (expectedMessage: string) => {
	logStep(`Verifying error message: ${expectedMessage}`);
	const loginScreen = getLoginScreen();

	const hasError = await loginScreen.hasErrorMessage();
	expect(hasError).toBe(true);

	const actualMessage = await loginScreen.getErrorMessage();
	logAssertion(
		`Error message contains expected text`,
		actualMessage.includes(expectedMessage),
	);
	expect(actualMessage).toContain(expectedMessage);
});

Then(
	'I should see validation error {string}',
	async (expectedError: string) => {
		logStep(`Verifying validation error: ${expectedError}`);
		const loginScreen = getLoginScreen();

		const hasError = await loginScreen.hasErrorMessage();
		logAssertion('Validation error is displayed', hasError);
		expect(hasError).toBe(true);

		const actualMessage = await loginScreen.getErrorMessage();
		expect(actualMessage).toContain(expectedError);
	},
);
