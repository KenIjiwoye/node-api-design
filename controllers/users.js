const User = require('../models/user');

module.exports = {

    index: async (req,res,next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },

    newUser: async (req,res,next) => {
        const newUser = new User(req.body);
        user = await newUser.save();
        res.status(201).json(user);
    },

    getUser: async (req,res,next) => {
        // const userId = req.params.userId; ----this is the same as below:
        const { userId } = req.params;

        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    replaceUser: async (req,res,next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const user = await User.findByIdAndUpdate(userId,newUser);
        res.status(201).json({ success: true });
    },

    updateUser: async (req,res,next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const user = await User.findByIdAndUpdate(userId,newUser);
        res.status(201).json({ success: true });
    },

    getUserCars: async (req,res,next) => {
        
    },

    newUserCar: async (req,res,next) => {
        
    }
}

/*
    We can interact with mongoose in 3 different ways:
    1) Callbacks

        index: (req,res,next) => {
            User.find({}, (err,users) => {
                if (err) {
                    next(err);
                }

                res.status(200).json(users)
                    })
                }

    2) Promises

        index: (req,res,next) => {
            User.find({})
                .then(users => {
                    res.status(200).json(users);
                })
                .catch(err => {
                    next(err);
                });
        }

    3) Async / Await (Promises)

        index: async (req,res,next) => {
            try {
                const users = await User.find({});
                res.status(200).json(users);
            } catch (err) {
                next(err);
            }
        }

    Trick**** To avoid typing trycatch all the time, install dependency "yarn add express-promise-router"
    use it to replace express router like: const router = require('express-promise-router')();

    now function looks like:

        index: async (req,res,next) => {
                const users = await User.find({});
                res.status(200).json(users);
        }
*/