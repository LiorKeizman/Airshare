import { storageService } from './async-storage.service.js'
import { httpService } from './http.service'
import { store } from '../store/store.js'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service.js'
import { showSuccessMsg } from './event-bus.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
}

window.userService = userService


function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}

function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'setWatchedUser', user })
}

async function getById(userId) {
    console.log("🚀 ~ file: user.service.js:36 ~ getById ~ userId", userId)
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)

    console.log("🚀 ~ file: user.service.js:40 ~ getById ~ user", user)
    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return user
}
function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    console.log('loigign',userCred)
    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    console.log('userr',user)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // const user = await storageService.post('user', userCred)
    const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    user = {_id: user._id, id: user.id, fullname: user.name, imgUrl: user.imgUrl}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



function getDemoUsers(){
    return [
        {
               "_id": "WbYTQf8YP2ezO",
               "name": "Mister Red",
               "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1669889536/user-3_gyhyze.png",
               "propertiesId": ["H9Tsb7gCOl7zi"]
        },
        {
               "_id": "A26HW2jg7Qo",
               "name": "Master Black",
               "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1669889536/user-2_zf16kb.png",
               "propertiesId": ["wXAfnS2RxGqBb"]
        },
        {
               "_id": "dXhHaSyRjNz1p",
               "name": "Star Dreamer",
               "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1669889536/user-1_pwe071.png",
               "propertiesId": ["lD6xkN4bdvNI9"]
        },
      
        {
               
               "_id": "7162cX5cTf68l",
               "name": "Eyes Matter",
               "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099517/user-10_wam74m.png",
               "propertiesId": []
        },
        {
               
               "_id": "7N4OEdLC2BfjT",
               "name": "Heavy Metal",
               "password": "ironMaiden",
               "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099516/user-11_zytml0.png",
               "propertiesId": []
        },
        {
               
               "_id": "7hlo5eR0X666L",
               "name": "Game of Chairs",
               "password": "excitedX",
               "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099516/user-12_wslgxy.png",
               "propertiesId": []
        },
        {
               "_id": "a4D67ti7Jv8jI",
               "name": "Mind Mistress",
               "password": "burn66",
               "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099517/user-13_zeuri6.png",
               "propertiesId": []
        },
        {
               "_id": "0ftUf74t6ZUzu",
               "name": "White Wires 49",
               "password": "spiderfriend",
               "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099517/user-14_ow2as4.png",
               "propertiesId": []
        },
        {
               "_id": "6fun6fun6fun6",
               "name": "ForTheFun",
               "password": "boom!!!!",
               "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670099517/user-15_intfaj.png",
               "propertiesId": []
        },
        {
               "_id": "Hl6Kk4Ce9yrMr",
               "name": "rouge474",
               "password": "drain",
               "imgUrl": "https://res.cloudinary.com/dj88xudav/image/upload/v1670100293/user-16_twzwub.png",
               "propertiesId": []
        }   
      ]

}

