import pino from 'pino';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export const log = {
  debug: (message: string, data?: unknown) => logger.debug(data, message),
  info: (message: string, data?: unknown) => logger.info(data, message),
  warn: (message: string, data?: unknown) => logger.warn(data, message),
  error: (message: string, data?: unknown) => logger.error(data, message),
  fatal: (message: string, data?: unknown) => logger.fatal(data, message),
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
