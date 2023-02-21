import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../data/dal'
import Hotel  from '../model/hotels'
import { CustomError } from '../middleware/errorModel'
const hotelDal = dataAccessLayer(Hotel)

const getAll = (req:Request, res: Response, next: NextFunction) => {
    const filter = { isActive: true }
    hotelDal.getAll(filter, '')
    .then((data: any) => {
      res.status(200).json(data)
    })
    .catch((err: any) => {
        next(err)
    })
}

const createOne = (req: Request, res: Response, next: NextFunction) => {
    const newPhase = req.body
    hotelDal
    .createOne(newPhase)
    .then((data) => {
      if (!data) {
        throw new CustomError("Couldn't create new hotel")
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const getOne = (req: Request, res: Response, next: NextFunction) => {
   
    const hotelId = req.params.id
    const filter = { isActive: true, _id: {hotelId} }
    hotelDal
      .getOne(filter, '')
      .then((data: any) => {
        res.status(200).json(data)
      })
      .catch((err: any) => {
        next(err)
      })
  }

  const updateOne = (req: Request, res: Response, next: NextFunction) => {
    const activityId = req.params.id
    const changedProps = req.body
    hotelDal
      .updateOne(changedProps, activityId)
      .then((data: any) => {
        if (!data) {
          throw new CustomError('Cannot update hotel', 404)
        }
        res.status(200).json(data)
      })
      .catch((err: any) => {
        next(err)
      })
  }
  
  const deleteOne = (req: Request, res: Response, next: NextFunction) => {
    const activityId = req.params.id
        hotelDal
        .deleteOne(activityId, false)
        .then((data: any) => {
          if (!data) {
            throw new CustomError('Cannot delete Hotel', 404)
          }
          res.status(200).json({ message: 'hotel deleted', data })
        })
        .catch((err: any) => {
          next(err)
        })
  
  }
  
  const hotelController = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
  }
  
  export default hotelController



