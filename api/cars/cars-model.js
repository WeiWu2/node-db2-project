  const db = require('../../data/db-config')


const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where({id}).first()
}

const create = async(car) => {
    const [id] = await db('cars').insert(car, ['id'])
    return getById(id)
}
const getByVin = (vin) => {
  return db('cars').where({vin}).first()
}
module.exports = {
  getAll,
  getById,
  create,
  getByVin
}