import User from '../models/usersModel.js'
import asyncHandler from 'express-async-handler'

/*
createMovie = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}
*/
//getUsers function to get all users
export const get = (req, res) => {
    const users = await User.find({})
    res.json(users)
})
/*
//getUserById function to retrieve user by id
export const getUserById  = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    //if user id match param id send user else throw error
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({message: "User not found"})
        res.status(404)
        throw new Error('User not found')
    }
})
*/

export const getById  = asyncHandler(async(req, res) => {
    await User.findById({_id: req.params.id}, (err, user) => {
        console.log(err);
        if(err) {
            return res.status(400).json({ success: false, error: err })
        }
        else if(!user){
            return res.status(404).json({ success: false, error: 'User not found'})
        }
        else {
            return res.status(200).json({ success: true, data: user })
        }
    }).catch(err => console.log(err));
})

export const get = (request, response, next, model) => {
    const query = model.findById(request.params.id).exec()
        query.then((resource) => {
             
            // order not found, let's throw an error
            if (!resource) {
                return next(errors.RESOURCE_NOT_FOUND())
            }

            // we found an order
            return response.json(resource)
        })
        .catch((err) => {
            // send the error to the error handler
            return next(err)
        })
}

//getUserById function to retrieve user by id
export const getById  = asyncHandler(async(req, res) => {
    await User.findOne({_id: req.params.id}, (err, user) => {
        console.log(err);
        if(err) {
            return res.status(400).json({ success: false, error: err })
        }
        else if(!user){
            return res.status(404).json({ success: false, error: 'User not found'})
        }
        else {
            return res.status(200).json({ success: true, data: user })
        }
    }).catch(err => console.log(err));
})
/*
getMovieById = async (req, res) => {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getMovies = async (req, res) => {
    await Movie.find({}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}
*/