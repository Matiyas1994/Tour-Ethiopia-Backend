import mongoose from 'mongoose'
import logger from '../middleware/logger'
import '../middleware/env'

const startDB = () => {
    
    const DB_URI = process.env.MONGO_URI || process.env.LOCAL_CONNECTION_STRING || ""
    mongoose.set('strictQuery', true)
    mongoose.connect(DB_URI)
    mongoose.Promise = global.Promise
    const db = mongoose.connection

    db.on('error', (err) => logger.error('connection with db error', err))
    db.on('close', () => logger.info('connection closed to db'))
    db.once('open', () =>
        logger.info(`Connected to the database instance on ${DB_URI}`)
    )

    return db
}


export default {
    startDB: startDB()
}
