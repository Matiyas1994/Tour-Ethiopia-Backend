import mongoose, {Schema, Document} from "mongoose";

interface IHotelsInterface extends Document {
    name: string,
    description: string,
    imageURL: string,
    telephone: string,
    rating: Number, 
    address : string,
    avgBedPrice : Number,
    avgFoodPrice : Number,
    isActive:Boolean
}

export default IHotelsInterface