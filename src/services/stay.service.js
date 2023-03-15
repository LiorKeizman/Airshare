
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js';
import { utilService } from './util.service.js';
import { userService } from './user.service.js';
import { store } from '../store/store.js';
import { createStore } from 'vuex';

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addCarMsg,
    getMaps,
    getLabels
}
window.ss = stayService

async function query(filterBy = '') {
  console.log("🚀 ~ file: stay.service.js:25 ~ query ~ filterBy", filterBy)
    return await httpService.get(STORAGE_KEY,  filterBy)

    // var cars = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     cars = cars.filter(car => regex.test(car.vendor) || regex.test(car.description))
    // }
    // if (filterBy.price) {
    //     cars = cars.filter(car => car.price <= filterBy.price)
    // }
    // return cars

}
async function getById(id) {
    // return storageService.get(STORAGE_KEY, carId)
    return await httpService.get(`stay/${id}`)
}

async function remove(id) {
    // await storageService.remove(STORAGE_KEY, carId)
    return await httpService.delete(`stay/${id}`)
}
async function save(entity) {
    var savedEntity
    if (entity._id) {
        // savedCar = await storageService.put(STORAGE_KEY, car)
        savedEntity = await httpService.put(`stay/${entity._id}`, entity)

    } else {
        // Later, owner is set by the backend
        entity.owner = userService.getLoggedinUser();
        // savedCar = await storageService.post(STORAGE_KEY, car)
        savedEntity = await httpService.post('stay', entity)
    }
    return savedEntity
}

async function addCarMsg(id, txt) {
    const savedMsg = await httpService.post(`air-share/${id}/msg`, {txt})
    return savedMsg
}


function getEmptyStay() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

function getLabels() {
    return [
      {
        propertyType: "OMG!",
        src: "omg.jpg"
      },
      {
        propertyType: "Amazing views",
        src: "amazing-views.jpg"
      },
      {
        propertyType: "Trending",
        src: "trending.jpg"
      },
      {
        propertyType: "Castels",
        src: "castels.jpg"
      },
      {
        propertyType: "Off-the-grid",
        src: "Off-the-grid.jpg"
      },
      {
        propertyType: "Cabins",
        src: "cabins.jpg"
      },
      {
        propertyType: "Top of the world",
        src: "TOTW.jpg"
      },
      {
        propertyType: "Luxe",
        src: "luxe.jpg"
      },
      {
        propertyType: "Play",
        src: "play.jpg"
      },
      {
        propertyType: "New",
        src: "new.jpg"
      },
      {
        propertyType: "Privte rooms",
        src: "privte-rooms.jpg"
      },
  
  
  
      {
        propertyType: "Beach",
        src: "beach.jpg"
      },
      {
        propertyType: "Apartment",
        src: "Apartment.jpg"
      },
      {
        propertyType: "House",
        src: "house.jpg"
      },
      {
        propertyType: "Townhouse",
        src: "townhouse.jpg"
      },
      {
        propertyType: "Amazing pools",
        src: "amazing-pools.jpg"
      },
      {
        propertyType: "Arctic",
        src: "arctic.jpg"
      },
      {
        propertyType: "Islands",
        src: "islands.jpg"
      },
      {
        propertyType: "Vineyards",
        src: "Vineyards.jpg"
      },
      {
        propertyType: "Lakefront",
        src: "Lakefront.jpg"
      },
      {
        propertyType: "Historical homes",
        src: "Historical-homes.jpg"
      },
      {
        propertyType: "Boats",
        src: "Boats.jpg"
      },
      {
        propertyType: "Ski-in/out",
        src: "Ski-inout.jpg"
      },
      {
        propertyType: "Treehouses",
        src: "Treehouses.jpg"
      },
      {
        propertyType: "Surfing",
        src: "Surfing.jpg"
      },
      {
        propertyType: "Creative spaces",
        src: "Creative-spaces.jpg"
      },
      {
        propertyType: "Golfing",
        src: "Golfing.jpg"
      },
      {
        propertyType: "Desert",
        src: "desert.jpg"
      },
      {
        propertyType: "Campers",
        src: "Campers.jpg"
      },
      {
        propertyType: "Iconic cities",
        src: "Iconic-cities.jpg"
      },
      {
        propertyType: "Windmills",
        src: "Windmills.jpg"
      },
      {
        propertyType: "Shepherd's huts",
        src: "Shepherd's-huts.jpg"
      },
      {
        propertyType: "Ryokans",
        src: "Ryokans.jpg"
      }
    ]
  }

  function getMaps() {
    return [
      {
        "loc": "I'm flexible",
        src: "https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg"
      },
      {
        "loc": "Europe",
        src: "https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320"
      },
      {
        "loc": "France",
        src: "https://a0.muscache.com/im/pictures/f0ece7c0-d9b2-49d5-bb83-64173d29cbe3.jpg?im_w=320"
      },
      {
        "loc": "United States",
        src: "https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320"
      },
      {
        "loc": "United Kingdom",
        src: "https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320"
      },
      {
        "loc": "South America",
        src: "https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg?im_w=320"
      },
  
    ]
  }

