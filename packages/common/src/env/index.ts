import invariant from 'tiny-invariant';
import z from 'zod';

const defaultEnvSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'ci', 'staging', 'production'])
		.default('development'),
});

type ProcessEnvType = z.infer<typeof defaultEnvSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends ProcessEnvType {}
	}
}

/**
 * An utility class to safely parse and access environment variables
 */
export class Env<TSchema extends z.ZodObject = z.ZodObject> {
	/**
	 * The final environment schema
	 */
	private readonly envSchema;

	constructor(
		/**
		 * Extend the default environment schema with the given one, by intersecting them
		 */
		schema: TSchema,
	) {
		this.envSchema = z.intersection(defaultEnvSchema, schema);
	}

	/**
	 * Safely parse environment variables using the given zod schema,
	 *   if the parsing fails, an error will be thrown
	 */
	protected parseEnv() {
		const parsedEnv = this.envSchema.safeParse(process.env);

		invariant(parsedEnv.success, 'Invalid environment variables');

		return parsedEnv.data;
	}

	/**
	 * Access the environment variable value by its key
	 */
	public get<
		K extends keyof z.infer<
			z.ZodIntersection<typeof defaultEnvSchema, TSchema>
		>,
	>(key: K) {
		const parsedEnv = this.parseEnv();

		return parsedEnv[key];
	}
}
