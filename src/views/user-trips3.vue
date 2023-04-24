<template>
    <section class="main-layout">
        <h1 class="chart-title-trips">My trips</h1>

        <div class="dashboard-order-container bold">
            <div class="dashboard-title stay">Stay Name</div>
            <div class="dashboard-title total">Price</div>
            <div class="dashboard-title status">Status</div>
            <div class="dashboard-title dates">Vacation Dates</div>
            <div class="dashboard-title date">Booking</div>
        </div>


        <section class="dashboard-order-container" v-for="trip in getOrders" :key="trip._id">
            <div @click="showStayDetails(trip)" class="stay-img-trip"><img :src="getStayImg(trip)"></div>
            <div class="stay ellipsis">{{ getStayName(trip) }}</div>
            <div class="total">${{ trip.totalPrice }}</div>
            <div class="status">{{ trip.status }}</div>
            <div class="dates">{{ getStartDate(trip) }}-{{ getEndDate(trip) }}</div>
            <div class="date">{{ getBookingDate(trip) }}</div>
            <!-- <div class="booker ellipsis buyer"><img :src="getUserImg(hostOrder)">
        <span>{{getUserName(hostOrder)}}</span>
    </div> -->
            <!-- <div class="guests">{{ getGuestsAmount(hostOrder) }} </div> -->
            <!-- <td><img class="stay-image" :src=imageUrl></td> -->

        </section>

        <!-- <tbody>
            <div v-for="trip in getOrders" :key="trip._id">
                <tr class="row-table border-bottom">
                    <td>{{ getStayName(trip) }}</td>
                    <td>{{ trip.totalPrice }}</td>
                    <td>{{ trip.status }}</td> 
                    <td>{{ getStartDate(trip)}} - {{getEndDate(trip)}}</td>
                    <td>{{ getBookingDate(trip) }}</td> 
                </tr>
            </div>
        </tbody> -->
    </section>
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
            let order = this.getOrders.find(order => order._id === orderId)
            if (order) {
                this.$store.dispatch({ type: 'loadOrders', buyerId: this.$route.params.id });
            }
        },
        getStayName(trip) {
           
            if (trip.stay.name > 20) {
                let desc = trip.stay.name.slice(0, 20) + '...'
                return desc
            }
            return trip.stay.name
        },
    }
}
</script>

<style>

</style>