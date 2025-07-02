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
    * Logs provided message to console
    * If Logger initialized, updates "./your-logs-path/info/error-xxx" file
    * @param {string} message - Enables file logging if provided.
    * @param {LoggerMeta} [meta] - Optional object with your information.
    */
    static error(message: string, meta?: LoggerMeta): void;
}

export = Logger;