import { Request, Response, NextFunction } from 'express'
import dataAccessLayer from '../data/dal'
import agencies  from '../model/travelAgencies'
import { CustomError } from '../middleware/errorModel'
const agenciesDal = dataAccessLayer(agencies)

const getAll = (req:Request, res: Response, next: NextFunction) => {
    const filter = { isActive: true }
    agenciesDal.getAll(filter, { path: 'events', select: '-password' },
    'events')
    .then((data: any) => {
      res.status(200).json(data)
    })
    .catch((err: any) => {
        next(err)
    })
}

const createOne = (req: Request, res: Response, next: NextFunction) => {
    const newPhase = req.body
    agenciesDal
    .createOne(newPhase)
    .then((data) => {
      if (!data) {
        throw new CustomError("Couldn't create new agencies")
      }
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
}

const getOne = (req: Request, res: Response, next: NextFunction) => {
   
    const agenciesId = req.params.id
    const filter = { isActive: true, _id: {agenciesId} }
    agenciesDal
      .getOne(filter, { path: 'events', select: '-password' },
      'events')
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
    agenciesDal
      .updateOne(changedProps, activityId)
      .then((data: any) => {
        if (!data) {
          throw new CustomError('Cannot update agencies', 404)
        }
        res.status(200).json(data)
      })
      .catch((err: any) => {
        next(err)
      })
  }
  
  const deleteOne = (req: Request, res: Response, next: NextFunction) => {
    const activityId = req.params.id
        agenciesDal
        .deleteOne(activityId, false)
        .then((data: any) => {
          if (!data) {
            throw new CustomError('Cannot delete agencies', 404)
          }
          res.status(200).json({ message: 'agencies deleted', data })
        })
        .catch((err: any) => {
          next(err)
        })
  
  }
  
  const agenciesController = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
  }
  
  export default agenciesController



