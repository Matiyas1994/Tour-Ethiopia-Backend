import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../data/dal'
import Event  from '../model/events'
import { CustomError } from '../middleware/errorModel'
const eventDal = dataAccessLayer(Event)

const getAll = (req:Request, res: Response, next: NextFunction) => {
    const filter = { isActive: true }
    eventDal.getAll(filter, '')
    .then((data: any) => {
      res.status(200).json(data)
    })
    .catch((err: any) => {
        next(err)
    })
}

const createOne = (req: Request, res: Response, next: NextFunction) => {
    const newPhase = req.body
    eventDal
    .createOne(newPhase)
    .then((data) => {
      if (!data) {
        throw new CustomError("Couldn't create new event")
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const getOne = (req: Request, res: Response, next: NextFunction) => {
   
    const eventId = req.params.id
    const filter = { isActive: true, _id: {eventId} }
    eventDal
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
    eventDal
      .updateOne(changedProps, activityId)
      .then((data: any) => {
        if (!data) {
          throw new CustomError('Cannot update event', 404)
        }
        res.status(200).json(data)
      })
      .catch((err: any) => {
        next(err)
      })
  }
  
  const deleteOne = (req: Request, res: Response, next: NextFunction) => {
    const activityId = req.params.id
        eventDal
        .deleteOne(activityId, false)
        .then((data: any) => {
          if (!data) {
            throw new CustomError('Cannot delete event', 404)
          }
          res.status(200).json({ message: 'event deleted', data })
        })
        .catch((err: any) => {
          next(err)
        })
  
  }
  
  const eventController = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
  }
  
  export default eventController



