import asyncHandler from 'express-async-handler'

export default class BC {
    constructor(model) {
        this.model = model;
    }

    get = asyncHandler(async (request, response, next) => {
        await this.model.find().exec()
            .then((resource) => {
                // order not found, let's throw an error
                if (!resource) {
                    return next(errors.RESOURCE_NOT_FOUND())
                }
                return response.json(resource)
            })
            .catch((err) => {
                return next(err)
            })
    })

    getById = asyncHandler(async (request, response, next) => {
        await this.model.findById(request.params.id).exec()
            .then((resource) => {
                if (!resource) {
                    return next(errors.RESOURCE_NOT_FOUND())
                }
                return response.json(resource)
            })
            .catch((err) => {
                return next(err)
            })
    })

    create = asyncHandler(async (request, response, next) => {
        const obj = model.create(request.body)
        obj.then((resource) => {
            return response.json(resource)
        })
            .catch((err) => {
                // send the error to the error handler
                return next(err)
            })
    })
}