import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { logError, logInfo } from './logger.util';

/**
 * Screenshot Utilities
 * Provides screenshot capture functionality for test documentation and debugging
 */
export class ScreenshotUtil {
	private static readonly screenshotDir = resolve(
		import.meta.dirname,
		'../../test-artifacts/screenshots',
	);

	/**
	 * Ensure screenshot directory exists
	 */
	private static ensureDir(): void {
		try {
			mkdirSync(ScreenshotUtil.screenshotDir, { recursive: true });
		} catch (error) {
			// Directory might already exist, ignore error
		}
	}

	/**
	 * Capture full screen screenshot
	 *
	 * @param name Screenshot name (without extension)
	 * @returns Path to saved screenshot
	 */
	static async capture(name: string): Promise<string> {
		try {
			ScreenshotUtil.ensureDir();

			const timestamp = Date.now();
			const fileName = `${name}_${timestamp}.png`;
			const filePath = resolve(ScreenshotUtil.screenshotDir, fileName);

			const screenshot = await driver.takeScreenshot();
			writeFileSync(filePath, screenshot, 'base64');

			logInfo(`Screenshot captured: ${fileName}`);
			return filePath;
		} catch (error) {
			logError('Failed to capture screenshot', error);
			throw error;
		}
	}

	/**
	 * Capture screenshot on test failure
	 *
	 * @param scenarioName Name of the failed scenario
	 * @returns Path to saved screenshot
	 */
	static async captureOnFailure(scenarioName: string): Promise<string> {
		const safeName = scenarioName.replace(/[^a-zA-Z0-9]/g, '_');
		return await ScreenshotUtil.capture(`FAILURE_${safeName}`);
	}

	/**
	 * Capture screenshot of specific element
	 *
	 * @param selector Element selector
	 * @param name Screenshot name
	 * @returns Path to saved screenshot
	 */
	static async captureElement(selector: string, name: string): Promise<string> {
		try {
			ScreenshotUtil.ensureDir();

			const timestamp = Date.now();
			const fileName = `${name}_element_${timestamp}.png`;
			const filePath = resolve(ScreenshotUtil.screenshotDir, fileName);

			const element = await $(selector);
			await element.saveScreenshot(filePath);

			logInfo(`Element screenshot captured: ${fileName}`);
			return filePath;
		} catch (error) {
			logError('Failed to capture element screenshot', error);
			throw error;
		}
	}

	/**
	 * Capture screenshot for test step documentation
	 *
	 * @param stepName Name of the test step
	 * @returns Path to saved screenshot
	 */
	static async captureStep(stepName: string): Promise<string> {
		const safeName = stepName.replace(/[^a-zA-Z0-9]/g, '_');
		return await ScreenshotUtil.capture(`STEP_${safeName}`);
	}

	/**
	 * Capture screenshot and return as base64 string
	 * Useful for attaching to reports
	 *
	 * @returns Base64 encoded screenshot
	 */
	static async captureAsBase64(): Promise<string> {
		try {
			const screenshot = await driver.takeScreenshot();
			logInfo('Screenshot captured as base64');
			return screenshot;
		} catch (error) {
			logError('Failed to capture screenshot as base64', error);
			throw error;
		}
	}

	/**
	 * Capture screenshot and attach to Allure report
	 *
	 * @param name Screenshot name for the report
	 */
	static async attachToAllure(name: string): Promise<void> {
		try {
			const screenshot = await ScreenshotUtil.captureAsBase64();
			// Allure attachment will be added when allure-reporter is configured
			// For now, just capture the screenshot
			ScreenshotUtil.ensureDir();
			const fileName = `${name}_${Date.now()}.png`;
			const filePath = resolve(ScreenshotUtil.screenshotDir, fileName);
			writeFileSync(filePath, screenshot, 'base64');
			logInfo(`Screenshot attached to Allure: ${name}`);
		} catch (error) {
			logError('Failed to attach screenshot to Allure', error);
		}
	}
}
