import IHotelInterface from '../interface/IHotels'
import mongoose, { Schema } from 'mongoose'

const hotelSchema: Schema = new Schema(
    {

    name: {type: String, required: true},
    description: {type: String, required: true},
    imageURL: {type:String, default: "https://journeysbydesign.com/wp-content/uploads/2017/02/Addis-Sheraton-Fountain-850x573.jpg"},
    telephone: {type: String, required: true},
    rating:  {type : Number, required: true},
    address : {type: String, required: false},
    avgBedPrice : {type: Number, required: false},
    avgFoodPrice : {type: Number, required: false},
    isActive: { type: Boolean, default: true }
})

hotelSchema.set('toJSON', { virtuals: true })

export default mongoose.model<IHotelInterface>('Hotel', hotelSchema)