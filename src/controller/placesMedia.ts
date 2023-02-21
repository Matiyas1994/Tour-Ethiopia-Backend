import { Request, Response, NextFunction } from "express";
import { streamUpload } from '../services/bucket';
import dataAccessLayer from '../data/dal'
import Places  from '../model/places'
import { CustomError } from "../middleware/errorModel";

const placeDal = dataAccessLayer(Places)

const upload = (req: Request, res: Response, next: NextFunction) => {
    const activityId = req.params.id
        streamUpload(req, 'featuredImage')
        .then((resultURL:any) => {
            if (resultURL) {
                placeDal.updateOne({ imageURL: resultURL }, activityId)
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