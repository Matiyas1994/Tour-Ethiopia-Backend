import { Router } from "express";

const router: Router = Router()

import hotelRoutes from '../routes/hotels'
import placeRoutes from '../routes/places'
import travelAgenciesRoutes from '../routes/travelAgencies'
import search from './search'
import eventRoutes from '../routes/event'

router.use('/hotel', hotelRoutes)
router.use('/place', placeRoutes)
router.use('/travelAgency',travelAgenciesRoutes)
router.use('/search', search)
router.use('/event', eventRoutes)

export default router

