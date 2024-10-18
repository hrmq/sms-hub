import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { createLogger, format, transports } from 'winston'

const logDirectory = path.join(__dirname, '../../', 'logs')

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(logDirectory, 'combined.log') })
    ]
})

export default logger