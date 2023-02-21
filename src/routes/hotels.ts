import { Router } from 'express'
import hotelsController from '../controller/hotel'
// import { validateJoi, Schemas } from '../../../middleware/validate'
// import { auth } from '../../../middleware/auth'
// import permissions from '../../../middleware/permission'
import { fileUpload } from '../middleware/upload-via-stream'
import hotelMedia from '../controller/hotelMedia'


const router: Router = Router()

router
    .route('/')
    .get(hotelsController.getAll)
    .post(hotelsController.createOne)

router
    .route('/uploadImage')
    .post(fileUpload.single('image'), hotelMedia.upload)

router
    .route('/:id')
    .get(hotelsController.getOne)
    .put(hotelsController.updateOne)
    .delete(hotelsController.deleteOne)

export default router
