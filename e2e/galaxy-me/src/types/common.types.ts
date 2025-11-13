/**
 * Common Type Definitions for Galaxy Me E2E Testing
 */

/**
 * Supported mobile platforms
 */
export type Platform = 'android' | 'ios';

/**
 * Test execution environment
 */
export type Environment = 'dev' | 'staging' | 'production';

/**
 * User roles in the application
 */
export enum UserRole {
	ADMIN = 'ADMIN',
	CUSTOMER = 'CUSTOMER',
	TECHNICIAN = 'TECHNICIAN',
}

/**
 * Test execution status
 */
export type TestStatus = 'passed' | 'failed' | 'skipped' | 'pending';

/**
 * Screen/Page identifiers
 */
export enum ScreenId {
	// Authentication
	LOGIN = 'LOGIN',
	SIGNUP = 'SIGNUP',
	FORGOT_PASSWORD = 'FORGOT_PASSWORD',

	// Main Navigation
	HOME = 'HOME',
	PROFILE = 'PROFILE',
	SETTINGS = 'SETTINGS',

	// Appointment
	APPOINTMENT_LIST = 'APPOINTMENT_LIST',
	APPOINTMENT_DETAIL = 'APPOINTMENT_DETAIL',
	BOOK_APPOINTMENT = 'BOOK_APPOINTMENT',

	// Customer
	CUSTOMER_LIST = 'CUSTOMER_LIST',
	CUSTOMER_DETAIL = 'CUSTOMER_DETAIL',

	// Other screens (to be expanded)
}

/**
 * Selector definition with platform-specific values
 */
export interface Selector {
	android?: string;
	ios?: string;
}

/**
 * Element definition
 */
export interface ElementDefinition {
	selector: Selector;
	name: string;
	description?: string;
}

/**
 * Gesture types
 */
export type GestureType =
	| 'tap'
	| 'doubleTap'
	| 'longPress'
	| 'swipe'
	| 'scroll'
	| 'pinch'
	| 'zoom';

/**
 * Swipe direction
 */
export type SwipeDirection = 'up' | 'down' | 'left' | 'right';

/**
 * Device orientation
 */
export type DeviceOrientation = 'portrait' | 'landscape';

/**
 * Network connection type
 */
export type NetworkType = 'wifi' | '4g' | '3g' | '2g' | 'airplane' | 'offline';

/**
 * Test data category
 */
export type TestDataCategory =
	| 'users'
	| 'appointments'
	| 'customers'
	| 'services'
	| 'payments';

/**
 * Log level
 */
export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'verbose';

/**
 * Test execution options
 */
export interface TestOptions {
	timeout?: number;
	retries?: number;
	parallel?: boolean;
	tags?: string[];
	platform?: Platform;
	environment?: Environment;
}

/**
 * Screenshot options
 */
export interface ScreenshotOptions {
	name?: string;
	fullPage?: boolean;
	quality?: number;
}

/**
 * Wait options
 */
export interface WaitOptions {
	timeout?: number;
	interval?: number;
	timeoutMsg?: string;
	reverse?: boolean;
}

/**
 * Coordinate for tap/swipe gestures
 */
export interface Coordinate {
	x: number;
	y: number;
}

/**
 * Size dimensions
 */
export interface Size {
	width: number;
	height: number;
}

/**
 * Element bounding box
 */
export interface ElementBox {
	x: number;
	y: number;
	width: number;
	height: number;
}

/**
 * Test result
 */
export interface TestResult {
	name: string;
	status: TestStatus;
	duration: number;
	error?: string;
	screenshots?: string[];
	logs?: string[];
}

/**
 * Test suite result
 */
export interface TestSuiteResult {
	name: string;
	total: number;
	passed: number;
	failed: number;
	skipped: number;
	duration: number;
	tests: TestResult[];
}
