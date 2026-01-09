import 'dotenv/config';
import { envSchema } from '../schemas/env.schema';
import { formatZodError } from '../utils/zod';

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error('ERROR!: ', formatZodError(error));
  process.exit(1);
}

const ENV = data;

const { PORT } = ENV;
const isDev = ENV.ENV === 'dev';

export { ENV, PORT, isDev };

export default ENV;
