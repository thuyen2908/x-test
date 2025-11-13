import { env } from '#config';
import { type WaitOptions } from '#types';

import { logDebug, logWarn } from '../logger.util';

/**
 * Explicit Wait Strategies
 * Provides robust waiting mechanisms for element and condition readiness
 */
export class ExplicitWait {
	private defaultTimeout: number;

	constructor(timeout?: number) {
		this.defaultTimeout = timeout || env.get('EXPLICIT_WAIT');
	}

	/**
	 * Wait for element to be displayed
	 *
	 * @param selector Element selector
	 * @param options Wait options
	 * @returns The element once it's displayed
	 */
	async forElement(
		selector: string,
		options?: WaitOptions,
	): Promise<WebdriverIO.Element> {
		const timeout = options?.timeout || this.defaultTimeout;
		const timeoutMsg =
			options?.timeoutMsg ||
			`Element not found: ${selector} within ${timeout}ms`;

		logDebug(`Waiting for element: ${selector}`, { timeout });

		const element = await $(selector);
		await element.waitForDisplayed({
			timeout,
			timeoutMsg,
			reverse: options?.reverse || false,
		});

		return element;
	}

	/**
	 * Wait for element to be clickable (displayed and enabled)
	 *
	 * @param selector Element selector
	 * @param options Wait options
	 * @returns The clickable element
	 */
	async forElementClickable(
		selector: string,
		options?: WaitOptions,
	): Promise<WebdriverIO.Element> {
		const timeout = options?.timeout || this.defaultTimeout;

		logDebug(`Waiting for clickable element: ${selector}`, { timeout });

		const element = await this.forElement(selector, options);
		await element.waitForEnabled({
			timeout,
			timeoutMsg: `Element not clickable: ${selector} within ${timeout}ms`,
		});

		return element;
	}

	/**
	 * Wait for element to disappear
	 *
	 * @param selector Element selector
	 * @param options Wait options
	 */
	async forElementToDisappear(
		selector: string,
		options?: WaitOptions,
	): Promise<void> {
		const timeout = options?.timeout || this.defaultTimeout;

		logDebug(`Waiting for element to disappear: ${selector}`, { timeout });

		const element = await $(selector);
		await element.waitForDisplayed({
			timeout,
			reverse: true,
			timeoutMsg: `Element still visible: ${selector} after ${timeout}ms`,
		});
	}

	/**
	 * Wait for element to be enabled
	 *
	 * @param selector Element selector
	 * @param options Wait options
	 */
	async forElementEnabled(
		selector: string,
		options?: WaitOptions,
	): Promise<WebdriverIO.Element> {
		const timeout = options?.timeout || this.defaultTimeout;

		logDebug(`Waiting for element to be enabled: ${selector}`, { timeout });

		const element = await $(selector);
		await element.waitForEnabled({
			timeout,
			timeoutMsg: `Element not enabled: ${selector} within ${timeout}ms`,
		});

		return element;
	}

	/**
	 * Wait for element to contain text
	 *
	 * @param selector Element selector
	 * @param text Expected text
	 * @param options Wait options
	 */
	async forElementText(
		selector: string,
		text: string,
		options?: WaitOptions,
	): Promise<void> {
		const timeout = options?.timeout || this.defaultTimeout;
		const interval = options?.interval || 500;

		logDebug(`Waiting for element text: ${selector} to contain "${text}"`, {
			timeout,
		});

		await driver.waitUntil(
			async () => {
				const element = await $(selector);
				const elementText = await element.getText();
				return elementText.includes(text);
			},
			{
				timeout,
				interval,
				timeoutMsg: `Element text does not contain "${text}" within ${timeout}ms`,
			},
		);
	}

	/**
	 * Wait for custom condition
	 *
	 * @param condition Condition function that returns boolean
	 * @param options Wait options
	 */
	async forCondition(
		condition: () => Promise<boolean> | boolean,
		options?: WaitOptions,
	): Promise<void> {
		const timeout = options?.timeout || this.defaultTimeout;
		const interval = options?.interval || 500;
		const timeoutMsg =
			options?.timeoutMsg || `Condition not met within ${timeout}ms`;

		logDebug('Waiting for custom condition', { timeout, interval });

		await driver.waitUntil(condition, {
			timeout,
			interval,
			timeoutMsg,
		});
	}

	/**
	 * Wait for elements to have specific count
	 *
	 * @param selector Element selector
	 * @param count Expected count
	 * @param options Wait options
	 */
	async forElementCount(
		selector: string,
		count: number,
		options?: WaitOptions,
	): Promise<void> {
		const timeout = options?.timeout || this.defaultTimeout;
		const interval = options?.interval || 500;

		logDebug(`Waiting for ${count} elements: ${selector}`, { timeout });

		await driver.waitUntil(
			async () => {
				const elements = await $$(selector);
				return elements.length === count;
			},
			{
				timeout,
				interval,
				timeoutMsg: `Expected ${count} elements matching ${selector} within ${timeout}ms`,
			},
		);
	}

	/**
	 * Wait with retry logic
	 * Attempts an action multiple times before failing
	 *
	 * @param action Action to retry
	 * @param maxRetries Maximum number of retries
	 * @param delayMs Delay between retries in milliseconds
	 */
	async withRetry<T>(
		action: () => Promise<T>,
		maxRetries: number = 3,
		delayMs: number = 1000,
	): Promise<T> {
		let lastError: Error | unknown;

		for (let attempt = 1; attempt <= maxRetries; attempt++) {
			try {
				logDebug(`Attempt ${attempt}/${maxRetries}`);
				return await action();
			} catch (error) {
				lastError = error;
				logWarn(`Attempt ${attempt}/${maxRetries} failed`, { error });

				if (attempt < maxRetries) {
					await driver.pause(delayMs);
				}
			}
		}

		throw new Error(`Action failed after ${maxRetries} attempts: ${lastError}`);
	}

	/**
	 * Simple pause utility
	 *
	 * @param milliseconds Time to pause in milliseconds
	 */
	async pause(milliseconds: number): Promise<void> {
		logDebug(`Pausing for ${milliseconds}ms`);
		await driver.pause(milliseconds);
	}
}
