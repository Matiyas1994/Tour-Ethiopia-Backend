import { Router } from 'express'
import travelAgenciesController from '../controller/travelAgencies'
// import { validateJoi, Schemas } from '../../../middleware/validate'
// import { auth } from '../../../middleware/auth'
// import permissions from '../../../middleware/permission'
import { fileUpload } from '../middleware/upload-via-stream'
import travelAgenciesMedia from '../controller/travelAgenciesMedia'


const router: Router = Router()

router
    .route('/')
    .get(travelAgenciesController.getAll)
    .post(travelAgenciesController.createOne)

router
    .route('/uploadImage')
    .post(fileUpload.single('image'), travelAgenciesMedia.upload)

router
    .route('/:id')
    .get(travelAgenciesController.getOne)
    .put(travelAgenciesController.updateOne)
    .delete(travelAgenciesController.deleteOne)
        
export default router
