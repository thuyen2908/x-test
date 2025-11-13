import { SelectorHelper } from '#helpers';
import { type Selector, type WaitOptions } from '#types';
import { ExplicitWait, logDebug, logInfo } from '#utils';

/**
 * Base Screen Object
 * Abstract class that all screen objects inherit from
 * Provides common functionality for interacting with mobile screens
 */
export abstract class BaseScreen {
	protected wait: ExplicitWait;

	constructor() {
		this.wait = new ExplicitWait();
	}

	/**
	 * Get platform-specific selector
	 * Must be implemented by platform-specific base classes
	 */
	protected abstract getSelector(id: string): Selector;

	/**
	 * Find element with explicit wait
	 *
	 * @param selector Element selector (string or Selector object)
	 * @param options Wait options
	 * @returns WebdriverIO element
	 */
	protected async findElement(
		selector: Selector | string,
		options?: WaitOptions,
	): Promise<WebdriverIO.Element> {
		const actualSelector = SelectorHelper.getSelector(selector);
		return await this.wait.forElement(actualSelector, options);
	}

	/**
	 * Find multiple elements
	 *
	 * @param selector Element selector
	 * @returns Array of WebdriverIO elements
	 */
	protected async findElements(
		selector: Selector | string,
	): Promise<WebdriverIO.ElementArray> {
		const actualSelector = SelectorHelper.getSelector(selector);
		const elements = await $$(actualSelector);
		logDebug(`Found ${elements.length} elements matching: ${actualSelector}`);
		return elements;
	}

	/**
	 * Tap/click an element
	 *
	 * @param selector Element selector
	 * @param options Wait options
	 */
	protected async tap(
		selector: Selector | string,
		options?: WaitOptions,
	): Promise<void> {
		const actualSelector = SelectorHelper.getSelector(selector);
		logInfo(`Tapping element: ${actualSelector}`);

		const element = await this.wait.forElementClickable(
			actualSelector,
			options,
		);
		await element.click();

		logDebug('Element tapped successfully');
	}

	/**
	 * Enter text into an input field
	 *
	 * @param selector Element selector
	 * @param text Text to enter
	 * @param options Wait options
	 */
	protected async enterText(
		selector: Selector | string,
		text: string,
		options?: WaitOptions,
	): Promise<void> {
		const actualSelector = SelectorHelper.getSelector(selector);
		logInfo(`Entering text into: ${actualSelector}`);

		const element = await this.findElement(selector, options);
		await element.clearValue();
		await element.setValue(text);

		logDebug(`Text entered successfully: ${text.substring(0, 20)}...`);
	}

	/**
	 * Get text from an element
	 *
	 * @param selector Element selector
	 * @param options Wait options
	 * @returns Element text content
	 */
	protected async getText(
		selector: Selector | string,
		options?: WaitOptions,
	): Promise<string> {
		const element = await this.findElement(selector, options);
		const text = await element.getText();
		logDebug(`Got text from element: ${text}`);
		return text;
	}

	/**
	 * Check if element is visible
	 *
	 * @param selector Element selector
	 * @returns True if element is displayed
	 */
	protected async isVisible(selector: Selector | string): Promise<boolean> {
		try {
			const actualSelector = SelectorHelper.getSelector(selector);
			const element = await $(actualSelector);
			const isDisplayed = await element.isDisplayed();
			logDebug(`Element visibility check: ${actualSelector} = ${isDisplayed}`);
			return isDisplayed;
		} catch (error) {
			logDebug('Element not found or not visible', { error });
			return false;
		}
	}

	/**
	 * Check if element is enabled
	 *
	 * @param selector Element selector
	 * @returns True if element is enabled
	 */
	protected async isEnabled(selector: Selector | string): Promise<boolean> {
		try {
			const element = await this.findElement(selector);
			return await element.isEnabled();
		} catch (error) {
			logDebug('Element not found or not enabled', { error });
			return false;
		}
	}

	/**
	 * Wait for element to be visible
	 *
	 * @param selector Element selector
	 * @param options Wait options
	 */
	protected async waitForVisible(
		selector: Selector | string,
		options?: WaitOptions,
	): Promise<void> {
		const actualSelector = SelectorHelper.getSelector(selector);
		await this.wait.forElement(actualSelector, options);
	}

	/**
	 * Wait for element to disappear
	 *
	 * @param selector Element selector
	 * @param options Wait options
	 */
	protected async waitForHidden(
		selector: Selector | string,
		options?: WaitOptions,
	): Promise<void> {
		const actualSelector = SelectorHelper.getSelector(selector);
		await this.wait.forElementToDisappear(actualSelector, options);
	}

	/**
	 * Scroll to element
	 *
	 * @param selector Element selector
	 */
	protected async scrollToElement(selector: Selector | string): Promise<void> {
		const element = await this.findElement(selector);
		await element.scrollIntoView();
		logInfo('Scrolled to element');
	}

	/**
	 * Get element attribute
	 *
	 * @param selector Element selector
	 * @param attributeName Attribute name
	 * @returns Attribute value
	 */
	protected async getAttribute(
		selector: Selector | string,
		attributeName: string,
	): Promise<string | null> {
		const element = await this.findElement(selector);
		return await element.getAttribute(attributeName);
	}

	/**
	 * Check if element exists in DOM (doesn't need to be visible)
	 *
	 * @param selector Element selector
	 * @returns True if element exists
	 */
	protected async exists(selector: Selector | string): Promise<boolean> {
		try {
			const actualSelector = SelectorHelper.getSelector(selector);
			const element = await $(actualSelector);
			return await element.isExisting();
		} catch (error) {
			return false;
		}
	}

	/**
	 * Wait for screen to fully load
	 * Must be implemented by concrete screen classes
	 */
	abstract waitForLoad(): Promise<void>;

	/**
	 * Verify screen is displayed
	 * Must be implemented by concrete screen classes
	 */
	abstract isDisplayed(): Promise<boolean>;

	/**
	 * Get screen name for logging
	 * Can be overridden by concrete screen classes
	 */
	getScreenName(): string {
		return this.constructor.name;
	}
}
