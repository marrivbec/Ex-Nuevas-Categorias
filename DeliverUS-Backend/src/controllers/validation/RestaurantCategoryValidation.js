import { check } from 'express-validator'
import { RestaurantCategory } from '#root/src/models/models.js'

const nonRepeatedCategory = async (value, { req }) => {
  try {
    const restaurantCategory = await RestaurantCategory.findOne({ where: { name: value } })
    if (restaurantCategory === null) {
      return Promise.resolve()
    } else {
      return Promise.reject(new Error('The category ' + value + ' already exists.'))
    }
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}

const create = [
  check('name').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('name').custom(nonRepeatedCategory)
]
export { create }
