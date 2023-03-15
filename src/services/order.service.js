import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js';


const ORDERS_KEY = 'order';

export const orderService = {
    query,
    getById,
    save,
    remove,
    // getEmptyOrder,
    // addStayMsg,
}

window.orderService = orderService


 async function query(hostId,buyerId) {
  console.log("🚀 ~ file: order.service.js:22 ~ query ~ buyerId", buyerId)
  return await httpService.get(ORDERS_KEY, {hostId,buyerId})
}
async function getById(id) {
  // return storageService.get(ORDERS_KEY, carId)
  return await httpService.get(`order/${id}`)
}

async function remove(id) {
  // await storageService.remove(ORDERS_KEY, carId)
  return await httpService.delete(`order/${id}`)
}
async function save(entity) {
  var savedEntity
  if (entity._id) {
    console.log(entity)
      // savedCar = await storageService.put(ORDERS_KEY, car)
      savedEntity = await httpService.put(`order/${entity._id}`, entity)

  } else {
      // Later, owner is set by the backend
      entity.owner = userService.getLoggedinUser();
      // savedCar = await storageService.post(ORDERS_KEY, car)
      savedEntity = await httpService.post('order', entity)
  }
  return savedEntity
}
