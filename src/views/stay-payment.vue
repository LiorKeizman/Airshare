<template>
    <div v-if="!desktop" class="back-payment">
        <section class="top-bar-details">
            <div class="home-btn-back">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                    focusable="false"
                    style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 4; overflow: visible;">
                    <g fill="none">
                        <path
                            d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932">
                        </path>
                    </g>
                </svg>
                <button @click="backToDetails" class="home-back">Back</button>
            </div>
        </section>
    </div>
    <section class="payment-page">
        <div class="left-side">

            <div class="payment-title">
                <h1>Thank you for booking</h1>
            </div>
            <section class="good-deal">
                <div class="title" v-html="dealAndDiamond">
                </div>
                <div class="deal-content">
                    <p>Your dates are <span>${{ getDiscount }}</span> less than the avg. nightly rate over the last 3 months.
                    </p>
                </div>
            </section>

            <section class="trip-display">
                <h2>Your trip</h2>
                <div class="trip-dates">
                    <h1>Dates</h1>
                    <div class="dates">
                        {{ setDatesStart }} -
                        {{ setDatesEnd }}
                    </div>
                </div>

                <div class="trip-guests">
                    <h1>Guests</h1>
                    <div class="guests">
                        {{ guests }} guests
                    </div>
                </div>

            </section>
            <div @click="backToPage" class="btn-container">
                <div v-for="i in 100" class="cell"></div>
                <div class="content">
                    <button type="submit" class="action-btn">
                        <span>Look for more homes</span>
                    </button>
                </div>
            </div>
        </div>

        <section class="price-details">
            <div class="top-section">

                <div class="details-img">
                    <img :src="setImg">
                </div>
                <div class="second">
                    <div class="host-img">
                        <!-- <img :src="setHostImg"> -->
                    </div>

                    <div class="stay-name">{{ setName }}
                    </div>
                </div>
            </div>
            <div class="middle-section">
                <div class="text">Your booking is protected by
                    <img src="https://res.cloudinary.com/dj88xudav/image/upload/v1670001241/share-cover_drqj1d.png"
                        alt="share-cover" class="share-cover-img" />
                </div>
            </div>
            <div class="bottom-section">
                <div class="bottom-title">
                    <h1>Price details</h1>
                </div>
                <div class="price">
                    <span>price for {{ totalNights }} nights </span>
                    <span>${{ basePrice }} </span>
                </div>
                <div class="price">
                    <span>Cleaning fee </span>
                    <span>${{ cleaningPrice }} </span>
                </div>
                <div class="price">
                    <span>Service fee </span>
                    <span>${{ servicesPrice }} </span>
                </div>
                <div class="price">
                    <span>Taxes </span>
                    <span>${{ taxesPrice }} </span>
                </div>
                <div class="price total">
                    <span>Total price </span>
                    <span>${{ totalPrice }} </span>
                </div>

            </div>

        </section>

    </section>
</template>
<script>
import { utilService } from '../services/util.service.js'
import { ElMessage } from 'element-plus';
import { svgService } from '../services/svg.service.js';

export default {
    data() {
        return {
            desktop: window.innerWidth > 780 ? true : false,
            currStay: null,
            host: null,
            order: null,
            guests: 0
        }

    },
    created() {
        this.$store.dispatch({ type: "getOrderById", orderId: this.$route.params.id });
        // currOrder.then(res => this.setOrder(res))
        // console.log(this.setOrder.stay);
        // this.oreder = currOrder
    },
    computed: {
        dealAndDiamond() {
            return `<h3>Good price</h3> ${svgService.getSvgIcon('diamond')}`;
        },
        basePrice() {
            return (this.setOrder?.priceObj?.basePrice) ? this.setOrder.priceObj.basePrice.toLocaleString() : ''
        },
        servicesPrice() {
            return (this.setOrder?.priceObj?.serviceFee) ? this.setOrder.priceObj.serviceFee.toLocaleString() : ''
        },
        cleaningPrice() {
            return (this.setOrder?.priceObj?.CleaningFee) ? this.setOrder.priceObj.CleaningFee.toLocaleString() : ''
        },
        taxesPrice() {
            return (this.setOrder?.priceObj?.taxes) ? this.setOrder.priceObj.taxes.toLocaleString() : ''
        },
        totalPrice() {
            return (this.setOrder?.totalPrice) ? this.setOrder.totalPrice.toLocaleString() : ''
        },
        setName() {
            return (this.setOrder?.stay?.name) ? this.setOrder.stay.name : ''
        },
        setOrder() {
            return this.$store.getters.getCurrOrder
        },
        getDiscount() {
            return utilService.getRandomIntInclusive(100, 250)
        },
        stayName() {
            return (this.currStay) ? this.currStay.name : this.stayName;
        },
        setHostImg() {
            return 'https://res.cloudinary.com/sprint4-triman/image/upload/v1669793675/elon_mask_ltbtp6.jpg'
        },
        totalNights() {
            let timeStart = (this.setOrder?.startDate) ? this.setOrder.startDate : ''
            let timeEnd = (this.setOrder?.endDate) ? this.setOrder.endDate : ''
            let time = timeStart - timeEnd
            let days = (time * - 1) / (1000 * 60 * 60 * 24)

            const { adults, children, infants, pets } = (this.setOrder?.guests) ? this.setOrder?.guests : ''
            let guests = adults + children + infants + pets
            this.guests = guests
            return days
        },
        setDatesStart() {
            let dateStart = new Date((this.setOrder?.startDate) ? this.setOrder.startDate : '')
            let date = dateStart.toLocaleDateString()
            return date
        },
        setDatesEnd() {
            let dateEnd = new Date((this.setOrder?.endDate) ? this.setOrder.endDate : '')
            let date = dateEnd.toLocaleDateString()
            return date
        },
        setImg() {
            return (this.setOrder?.stay?.img[0]) ? this.setOrder.stay.img[0] : ''
        },

    },
    methods: {
        backToDetails() {
            this.$router.push('/stay/' + this.setOrder.stay._id)
        },
        backToPage() {
            this.$router.push('/')
            ElMessage.success('Order sent!')
        },
    },
    components: {
        svgService,
        ElMessage,
        utilService
    }

}

</script>