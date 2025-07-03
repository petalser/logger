interface LoggerMeta {
  [key: string]: any;
}

/**
  * Logger class for standardized logging.
  * @class
  * @method initialize
  * @method info
  */
declare class Logger {
  /**
   * Initialize logger with folder path for logs (optional).
   * If not provided, logs only to console
   * E.g. Logger.initialize('./logs')
   * @param {string} [logFolder] - Enables file logging if provided.
   */
  static initialize(logFolder?: string): void;
  /**
  * Logs provided message to console
  * If Logger initialized, updates "./your-logs-path/info/info-xxx" file
  * @param {string} message - Enables file logging if provided.
  * @param {LoggerMeta} [meta] - Optional object with your information.
  */
  static info(message: string, meta?: LoggerMeta): void;

  /**
  * Logs information about request and response.
  * If Logger initialized, updates "./your-logs-path/request/request-xxx" file.
  * @param {string} baseUrl - Basic request url (e.g. "/users").
  * @param {string} method - Request method (e.g. GET, POST).
  * @param {string} responseResultString - Custom text, describing result
  * of request processing. E.g. "Failed, wrong password" or "Ok".
  * @param {number} responseStatusCode - Response status code.
  * @param {unknown} [body] - Optional request body.
  * @param {unknown} [responseData] - Optional response data.
  */
  static logRequest(baseUrl: string, method: string, body?: unknown, responseResultString: string, responseStatusCode: number, responseData?: unknown): void

  /**
  * Logs provided message to console
  * If Logger initialized, updates "./your-logs-path/info/error-xxx" file
  * @param {string} message - Enables file logging if provided.
  * @param {LoggerMeta} [meta] - Optional object with your information.
  * @param {unknown} error - Error object, most likely of type Error.
  */
  static error(message: string, error: unknown, meta?: LoggerMeta): void;
}

export = Logger;