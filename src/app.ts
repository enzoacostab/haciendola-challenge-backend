import express from 'express'
import productsRouter from './controller/product-controller'
import usersRouter from './controller/user-cotroller'
import sessionsRouter from './controller/session-controller'
import { errorHandler } from './util/middleware'
import cors from 'cors'
import config from './util/config'
const { CLIENT_URL } = config

const app = express()

app.use(express.json())
app.use(cors({ origin: CLIENT_URL }))
app.use(sessionsRouter)
app.use(usersRouter)
app.use(productsRouter)
app.use(errorHandler)

export default app
