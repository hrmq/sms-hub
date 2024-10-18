import logger from "./logger.js"

export default class MO {
  constructor() {
    this.name = 'MO'
  }

  getName() {
    return this.name;
  }

  processMessage(src, dest, message, timestamp) {
    logger.info('MO: Received message:', src, dest, message, timestamp)
  }

  validateMessage() {
    logger.info('MO: Validated message')
  }
}