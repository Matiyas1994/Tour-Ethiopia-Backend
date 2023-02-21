import IEventInterface from '../interface/IEvents'
import mongoose, { Schema } from 'mongoose'

const eventsSchema: Schema = new Schema(
    {

        name: { type: String, required: true},
        Date : {type: Date, default: Date.now(), required: true },
        imageUrl : { type: String },
        isActive: {type: Boolean, default: true}
    }
)

eventsSchema.set('toJSON', { virtuals: true })

export default mongoose.model<IEventInterface>('event', eventsSchema)