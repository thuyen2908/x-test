/**
 * Test Data Type Definitions
 */

import { type UserRole } from './common.types';

/**
 * User credentials for authentication
 */
export interface UserCredentials {
	email: string;
	password: string;
	role: UserRole;
}

/**
 * Complete user profile data
 */
export interface TestUser {
	id?: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phone: string;
	role: UserRole;
	isActive?: boolean;
}

/**
 * Appointment data for testing
 */
export interface AppointmentData {
	id?: string;
	customerId?: string;
	customerName: string;
	serviceId: string;
	serviceName: string;
	technicianId?: string;
	technicianName: string;
	date: string;
	time: string;
	duration: number; // in minutes
	status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
	notes?: string;
}

/**
 * Service data
 */
export interface ServiceData {
	id?: string;
	name: string;
	description?: string;
	duration: number; // in minutes
	price: number;
	category?: string;
	isActive?: boolean;
}

/**
 * Customer data
 */
export interface CustomerData {
	id?: string;
	firstName: string;
	lastName: string;
	email?: string;
	phone: string;
	address?: string;
	notes?: string;
	loyaltyPoints?: number;
}

/**
 * Payment data
 */
export interface PaymentData {
	id?: string;
	amount: number;
	method: 'cash' | 'card' | 'gift_card' | 'loyalty';
	status?: 'pending' | 'completed' | 'failed';
	transactionId?: string;
	cardLast4?: string;
}

/**
 * Environment configuration data
 */
export interface EnvironmentData {
	name: 'dev' | 'staging' | 'production';
	apiBaseUrl: string;
	webBaseUrl: string;
	features: {
		paymentEnabled: boolean;
		appointmentBooking: boolean;
		pushNotifications: boolean;
		[key: string]: boolean;
	};
	timeout: {
		default: number;
		extended: number;
	};
}

/**
 * Test fixture data
 */
export interface TestFixture {
	users: Record<string, TestUser>;
	appointments: Record<string, AppointmentData>;
	services: Record<string, ServiceData>;
	customers: Record<string, CustomerData>;
}
