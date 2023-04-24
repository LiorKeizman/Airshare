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
  return await httpService.get(ORDERS_KEY, {hostId,buyerId})
}
async function getById(id) {
  return await httpService.get(`order/${id}`)
}

async function remove(id) {
  return await httpService.delete(`order/${id}`)
}
async function save(entity) {
  var savedEntity
  if (entity._id) {
      savedEntity = await httpService.put(`order/${entity._id}`, entity)

  } else {
      entity.owner = userService.getLoggedinUser();
      savedEntity = await httpService.post('order', entity)
  }
  return savedEntity
}
