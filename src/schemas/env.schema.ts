import z from 'zod';
import { ENV_CONSTS } from '../constants/env.constants';

const transformToArray = (str: string) =>
  str
    .split(',')
    .map((url: string) => url.trim())
    .filter(Boolean);

const envSchema = z.object({
  PORT: z.number().optional().default(8000).describe('PORT to run on'),
  ENV: z
    .enum(ENV_CONSTS)
    .optional()
    .default('dev')
    .describe('which env running?'),
  // GOOGLE_API_KEY: z.string(),
  MONGO_URI: z.url(),
  FRONEND_URLS: z
    .string()
    .refine((value) => {
      const urlArray = transformToArray(value);

      const invalidUrls = urlArray.filter((url) => {
        try {
          z.url().parse(url);
          return false;
        } catch (e: unknown) {
          return (e as z.ZodError).message;
        }
      });
      return invalidUrls.length === 0;
    })
    .transform((value) => transformToArray(value)),
});

type EnvType = z.infer<typeof envSchema>;

export type { EnvType };

export { envSchema };
