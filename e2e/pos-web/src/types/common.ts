export type Browser = 'chrome' | 'edge';

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface TestOptions {
	timeout?: number;
}

/**
 * Page identifiers
 */
export enum PageId {
	HOME = 'HOME',
	LOGIN = 'LOGIN',
	TICKET_VIEW = 'TICKET_VIEW',
	WAITING_LIST = 'WAITING_LIST',
	GIFT_CARD_BALANCE = 'GIFT_CARD_BALANCE',
}

export enum UserRole {
	ADMIN = 'ADMIN',
	// more roles go here
}
