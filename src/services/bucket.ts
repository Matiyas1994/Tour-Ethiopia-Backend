import cloudinary from './configs/cloudinary'
import streamifier from 'streamifier'


export const streamUpload = (req: any, folder: string) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.v2.uploader.upload_stream(
            {
                folder: folder,
                resource_type : 'auto'
            },
            (error, result) => {
                if (result) {
                    resolve(result.secure_url)
                } else {
                    reject(error?.message)
                }
            }
        )
    
        streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
}


export const deleteImage = (image: any) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.destroy(image, (err: any, result: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}



