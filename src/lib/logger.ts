import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
  base: {
    env: process.env.NODE_ENV,
  },
});

export const log = {
  info: (message: string, data?: any) => logger.info(data, message),
  warn: (message: string, data?: any) => logger.warn(data, message),
  error: (message: string, data?: any) => logger.error(data, message),
  debug: (message: string, data?: any) => logger.debug(data, message),
};

// Intercepta console.log e redireciona para o logger
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.log = (...args) => {
  log.info(args[0], args.slice(1));
  originalConsoleLog.apply(console, args);
};

console.warn = (...args) => {
  log.warn(args[0], args.slice(1));
  originalConsoleWarn.apply(console, args);
};

console.error = (...args) => {
  log.error(args[0], args.slice(1));
  originalConsoleError.apply(console, args);
};

export default logger;
