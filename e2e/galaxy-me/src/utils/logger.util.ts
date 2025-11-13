import { resolve } from 'node:path';

import winston from 'winston';

import { env } from '#config';

const __dirname = import.meta.dirname;
const logDir = resolve(__dirname, '../../test-artifacts/logs');

/**
 * Winston Logger Configuration
 * Provides structured logging with multiple transports
 */
export const logger = winston.createLogger({
	level: env.get('LOG_LEVEL'),
	format: winston.format.combine(
		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json(),
	),
	defaultMeta: { service: 'galaxy-me-e2e' },
	transports: [
		// Error logs - separate file for errors only
		new winston.transports.File({
			filename: resolve(logDir, 'error.log'),
			level: 'error',
			maxsize: 5242880, // 5MB
			maxFiles: 5,
		}),
		// Combined logs - all log levels
		new winston.transports.File({
			filename: resolve(logDir, 'combined.log'),
			maxsize: 5242880, // 5MB
			maxFiles: 5,
		}),
		// Console output with colors
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.printf(({ timestamp, level, message, ...meta }) => {
					const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
					return `${timestamp} [${level}]: ${message} ${metaStr}`;
				}),
			),
		}),
	],
});

/**
 * Log info message
 */
export const logInfo = (
	message: string,
	meta?: Record<string, unknown>,
): void => {
	logger.info(message, meta);
};

/**
 * Log error message
 */
export const logError = (message: string, error?: Error | unknown): void => {
	if (error instanceof Error) {
		logger.error(message, {
			error: error.message,
			stack: error.stack,
			name: error.name,
		});
	} else {
		logger.error(message, { error });
	}
};

/**
 * Log debug message
 */
export const logDebug = (
	message: string,
	meta?: Record<string, unknown>,
): void => {
	logger.debug(message, meta);
};

/**
 * Log warning message
 */
export const logWarn = (
	message: string,
	meta?: Record<string, unknown>,
): void => {
	logger.warn(message, meta);
};

/**
 * Log verbose message (detailed debugging)
 */
export const logVerbose = (
	message: string,
	meta?: Record<string, unknown>,
): void => {
	logger.verbose(message, meta);
};

/**
 * Create a child logger with additional metadata
 * Useful for adding context to logs from specific components
 *
 * @example
 * const screenLogger = createChildLogger({ screen: 'LoginScreen' });
 * screenLogger.info('User logged in');
 */
export const createChildLogger = (
	defaultMeta: Record<string, unknown>,
): winston.Logger => {
	return logger.child(defaultMeta);
};

/**
 * Log test step
 */
export const logStep = (
	step: string,
	details?: Record<string, unknown>,
): void => {
	logger.info(`📌 ${step}`, details);
};

/**
 * Log test action
 */
export const logAction = (
	action: string,
	details?: Record<string, unknown>,
): void => {
	logger.info(`🎬 ${action}`, details);
};

/**
 * Log test assertion
 */
export const logAssertion = (assertion: string, result: boolean): void => {
	const emoji = result ? '✅' : '❌';
	logger.info(`${emoji} ${assertion}`, { passed: result });
};
