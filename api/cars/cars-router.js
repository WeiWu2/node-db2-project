const express = require('express')
const carsMiddleware = require('./cars-middleware')
const Cars = require('./cars-model')
const router = express();


router.get('/',(req,res,next) => {
    Cars.getAll().then((car) => {
        res.json(car)
    })
    .catch(next)
})
router.get('/:id',carsMiddleware.checkCarId,(req,res,next) => {
    Cars.getById(req.params.id).then((car) => {
        res.json(car)
    })
    .catch(next)
})
router.post('/',carsMiddleware.checkCarPayload,carsMiddleware.checkVinNumberValid,carsMiddleware.checkVinNumberUnique,(req,res,next) => {
    Cars.create(req.body).then((car) => {
        res.json(car)
    })
    .catch(next)
})


router.use((error,req,res,next)=> { //eslint-disable-line
    res.status(500).json({
        message:error.message,
        stack:error.stack
    })
}) 


module.exports = router