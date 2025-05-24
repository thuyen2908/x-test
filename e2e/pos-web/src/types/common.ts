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
	LOYALTY_BALANCE = 'LOYALTY_BALANCE',
	CLOSED_TICKETS = 'CLOSED_TICKETS',
	APPOINTMENT = 'APPOINTMENT',
	TICKET_ADJUSTMENT = 'TICKET_ADJUSTMENT',
	PAYROLL = 'PAYROLL',
	TURN_DETAILS = 'TURN_DETAILS',
	TICKET_PAYMENTS = 'TICKET_PAYMENTS',
}

export enum UserRole {
	ADMIN = 'ADMIN',
	// more roles go here
}
