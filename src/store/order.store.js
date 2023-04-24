import { orderService } from '../services/order.service.js'
// import { stayService } from '../../services/stay-service.js'


export const orderStore = {
    state: {
      orders: [],
      currOrder:null,
      filterBy: null,
    },
    getters: {
      getOrders(state) {
        return state.orders
      },
      getCurrOrder(state){
        return state.currOrder
      }
    },
    mutations: {
      setOrders(state, { orders }) {
        state.orders = orders
      },
      setCurrOrder(state ,{order}){
        state.currOrder = order

      },
      setFilterBy(state, { filterBy }) {
        state.filterBy = filterBy
      },
      
      removeOrder(state, { orderId }) {
        // var orders = JSON.parse(JSON.stringify(state.orders))
        var orders = state.orders
        var orderIdx = orders.findIndex((order) => order._id === orderId)
        orders.splice(orderIdx, 1)
        state.orders = orders
      },
      addOrder(state, { order }) {
        state.orders.push(order)
      },
  
      updateOrder(state, { order }) {
        const idx = state.orders.findIndex((currOrder) => currOrder._id === order._id)
        state.orders.splice(idx, 1, order)
      },
    },
    actions: {
      async loadOrders(context , {hostId,buyerId}) {
        try {
          const orders = await orderService.query(hostId , buyerId)
          if(hostId){
            let myOrders = orders.filter(order => order.host.id === hostId)
            context.commit({ type: 'setOrders', orders: myOrders })
            return myOrders
          }
          if(buyerId){
            let myOrders = orders.filter(order => order.buyer._id === buyerId)
            context.commit({ type: 'setOrders', orders: myOrders })
            return myOrders
          }
          context.commit({ type: 'setOrders', orders: orders })
          return orders
        } catch (err) {
          console.log(err)
        }
      },
      async getOrderById(context, { orderId }) {
        try {
          const order = await orderService.getById(orderId)
          context.commit({ type: 'setCurrOrder', order: order })
          return order
        } catch (err) {
          console.log(err)
        }
      },
      getEmptyOrder() {
        return orderService.getEmptyOrder()
      },
      async removeOrder(context, { orderId }) {
        try {
          await orderService.removeOrder(orderId)
          context.commit({ type: 'removeOrder', orderId })
          return
        } catch (err) {
          console.log(err)
        }
      },
      async saveOrder(context, { order }) {
        try {
          const isEdit = (order._id?.length > 0)
          const savedOrder = await orderService.save(order)
          context.commit({ type: isEdit ? 'updateOrder' : 'addOrder', order: savedOrder })
          return savedOrder
        } catch (err) {
          console.log(err)
        }
      }
    }
}
