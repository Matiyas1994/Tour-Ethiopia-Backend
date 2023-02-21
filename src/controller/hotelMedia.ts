import { Request, Response, NextFunction } from "express";
import { streamUpload } from '../services/bucket';
import dataAccessLayer from '../data/dal'
import Hotel  from '../model/hotels'
import { CustomError } from "../middleware/errorModel";

const hotelDal = dataAccessLayer(Hotel)

const upload = (req: Request, res: Response, next: NextFunction) => {
    const activityId = req.params.id
        streamUpload(req, 'featuredImage')
        .then((resultURL:any) => {
            if (resultURL) {
                hotelDal.updateOne({ imageURL: resultURL }, activityId)
                    .then((data) => {
                        if (!data) {
                            throw new CustomError('Cannot update UserImage', 400)
                        }
                        res.status(200).json({ message: 'image upload successfully', data })
                    })
                    .catch((err) => {
                        res.status(400).json(err)
                    })
            } else {
                res.status(400).json({ message: 'error uploading media to storage' })
            }
        })
        .catch((err: Error) => {
            next(err)
        })
        
} 



export default {
    upload
}