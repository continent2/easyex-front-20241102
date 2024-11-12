import { z } from 'zod';

const environment = z.enum(['development', 'production']);
type Environment = z.infer<typeof environment>;

const appEnv = (process.env.NODE_ENV as Environment) || 'development';

const envSchema = z.object({
  appEnv: environment,
  appHost: z.string(),
  appPort: z.number(),
  appUrl: z.string(),
  appServerHost: z.string(),
  appServerPort: z.number(),
  appServerUrl: z.string(),
  netType: z.string(),
});

export const env = envSchema.parse({
  appEnv,
  appHost: process.env.REACT_APP_HOST,
  appPort: parseInt(process.env.REACT_APP_PORT as string, 10),
  appUrl: process.env.REACT_APP_URL,
  appServerHost: process.env.REACT_APP_SERVER_HOST,
  appServerPort: parseInt(process.env.REACT_APP_SERVER_PORT as string, 10),
  appServerUrl: process.env.REACT_APP_SERVER_URL,
  netType: process.env.REACT_APP_NET_TYPE,
});
