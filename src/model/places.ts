import IPlaceInterface from '../interface/IHotels'
import mongoose, { Schema } from 'mongoose'

const placeSchema: Schema = new Schema(
    {
    name: {type: String, required: true},
    description: {type: String, required: true},
    imageURL: {type:String, default: "https://content.time.com/time/2012/influentialplaces/ethiopia.jpg"},
    distance: {type:Number, required:false},
    numberOfvisitorsPerYear: {type: Number, required: false},
    address : {type: String, required: false},
    isActive: { type: Boolean, default: true }
})

placeSchema.set('toJSON', { virtuals: true })

export default mongoose.model<IPlaceInterface>('Place', placeSchema)
