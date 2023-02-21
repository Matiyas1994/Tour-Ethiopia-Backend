import { Router } from 'express'
import eventController from '../controller/event'
// import { validateJoi, Schemas } from '../../../middleware/validate'
// import { auth } from '../../../middleware/auth'
// import permissions from '../../../middleware/permission'
import { fileUpload } from '../middleware/upload-via-stream'
import eventMedia from '../controller/eventMedia'


const router: Router = Router()

router
    .route('/')
    .get(eventController.getAll)
    .post(eventController.createOne)

router
    .route('/uploadImage')
    .post(fileUpload.single('image'), eventMedia.upload)

router
    .route('/:id')
    .get(eventController.getOne)
    .put(eventController.updateOne)
    .delete(eventController.deleteOne)

export default router
