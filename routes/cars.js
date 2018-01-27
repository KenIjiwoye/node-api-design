const router = require('express-promise-router')();

const CarsController = require('../controllers/cars');

const { validateBody, validateParam, schemas } = require('../helpers/routeHelplers');


router.route('/')
    .get(CarsController.index)
    .post([validateBody(schemas.newCarSchema)], CarsController.newCar);

module.exports = router;