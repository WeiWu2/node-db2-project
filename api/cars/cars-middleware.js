const Cars = require('./cars-model')
const vinValidator = require('vin-validator')
const checkCarId = (req, res, next) => {
  Cars.getById(req.params.id)
  .then((car) => {
    if(!car)
      res.status(404).json({message:'car with id <car id> is not found'})
      else
      next()
  })
  .catch((err) => {
    next(err)
  })
}

const checkCarPayload = (req, res, next) => {
  try{
    let requiredField = ''
    if(!req.body.vin)
      requiredField = 'vin'
      else if (!req.body.make)
      requiredField = 'make'
      else if (!req.body.model)
      requiredField = 'model'
      else if (!req.body.mileage)
      requiredField = 'mileage'
  if(requiredField)
      res.status(400).json({message: `${requiredField} is missing`})
      else
      next()
  }
  catch(err){
    next(err)
  }

}

const checkVinNumberValid = (req, res, next) => {
    try{
      if(!vinValidator.validate(req.body.vin))
      res.status(400).json({message: `vin ${req.body.vin} is invalid`})
    else
    next()
    }
    catch(error){
      next(error)
    }
}

const checkVinNumberUnique = (req, res, next) => {
  Cars.getByVin(req.body.vin)
  .then((cars) => {
    if(!cars)
      next()
    else
      res.status(400).json({ message: `vin ${req.body.vin} already exists`})
  })
  .catch((err) => {
    next(err)
  })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}