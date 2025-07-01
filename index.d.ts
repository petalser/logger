
// declare class Logger {
//     /**
//      * Logs a message with a timestamp and a flag.
//      * @param message - The log message.
//      * @param flag - A label for the log type. Defaults to 'INFO'.
//      * @param meta - Optional metadata object with extra info.
//      */
//     static info(message: string, flag?: string, meta?: Record<string, any>): void;
// }

// export = Logger;

interface LoggerMeta {
    [key: string]: any;
}

/**
//  * Logger class for standardized logging.
//  * 
//  * @class
//  * 
//  * @method initialize
//  * @method info
//  */
declare class Logger {
    /**
     * Initialize logger with folder path for logs (optional).
     * If not provided, logs only to console
     * @param {string} [logFolder] - Enables file logging if provided.
     */
    static initialize(logFolder?: string): void;
    /**
    * Logs provided message to console
    * If Logger initialized, updates "info-xxx" file
    * @param {string} message - Enables file logging if provided.
    * @param {LoggerMeta} [meta] - Optional object with your information.
    */
    static info(message: string, meta?: LoggerMeta): void;
    /**
    * Logs provided message to console
    * If Logger initialized, updates "error-xxx" file
    * @param {string} message - Enables file logging if provided.
    * @param {LoggerMeta} [meta] - Optional object with your information.
    */
    static error(message: string, meta?: LoggerMeta): void;
}

export = Logger;