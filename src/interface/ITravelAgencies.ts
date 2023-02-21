import mongoose, {Schema, Document} from "mongoose";


interface IHotelsInterface extends Document {
    name: string,
    description: string,
    imageURL: string,
    telephone: string,
    rating: Number, 
    emails : string,
    events : Schema.Types.ObjectId,
    isActive:Boolean,
}

export default IHotelsInterface
