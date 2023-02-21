import { model, Model } from 'mongoose'
import logger from '../middleware/logger'

const createOne =
    (model: Model<any, {}, {}>) => async (props: any) => {
        logger.info(`Creating ${model.modelName}`)
        return await model.create(props)
    }

const getOne =
    (model: Model<any, {}, {}>) =>
        async (props: any, populate_opts1: any = '', populate_opts2: any = '') => {
            logger.info(`Fetching ${model.modelName} with id: ${props._id}`)
            return await model.findOne(props).populate(populate_opts1).populate(populate_opts2).lean().exec()
        }

const getAll =
    (model: Model<any, {}, {}>) =>
      async (props: any, populate_opts1: any = '', populate_opts2: any = '') => {
            logger.info(`Fetching all ${model.modelName} with props: ${props}`)
            return await model.find(props).sort({ updated_at: -1 }).populate(populate_opts1).populate(populate_opts2).lean().exec()
        }

// const getAllSecured =
//   (model: Model<User, {}, {}>) =>
//     async (props: any, populate_opts1: any = '', populate_opts2: any = '') => {
//       logger.info(`Fetching all securely`)
//       return await model.find(props, '-password').sort({ updated_at: -1 }).populate(populate_opts1).populate(populate_opts2).lean().exec()
//     }

const aggregatedQuery =
  (model: Model<any, {}, {}>) => async (pipeline: any) => {
    logger.info(`Fetching all ${ model.modelName } with props: ${ pipeline }`)
    return await model.aggregate(pipeline).exec()
  }

      
const updateOne =
    (model: Model<any, {}, {}>) => async (props: any, id: String) => {
          logger.info(`Updating ${model.modelName} with id: ${id}`)
      
          const payload = props
          return await model
            .findOneAndUpdate({ _id: id }, payload, { new: true })
            .exec()
        }

const deleteOne =
    (model: Model<any, {}, {}>) =>
            async (id: any, permanentDelete?: Boolean, props?: Object) => {
              logger.info(`Deleting ${model.modelName} with id: ${id}`)
              if (permanentDelete == true) {
                if (typeof props == 'undefined') props = { _id: id }
          
                return await model.deleteOne(props)
              }
          
              return await model.updateOne(
                {
                  _id: id
                },
                { $set: { isActive: false } }
              )
            }
     
const dataAccessLayer =
    (model: Model<any, {}, {}>) => ({
        createOne: createOne(model),
        getOne: getOne(model),
        getAll: getAll(model),
        updateOne: updateOne(model),
        deleteOne: deleteOne(model),
        // getAllSecured: getAllSecured(model),
        aggregatedQuery: aggregatedQuery(model)
    })

export default dataAccessLayer