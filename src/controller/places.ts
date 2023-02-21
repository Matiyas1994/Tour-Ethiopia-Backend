import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../data/dal'
import Places  from '../model/places'
import { CustomError } from '../middleware/errorModel'
const placeDal = dataAccessLayer(Places)

const getAll = (req:Request, res: Response, next: NextFunction) => {
    const filter = { isActive: true }
    placeDal.getAll(filter, '')
    .then((data: any) => {
      res.status(200).json(data)
    })
    .catch((err: any) => {
        next(err)
    })
}

const createOne = (req: Request, res: Response, next: NextFunction) => {
    const newPhase = req.body
    placeDal
    .createOne(newPhase)
    .then((data) => {
      if (!data) {
        throw new CustomError("Couldn't create new place")
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const getOne = (req: Request, res: Response, next: NextFunction) => {
   
    const placeId = req.params.id
    const filter = { isActive: true, _id: {placeId} }
    placeDal
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
    placeDal
      .updateOne(changedProps, activityId)
      .then((data: any) => {
        if (!data) {
          throw new CustomError('Cannot update place', 404)
        }
        res.status(200).json(data)
      })
      .catch((err: any) => {
        next(err)
      })
  }
  
  const deleteOne = (req: Request, res: Response, next: NextFunction) => {
    const activityId = req.params.id
        placeDal
        .deleteOne(activityId, false)
        .then((data: any) => {
          if (!data) {
            throw new CustomError('Cannot delete place', 404)
          }
          res.status(200).json({ message: 'place deleted', data })
        })
        .catch((err: any) => {
          next(err)
        })
  
  }
  
  const placeController = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
  }
  
  export default placeController



