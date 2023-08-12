import { isProduction } from '@/config/constants';
import ServerError from '@/types/error';

namespace log {
  type LogTag = 'info' | 'warn' | 'error';

  const log = (message: any, title: string = 'main', tag: LogTag = 'info') => {
    if (isProduction) return;
    const tags = {
      info: '\x1b[32m[INFO]\x1b[0m',
      warn: '\x1b[33m[WARN]\x1b[0m',
      error: '\x1b[31m[ERROR]\x1b[0m',
    };
    console.log(`${tags[tag]} [${title.toUpperCase()}] ${message}`);
  };

  export const info = (message: any, title: string = 'success') => {
    log(message, title, 'info');
  };

  export const warn = (message: any, title: string = 'warn') => {
    log(message, title, 'warn');
  };

  export const error = (message: any, title: string = 'error') => {
    log(message, title, 'error');
  };

  export const exception = (error: unknown, title: string = 'error') => {
    log(ServerError.from(error).message, title, 'error');
  };
}

export default log;
