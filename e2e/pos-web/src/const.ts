import { env } from './env';
import { PageId } from './typings';

/**
 * An utility class, which contains all the constants used in our project
 */
export class Const {
	/**
	 * Get the authentication storage path for each role
	 */
	public get AuthStorage() {
		return {
			user: 'test-artifacts/.auth/user.json',
		};
	}

	/**
	 * Retrieve a mapping between page identifiers and their URLs
	 */
	public get PageUrl() {
		const baseURL = env.baseURL;

		return {
			[PageId.HOME]: baseURL,
			[PageId.LOGIN]: `${baseURL}/login`,
		} satisfies Record<PageId, string>;
	}
}

export const constants = new Const();
