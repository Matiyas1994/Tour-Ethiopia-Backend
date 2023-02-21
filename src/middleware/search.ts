import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../data/dal'
import Hotel from '../model/hotels'
import Place from '../model/places'
import agencies from '../model/travelAgencies'
import { CustomError } from './errorModel'
const HotelDal = dataAccessLayer(Hotel)
const PlaceDal = dataAccessLayer(Place)
const agenciesDal = dataAccessLayer(agencies)




const search = (req: Request, res: Response, next: NextFunction) =>{

    const regex = new RegExp(escapeRegex(req.query.search), 'gi')
    const property: any = req.query.filter ?? "" ;
    const filter = { [property] : regex}
    let populate_opts1 = req.query.populate_opts1
    let populate_opts2 = req.query.populate_opts2
    let Dal: any
    
    if (req.query.type == 'Hotel'){
        Dal = HotelDal
    }
    else if (req.query.type == 'Place'){
        Dal = PlaceDal    
    }
    else if (req.query.type == 'Agency'){
        Dal = agenciesDal
    }
    else{
        return res.status(400).json({ message: 'error the type is not correct' })
    }
    
    Dal.getAll(filter, populate_opts1, populate_opts2)
    .then((data: any) => {
        res.status(200).json(data)
    })
    .catch((err: any) => {
        next(err)
    })


}


function escapeRegex(text: any) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

export default search
