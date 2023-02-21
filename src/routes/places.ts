import { Router } from 'express'
import placesController from '../controller/places'
// import { validateJoi, Schemas } from '../../../middleware/validate'
// import { auth } from '../../../middleware/auth'
// import permissions from '../../../middleware/permission'
import { fileUpload } from '../middleware/upload-via-stream'
import placesMedia from '../controller/placesMedia'


const router: Router = Router()

router
    .route('/')
    .get(placesController.getAll)
    .post(placesController.createOne)

router
    .route('/uploadImage')
    .post(fileUpload.single('image'), placesMedia.upload)

router
    .route('/:id')
    .get(placesController.getOne)
    .put(placesController.updateOne)
    .delete(placesController.deleteOne)
        
export default router
