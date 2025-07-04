import fs from 'fs';
import path from 'path';

export default class Logger {
    static logFolder = null;
    static logStreams = new Map(); // Map<type, WriteStream>
    static currentPaths = new Map(); // Map<type, currentFilePath>

    static initialize(logFolder) {
        if (logFolder) {
            this.logFolder = logFolder;
            if (!fs.existsSync(this.logFolder)) {
                fs.mkdirSync(this.logFolder, { recursive: true });
            }
        }
    }

    static info(message, meta = {}) {
        this.log('INFO', message, meta);
    }

    static error(message, meta = {}) {

        this.log('ERROR', message, meta);
    }

    static logRequest(baseUrl, method, body, responseResultString, responseStatusCode, responseData) {
        const meta = {
            request: {
                baseUrl,
                method,
            },
            response: {
                code: responseStatusCode,
                message: responseResultString,
            }
        }

        if (responseData) meta.response.data = responseData
        if (body) meta.request.body = body

        const message = `Request [CODE:${responseStatusCode}] Result: [${responseResultString.toUpperCase()}]`
        this.log("REQUEST", message, meta)
    }

    /**
     * Core log method.
     * @param {string} type - Log type e.g. INFO, ERROR, WARN
     * @param {string} message
     * @param {object} meta
     */
    static log(type, message, meta) {
        const timestamp = new Date().toISOString();

        const logObj = {
            timestamp,
            message,
            type,
            meta
        };

        // Console output (pretty)
        console.log(`[${timestamp}] [${type}] ${message}`);

        // Write to file if enabled
        if (this.logFolder) {
            const filePath = this.getLogFilePath(type);

            // Rotate file stream if needed
            if (!this.currentPaths.get(type) || this.currentPaths.get(type) !== filePath) {
                this.rotateStream(type, filePath);
            }

            const jsonLine = JSON.stringify(logObj) + '\n';
            this.logStreams.get(type).write(jsonLine);
        }
    }

    static getLogFilePath(type) {
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10);
        const typeDir = path.join(this.logFolder, type.toLowerCase())

        if (!fs.existsSync(typeDir)) {
            fs.mkdirSync(typeDir, { recursive: true });
        }

        return path.join(typeDir, `${type.toLowerCase()}-${dateStr}.log`);
    }

    static rotateStream(type, newPath) {
        // Close old stream
        if (this.logStreams.has(type)) {
            this.logStreams.get(type).end();
        }
        // Create new stream
        const stream = fs.createWriteStream(newPath, { flags: 'a' });
        this.logStreams.set(type, stream);
        this.currentPaths.set(type, newPath);
    }
}
