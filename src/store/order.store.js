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
        console.log('IM FROM GETTER',state.currOrder)
        return state.currOrder
      }
    },
    mutations: {
      setOrders(state, { orders }) {
        state.orders = orders
      },
      setCurrOrder(state ,{order}){
        console.log('IM FROM MUTATION',order)
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
        console.log("🚀 ~ file: order.store.js:54 ~ loadOrders ~ buyerId", buyerId)
        try {
          const orders = await orderService.query(hostId,buyerId)
          console.log(orders)
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
            console.log('IM FROM STORE',order)
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
