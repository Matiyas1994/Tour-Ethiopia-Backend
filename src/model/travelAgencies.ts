import ITravelAgenciesInterface from '../interface/IHotels'
import mongoose, { Schema } from 'mongoose'

const travelAgencySchema: Schema = new Schema(
    {

    name: {type: String, required: true},
    description: {type: String, required: true},
    imageURL: {type:String, default:"https://habeshalink.com/wp-content/uploads/2019/08/Ethiopian-Travel_Agency-prof.png"},
    telephone: {type: String, required: true},
    rating: {type: String, required: true},
    address : {type: String, required: false},
    events: [{type: Object,required: false}],
    isActive: { type: Boolean, default: true }

})

travelAgencySchema.set('toJSON', { virtuals: true })

export default mongoose.model<ITravelAgenciesInterface>('TravelAgency', travelAgencySchema)