const User = require('../models/user');
const Car = require('../models/car');



module.exports = {

    index: async (req,res,next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    // Validation: DONE
    newUser: async (req,res,next) => {
        const newUser = new User(req.value.body);
        user = await newUser.save();
        res.status(201).json(user);
    },
    // Validation: DONE
    getUser: async (req,res,next) => {
        // console.log('result', result);
        // const userId = req.params.userId; ----this is the same as below:
        const { userId } = req.value.params;

        const user = await User.findById(userId);
        res.status(200).json(user);
    },
        // Validation: DONE
    replaceUser: async (req,res,next) => {
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const user = await User.findByIdAndUpdate(userId,newUser);
        res.status(201).json({ success: true });
    },
        // Validation: DONE
    updateUser: async (req,res,next) => {
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const user = await User.findByIdAndUpdate(userId,newUser);
        res.status(201).json({ success: true });
    },
        // Validation: DONE
    getUserCars: async (req,res,next) => {
        const { userId } = req.value.params;
        const user = await User.findById(userId).populate('cars');
        console.log('user', user);
        res.status(200).json(user.cars);
    },
        // Validation: DONE
    newUserCar: async (req,res,next) => {
        const { userId } = req.value.params;
        // Create a car
        const newCar = new Car(req.value.body);
        // Get the user
        const user = await User.findById(userId);
        // Add user as car's seller
        newCar.seller = user._id;
        // Save the car
        await newCar.save();
        // Add car to the user's sellers array 'cars
        await user.cars.push(newCar._id);
        // Save the user
        await user.save();
        res.status(201).json(newCar);
        // console.log(newCar);
        // console.log(user);
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

    now method looks like:

        index: async (req,res,next) => {
                const users = await User.find({});
                res.status(200).json(users);
        }
*/