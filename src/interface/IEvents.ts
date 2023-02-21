import mongoose, {Schema, Document} from "mongoose";

interface IEventsInterface extends Document {
    name: string,
    Date : Date,
    imageUrl : string,
    isActive:Boolean
}

export default IEventsInterface