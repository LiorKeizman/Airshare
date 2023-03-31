
   <template>

    <section class="orders-layout dashboard-mobile">

        <div class="dashboard-order-container bold">
            <div class="dashboard-title booker">Guest</div>
            <div class="dashboard-title date">Booking</div>
            <div class="dashboard-title dates">Dates</div>
            <div class="dashboard-title total">Total</div>
            <div class="dashboard-title status">Status</div>
            <div class="dashboard-title actions">Actions</div>
        </div>
        
        
        <section class="dashboard-order-container" v-for="hostOrder in getHostOrders" :key="hostOrder._id">
            <div class="booker ellipsis buyer"><img :src="getUserImg(hostOrder)">
                <span>{{getUserName(hostOrder)}}</span>
            </div>
            <div class="date">{{ getBookingDate(hostOrder) }}</div>
            <!-- <div class="stay ellipsis">{{ summarySize(hostOrder) }}</div> -->
            <div class="dates">{{ getStartDate(hostOrder) }}-{{ getEndDate(hostOrder) }}</div>
        <!-- <div class="guests">{{ getGuestsAmount(hostOrder) }} </div> -->
        <div class="total">${{ totalPrice(hostOrder) }}</div>
        <div class="status" :class="statusClass(hostOrder)">{{ hostOrder.status }}</div>
        <div class="detail actions actions-container">
            <button class="approve-btn" v-if="hostOrder.status === 'declined'" @click.prevent="approve(hostOrder)">Approve</button>
            <button class="approve-btn" v-if="hostOrder.status === 'pending'" @click.prevent="approve(hostOrder)">approve</button>
            <button class="reject-btn" v-if="hostOrder.status === 'pending'" @click.prevent="decline(hostOrder)">Reject</button>
            <button class="reject-btn" v-if="hostOrder.status === 'approved'" @click.prevent="decline(hostOrder)">Reject</button>
        </div>
    </section>
</section>
</template>

<script>
import {socketService} from '../../services/socket.service.js'
export default {
data() {
    return {
        img: '',
        currOrder: null,
        guests: 0,
    };
},
created() {

},
computed: {
    getHostOrders() {
        return this.$store.getters.getOrders
    },
},
methods: {
    statusClass(order) {
        // console.log(orders)
        // let currOrder = this.getHostOrders.filter(order => order === orders)
        // console.log(currOrder)
        if (order.status === 'pending') return 'status-pending'
        if (order.status === 'approved') return 'status-approved'
        if (order.status === 'declined') return 'status-decline'
    },
    summarySize(orders) {
        let currOrder = this.getHostOrders.filter(order => order === orders)
        // console.log(currOrder.stay)
        if (currOrder[0].stay.name.length > 20) {
            let desc = currOrder[0].stay.name.slice(0, 20) + '...'
            return desc
        }
        return currOrder[0].stay.name
    },
    getStartDate(orders) {
        let currOrder = this.getHostOrders.filter(order => order === orders)
        let startDate = currOrder[0].startDate
        let checkin = new Date(startDate).toLocaleDateString()
        return checkin
    },
    getEndDate(orders) {
        let currOrder = this.getHostOrders.filter(order => order === orders)
        let endDate = currOrder[0].endDate
        let checkout = new Date(endDate).toLocaleDateString()
        return checkout
    },
    getBookingDate(orders) {
        let currOrder = this.getHostOrders.filter(order => order === orders)
        let bookingDate = currOrder[0].createdAt
        let booking = new Date(bookingDate).toLocaleDateString()
        return booking
    },
    getGuestsAmount(orders) {
        let currOrder = this.getHostOrders.filter(order => order === orders)
        const { adults, children, pets, infants } = currOrder[0].guests
        // console.log(adults)
        let amount = adults + children + pets + infants
        return amount
    },
    totalPrice(order){
        // return order.totalPrice.toFixed(2)
        return (order?.totalPrice)? order.totalPrice.toLocaleString():''

    },
    statusDisplay(order){
       return order.status
    },
    getUserName(order){
        return order.buyer.fullname
    },
    getUserImg(order) {
        // let currOrder = this.getHostOrders.filter(order => order === orders)
        // currOrder.then(res => this.img = res.buyer.imgUrl)
        return order.buyer.imgUrl
    },
    // pending(orders) {
        
    //     let currOrder = this.getHostOrders.filter(order => order === orders)
    //     let order = currOrder[0]
    //     console.log('IM FROM PENDING',order)
    //     // const order = JSON.parse(JSON.stringify(this.hostOrder))
    //     this.$store.dispatch({ type: "saveOrder", order , status: 'approved' })
    // },
    approve(order) {
        const newOrder = JSON.parse(JSON.stringify(order))
        
        newOrder.status = 'approved'

        this.$store.dispatch({ type: "saveOrder", order:newOrder})
        console.log(order._id)
        socketService.emit('status changed', order._id)
    },
    decline(order) {
        const newOrder = JSON.parse(JSON.stringify(order))

        newOrder.status = 'declined'

        this.$store.dispatch({ type: "saveOrder", order:newOrder  })
        socketService.emit('status changed', order._id)
    },
}
};
</script>