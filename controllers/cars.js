const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    index: async (req,res,next) => {
        // Get all cars
        const cars = await Car.find({});
        res.status(200).json(cars);
    },
        // Validation: DONE
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
    },

    getCar: async (req,res,next) => {
        const car = await Car.findById(req.value.params.carId);
        res.status(200).json(car);
    },
        // Validation: DONE
    replaceCar: async (req,res,next) => {
        const { carId } = req.value.params;
        const newCar = req.value.body;
        const car = await Car.findByIdAndUpdate(carId, newCar);
        res.status(200).json({success: true});
        
    },
        // Validation: DONE
    updateCar: async (req,res,next) => {
        const { carId } = req.value.params;
        const newCar = req.value.body;
        const car = await Car.findByIdAndUpdate(carId, newCar);
        res.status(200).json({success: true});
        
    },

    deleteCar: async (req,res,next) => {
        const { carId } = req.value.params;

        // Get a car
        const car = await Car.findById(carId);
        // If car has already been deleted, or doesn't exist.
        if (!car) {
            return res.status(404).json({ error: "Car doesn't exist"});
        }
        const sellerId = car.seller;
        // Get the related seller
        const seller = await User.findById(sellerId);
        // Remove the car
        await car.remove();
        // Remove car from seller's array
        seller.cars.pull(car);
        await seller.save();

        res.status(200).json({success: true});
    }
}