import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import * as bodyParser from 'body-parser'
import logger from './middleware/logger.middleware'
import cors from './middleware/cors.middleware'
import { error404, error500 } from './middleware/error.middleware'
import validateEnv from './validateEnv'
dotenv.config()

// will crash the app if some env are missing
validateEnv()

const app = express()
const { DEBUG, PORT = 4000 } = process.env


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors)
if (DEBUG) {
  app.use(logger)
}

// App routes
// app.use()
app.get('/', (request: Request, response: Response) => {
  response.json({
    status: 'world',
    message: 'Hello'
  })
})

// Error handlers
app.use(error404)
app.use(error500)

app.listen({ port: PORT }, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}`)
})