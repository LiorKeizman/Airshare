<template>
    <div v-for="stay in getUserStays" :key="stay._id">
    <tr class="row-table border_bottom">
        <!-- <td><img class="stay-image" :src=imageUrl></td> -->
        <td>{{ getStayName(stay)}}</td>
        <td>{{ stay.price }}</td>
        <td>{{ stay.loc.address }}</td>
        <td>
            <el-button><span class="material-icons-outlined">
                    edit
                </span></el-button>
        </td>

    </tr>
   
    <section class="">

<div class="dashboard-order-container bold">
    <div class="dashboard-title stay">Stay</div>
    <div class="dashboard-title total">Total</div>
    <div class="dashboard-title status">Status</div>
    <div class="dashboard-title dates">Dates</div>
    <div class="dashboard-title date">Booking</div>
</div>


<section class="dashboard-order-container" v-for="stay in getUserStays" :key="stay._id">
    <div class="stay ellipsis">{{ getStayName(stay)}}</div>
    <div class="total">${{ stay.price }}</div>
    <div class="date">{{ getBookingDate(hostOrder) }}</div>
    <div class="booker ellipsis buyer"><img :src="getUserImg(hostOrder)">
        <span>{{getUserName(hostOrder)}}</span>
    </div>
    <div class="dates">{{ getStartDate(hostOrder) }}-{{ getEndDate(hostOrder) }}</div>
<div class="guests">{{ getGuestsAmount(hostOrder) }} </div>
<div class="status" :class="statusClass(hostOrder)">{{ hostOrder.status }}</div>

</section>
</section>


</div>
</template>

<script>
export default {
    name: ' stays-host',

    data() {
        // return {
        //     imageUrl: utilService.getImgUrl(this.hostStay.imgUrls[0]),
        // }
    },
    created() {

    },
    computed: {
        getAddress(stay){
            return stay.loc.address
        },
        pricePerNight(stay){
            return stay.price
        },
       
        getUserStays() {
            return this.$store.getters.stays
        },
        
    },
    methods: {
        getStayName(stay) {
            if (stay.name.length > 13) {
                let desc = stay.name.slice(0, 13) + '...'
                return desc
            }
            return stay.name
        },
        approve() {
            this.hostOrder.status = "approved"
            const order = JSON.parse(JSON.stringify(this.hostOrder))
            this.$store.dispatch({ type: "saveOrder", order })
        },
        decline() {
            this.hostOrder.status = "declined"
            const order = JSON.parse(JSON.stringify(this.hostOrder))
            this.$store.dispatch({ type: "saveOrder", order })
        },
    }
}
</script>

