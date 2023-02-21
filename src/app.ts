import express, { Application, Request, Response } from 'express'
import './middleware/env'
const cors = require('cors')
const helmet = require('helmet')
const compression  = require('compression')
import routes from './middleware/routes'

const app: Application = express()

app.disable('x-powered-by')
app.use(cors())
app.use(helmet())
app.use(compression())

app.use(
    express.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '80mb'
    })
)

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({
        'health-check': 'OK: top level api working',
    })
})

app.use(routes)
// app.use(errorHandler)


export default app
