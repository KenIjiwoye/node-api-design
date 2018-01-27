const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    index: async (req,res,next) => {
        // Get all cars
        const cars = await Car.find({});
        res.status(200).json(cars);
    },

    newCar: async (req,res,next) => {
        // 1. Find the seller
        const seller = await User.findById(req.value.body.seller);

        // 2. create new car
        const newCar = req.value.body;
        delete newCar.seller;

        const car = new Car(newCar);
        car.seller = seller;
        await car.save();

        // 3. add new car to seller
        seller.cars.push(car);
        await seller.save();

        res.status(200).json(car);
    }
}