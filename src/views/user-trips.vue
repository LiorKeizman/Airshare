<template>
    <section class="users-trips-layout" v-for="trip in getOrders" >
        <div class="stats-card trip">
            <img @click="showStayDetails(trip)" :src=" getStayImg(trip)" >
        </div>
        <div class="stats-card-right trip">

            <div class="details trip">
                <div class="rev-stat trip">
                    <div class="stay ellipsis stay-brand">{{ getStayName(trip) }}</div>
                </div>
                <div class="rev-stat trip">
                    <span class="stat-head trip">Booking Date</span>
                    <div class="date">{{ getBookingDate(trip) }}</div>
                </div>
                <div class="rev-stat trip">
                    <span class="stat-head trip">Vacation Dates</span>
                    <div class="dates">{{ getStartDate(trip) }}-{{ getEndDate(trip) }}</div>
                </div>
                <div class="rev-stat trip">
                    <span class="stat-head trip">Total Price</span>
                    <div class="total">${{ totalPrice(trip) }}</div>
                </div>
                <div class="rev-stat trip">
                    <span class="stat-head trip">Reservation Status</span>
                    <div class="status" :class="statusClass(trip)">{{ trip.status }}</div>
                </div>
            </div>
        </div>
    </section>
            <!-- <div class="stay ellipsis">{{ getStayName(trip) }}</div>
            <div class="total">${{ trip.totalPrice }}</div>
            <div class="status">{{ trip.status }}</div>
            <div class="dates">{{ getStartDate(trip) }}-{{ getEndDate(trip) }}</div>
            <div class="date">{{ getBookingDate(trip) }}</div> -->
</template>
    
<script>
import { socketService } from '../services/socket.service.js'
export default {
    data() {
        return {
            tripOrders: [],
        }
    },
    created() {
        socketService.on('update trips', this.loadTrips)
        this.$store.dispatch({ type: 'loadOrders', buyerId: this.$route.params.id });
    },

    computed: {
        
        getOrders() {
            return this.$store.getters.getOrders
        },
    },
    methods: {
        totalPrice(trip){
            return (trip.totalPrice)? trip.totalPrice.toLocaleString():''
        },
        statusClass(trip) {
            console.log(trip)
        if (trip.status === 'pending') return 'status-pending'
        if (trip.status === 'approved') return 'status-approved'
        if (trip.status === 'declined') return 'status-decline'
    },
        showStayDetails(trip) {
            //add event bus
            this.$router.push('/stay/' + trip.stay._id);
        },
        getStayImg(trip){
            return trip.stay.img[0]
        },
        getStartDate(trip) {
            // let currOrder = this.getHostOrders.filter(order => order === orders)
            let startDate = trip.startDate
            let checkin = new Date(startDate).toLocaleDateString()
            return checkin
        },
        getEndDate(trip) {
            // let currOrder = this.getHostOrders.filter(order => order === orders)
            let endDate = trip.endDate
            let checkout = new Date(endDate).toLocaleDateString()
            return checkout
        },
        getBookingDate(trip) {
            // let currOrder = this.getHostOrders.filter(order => order === orders)
            let booking = trip.createdAt
            let created = new Date(booking).toLocaleDateString()
            return created
        },
        loadTrips(orderId) {
            console.log("🚀 ~ file: user-trips.vue:59 ~ loadTrips ~ orderId", orderId)
            let order = this.getOrders.find(order => order._id === orderId)
            if (order) {
                this.$store.dispatch({ type: 'loadOrders', buyerId: this.$route.params.id });
            }
        },
        getStayName(trip) {
            // console.log(trip)
            // console.log(currOrder.stay)
            if (trip.stay.name > 20) {
                let desc = trip.stay.name.slice(0, 20) + '...'
                return desc
            }
            return trip.stay.name
        },
    }
}
</script>
  
