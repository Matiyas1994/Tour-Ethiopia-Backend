import mongoose, {Schema, Document} from "mongoose";

interface IPlacesInterface extends Document {
    name: string,
    description: string,
    imageURL: string,
    address : string,
    distance : Number,
    numberOfvisitorsPerYear: Number,
    isActive:Boolean,
}

export default IPlacesInterface

