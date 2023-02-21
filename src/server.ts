import './middleware/env'
import app from './app'
import * as os from 'os'
import logger from './middleware/logger'
import db from './data/db'

const PORT = process.env.PORT || "8000"





app.listen(PORT, () => {
    logger.info(
        `up and running in ${process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port ${PORT}`
    )
})

db.startDB
