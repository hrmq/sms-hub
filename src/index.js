import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import logger from './services/logger.js'
import mo from './services/mo.js'

const env = process.env.NODE_ENV || 'development'
dotenv.config({ path: `.env.${env}` })

const app = express()
const port = process.env.PORT || 3000
const moPath = process.env.MO_API_PATH || '/'

console.log(moPath, 'kkjkk')
const moService = new mo()

// Configure body-parser middleware
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
    logger.info(`Received request: ${req.method} ${req.url}`)
    next()
})

app.post(moPath, (req, res) => {
    const { src, dst, message, createdAt } = req.body
    moService.processMessage(src, dst, message, createdAt)
    res.send(`Received data: ${JSON.stringify(req.body)}`)
})

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
})