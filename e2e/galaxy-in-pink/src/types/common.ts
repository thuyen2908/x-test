export type Browser = 'chrome' | 'edge';

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface TestOptions {
	timeout?: number;
}

/**
 * Page identifiers for galaxy-in-pink application
 */
export enum PageId {
	HOME = 'HOME',
	// Add more page identifiers as needed
}
