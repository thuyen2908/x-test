import { PlatformHelper } from '#helpers';
import { type Selector } from '#types';
import { logAction, logInfo } from '#utils';

import { AndroidScreen } from '../base/AndroidScreen';
import { IosScreen } from '../base/IosScreen';

/**
 * Login Screen - Android Implementation
 */
class LoginScreenAndroid extends AndroidScreen {
	// Android-specific selectors (update these based on actual app)
	private selectors = {
		usernameInput: {
			android: 'com.xsofts.galaxyme:id/username_input',
			ios: '',
		} as Selector,
		passwordInput: {
			android: 'com.xsofts.galaxyme:id/password_input',
			ios: '',
		} as Selector,
		loginButton: {
			android: 'com.xsofts.galaxyme:id/login_button',
			ios: '',
		} as Selector,
		errorMessage: {
			android: 'com.xsofts.galaxyme:id/error_text',
			ios: '',
		} as Selector,
		forgotPasswordLink: {
			android: 'com.xsofts.galaxyme:id/forgot_password',
			ios: '',
		} as Selector,
		signupLink: {
			android: 'com.xsofts.galaxyme:id/signup_link',
			ios: '',
		} as Selector,
	};

	/**
	 * Enter username/email
	 */
	async enterUsername(username: string): Promise<void> {
		logAction(`Entering username: ${username}`);
		await this.enterText(this.selectors.usernameInput, username);
	}

	/**
	 * Enter password
	 */
	async enterPassword(password: string): Promise<void> {
		logAction('Entering password');
		await this.enterText(this.selectors.passwordInput, password);
	}

	/**
	 * Tap login button
	 */
	async tapLoginButton(): Promise<void> {
		logAction('Tapping login button');
		await this.tap(this.selectors.loginButton);
	}

	/**
	 * Get error message text
	 */
	async getErrorMessage(): Promise<string> {
		return await this.getText(this.selectors.errorMessage);
	}

	/**
	 * Check if error message is displayed
	 */
	async hasErrorMessage(): Promise<boolean> {
		return await this.isVisible(this.selectors.errorMessage);
	}

	/**
	 * Tap forgot password link
	 */
	async tapForgotPassword(): Promise<void> {
		logAction('Tapping forgot password link');
		await this.tap(this.selectors.forgotPasswordLink);
	}

	/**
	 * Tap signup link
	 */
	async tapSignup(): Promise<void> {
		logAction('Tapping signup link');
		await this.tap(this.selectors.signupLink);
	}

	/**
	 * Perform complete login flow
	 */
	async login(username: string, password: string): Promise<void> {
		logInfo('Performing login');
		await this.enterUsername(username);
		await this.enterPassword(password);
		await this.hideKeyboard();
		await this.tapLoginButton();
	}

	/**
	 * Wait for login screen to load
	 */
	async waitForLoad(): Promise<void> {
		await this.waitForVisible(this.selectors.loginButton, { timeout: 30000 });
	}

	/**
	 * Check if login screen is displayed
	 */
	async isDisplayed(): Promise<boolean> {
		return await this.isVisible(this.selectors.loginButton);
	}
}

/**
 * Login Screen - iOS Implementation
 */
class LoginScreenIOS extends IosScreen {
	// iOS-specific selectors (update these based on actual app)
	private selectors = {
		usernameInput: {
			android: '',
			ios: 'usernameInput',
		} as Selector,
		passwordInput: {
			android: '',
			ios: 'passwordInput',
		} as Selector,
		loginButton: {
			android: '',
			ios: 'loginButton',
		} as Selector,
		errorMessage: {
			android: '',
			ios: 'errorMessage',
		} as Selector,
		forgotPasswordLink: {
			android: '',
			ios: 'forgotPassword',
		} as Selector,
		signupLink: {
			android: '',
			ios: 'signupLink',
		} as Selector,
	};

	/**
	 * Enter username/email
	 */
	async enterUsername(username: string): Promise<void> {
		logAction(`Entering username: ${username}`);
		await this.enterText(this.selectors.usernameInput, username);
	}

	/**
	 * Enter password
	 */
	async enterPassword(password: string): Promise<void> {
		logAction('Entering password');
		await this.enterText(this.selectors.passwordInput, password);
	}

	/**
	 * Tap login button
	 */
	async tapLoginButton(): Promise<void> {
		logAction('Tapping login button');
		await this.tap(this.selectors.loginButton);
	}

	/**
	 * Get error message text
	 */
	async getErrorMessage(): Promise<string> {
		return await this.getText(this.selectors.errorMessage);
	}

	/**
	 * Check if error message is displayed
	 */
	async hasErrorMessage(): Promise<boolean> {
		return await this.isVisible(this.selectors.errorMessage);
	}

	/**
	 * Tap forgot password link
	 */
	async tapForgotPassword(): Promise<void> {
		logAction('Tapping forgot password link');
		await this.tap(this.selectors.forgotPasswordLink);
	}

	/**
	 * Tap signup link
	 */
	async tapSignup(): Promise<void> {
		logAction('Tapping signup link');
		await this.tap(this.selectors.signupLink);
	}

	/**
	 * Perform complete login flow
	 */
	async login(username: string, password: string): Promise<void> {
		logInfo('Performing login');
		await this.enterUsername(username);
		await this.enterPassword(password);
		await this.tapLoginButton();
	}

	/**
	 * Wait for login screen to load
	 */
	async waitForLoad(): Promise<void> {
		await this.waitForVisible(this.selectors.loginButton, { timeout: 30000 });
	}

	/**
	 * Check if login screen is displayed
	 */
	async isDisplayed(): Promise<boolean> {
		return await this.isVisible(this.selectors.loginButton);
	}
}

/**
 * Factory function to get the appropriate LoginScreen based on platform
 *
 * @returns Platform-specific LoginScreen instance
 */
export function getLoginScreen(): LoginScreenAndroid | LoginScreenIOS {
	return PlatformHelper.isAndroid()
		? new LoginScreenAndroid()
		: new LoginScreenIOS();
}

// Type for LoginScreen (union of both implementations)
export type LoginScreen = LoginScreenAndroid | LoginScreenIOS;
