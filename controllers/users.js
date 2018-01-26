const User = require('../models/user');

module.exports = {
    
    index: (req,res,next) => {
        User.find({})
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                next(err);
            });
    },

    newUser: (req,res,next) => {
        const newUser = new User(req.body);
        newUser.save()
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                next(err);
            });
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
*/