<script>
import { utilService } from '../services/util.service';
import { stayService } from '../services/stay.service.js';
import { svgService } from '../services/svg.service.js';
import detailsAchievements from '../cmps/details-achievement.vue';
import detailsOptionsList from '../cmps/details-options-list.vue';
import detailsReviewMobile from '../cmps/details-review-mobile.vue';
import detailsPhotosDisplay from '../cmps/details-photos-display.vue';
import detailsDescription from '../cmps/details-description.vue';
// import detailsSchedule from '../cmps/details-schedule.vue';
// import detailsOrder from '../cmps/details-order.vue';
import mobileDetailsPhotos from '../cmps/mobile-details-photos.vue'
// import { fakeReviews } from '../services/stay.service.local.js'; //remove me

export default {
    data() {
        return {
            rangeDate: {
                start: 0,
                end: 0,
            },
            currDates: {
                startDay: 0,
                endDay: 0,
                daysNum: 0,
                isFirst: true,
            },
            hasCalcPrice: false,
            priceObj: {
                basePrice: 0,
                CleaningFee: 572 + utilService.getRandomIntInclusive(-70, 70),
                serviceFee: 0,
                taxes: 0,
                priceSum: 0
            },
            isConfirm: false,
            isShow: false,
            guestsObj: {
                adults: 1,
                children: 0,
                infants: 0,
                pets: 0,
            },
            currStay: null,
            host: null,
            hostImg: 'https://res.cloudinary.com/sprint4-triman/image/upload/v1669793675/elon_mask_ltbtp6.jpg'
        }
    },
    created() {
        this.$store.dispatch({ type: "loadAndWatchUser", userId: this.loggedinUser._id })
            ; (async () => {
                try {
                    this.currStay = await stayService.getById(this.$route.params.id, 'stays-db');
                    //console.log('Stay from params:', this.currStay );
                } catch (err) {
                    console.log('details page: can\'t get stay by using this id ', err);
                    throw err;
                }
            })();

        ; (async () => {
            try {
                this.host = await stayService.getById(this.$route.params.id, 'stays-owner');
                console.log('host from params:', this.host);
            } catch (err) {
                console.log('details page: can\'t get user by using this id ', err);
                throw err;
            }
        })();

    },
    methods: {
        sendOrder() {

            let currOrder = {
                createdAt: Date.now(),
                totalPrice: this.totalPrice,
                startDate: this.currDates.startDay,
                endDate: this.currDates.endDay,
                status: 'pending', // empty, pending, approved
                guests: {
                    adults: this.guestsObj.adults,
                    children: this.guestsObj.children,
                    infants: this.guestsObj.infants,
                    pets: this.guestsObj.pets
                },
                stay: {
                    _id: this.currStay._id,
                    name: this.currStay.name,
                    img: this.currStay.imgUrls,
                    address: this.currStay.loc.address
                },
                host: {
                    id: this.currStay.host.id,
                    imgUrl: this.currStay.host.pictureUrl,
                    fullname: this.currStay.host.name,
                },
                buyer: {
                    _id: this.currUser._id,
                    fullname: this.currUser.name,
                    imgUrl: this.currUser.imgUrl,
                },
                priceObj: {
                    basePrice: this.priceObj.basePrice,
                    CleaningFee: this.priceObj.CleaningFee,
                    serviceFee: this.priceObj.serviceFee,
                    taxes: this.priceObj.taxes,
                },
                msgs: [],
            }
            let order = this.$store.dispatch({ type: "saveOrder", order: currOrder });
            order.then(res => this.$router.push('/payment/' + res._id))
            // ElMessage.success('Confirm order!')

        },
        calcPayments() {
            if (this.hasCalcPrice) {
                let pricePerDay = this.pricePerNight;
                this.priceObj.basePrice = this.currDates.daysNum * pricePerDay;
                this.priceObj.serviceFee = parseFloat(((this.priceObj.basePrice + this.priceObj.CleaningFee) * 1 / 7.05).toFixed(2));
                this.priceObj.taxes = parseFloat(((this.priceObj.basePrice + this.priceObj.CleaningFee + this.priceObj.serviceFee) * 0.07).toFixed(2));
            }
        },
        onDatePicked(day) {
            if (this.currDates.isFirst) {
                this.currDates.startDay = new Date(day.id).getTime();
                this.currDates.isFirst = false;
            } else {
                this.currDates.endDay = new Date(day.id).getTime();
                this.currDates.isFirst = true;
                this.hasCalcPrice = true;
                this.currDates.daysNum = (Math.ceil((this.currDates.endDay - this.currDates.startDay) > 0)) ?
                    Math.ceil((this.currDates.endDay - this.currDates.startDay) / 86400000) : '';
                this.calcPayments();
            }

            if (this.currDates.endDay + this.currDates.startDay !== 0) this.error = '';
        },
        backToPage() {
            this.$router.push('/')
        },
    },
    computed: {
        currUser() {
            return this.$store.getters.watchedUser
        },
        pricePerNight() {
            return (this.currStay?.price) ? this.currStay.price : '0'
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        },
        stayName() {
            return (this.currStay) ? this.currStay.name : this.stayName;
        },
        staySummary() {

            if (this.currStay === null || this.currStay?.summary?.length < 1) return;

            let { summary } = this.currStay;

            if (summary.length > 60) {
                let idx = 100;

                while (summary.length > 60) {
                    idx = summary.lastIndexOf(',');
                    if (idx === -1) {
                        idx = summary.lastIndexOf(' ');

                        if (idx === -1) summary = '';
                        summary = summary.substring(0, idx)
                    }
                    summary = summary.substring(0, idx)
                }
            }
            return summary;
        },
        starRate() {
            return svgService.getSvgIcon('blackStarIcon') + `<span>${this.calcStarRate}</span>`;
        },
        superHostMedal() {
            return svgService.getSvgIcon('medalIcon');
        },
        stayGuests() {
            return (this.currStay?.capacity > 0) ? this.currStay.capacity : '0';
        },
        stayBedrooms() {
            return (this.currStay?.bedrooms > 0) ? this.currStay.bedrooms : '0';
        },
        stayBeds() {
            return (this.currStay?.beds > 0) ? this.currStay.beds : '0';
        },
        stayBaths() {
            return (this.currStay?.bathrooms > 0) ? this.currStay.bathrooms : '0';
        },
        stayAmenities() {
            return (this.currStay?.amenities.length > 0) ? this.currStay.amenities : [];
        },
        calcStarRate() {
            let rate = 0;
            if (this.currStay?.reviews?.length > 0) {
                rate = this.currStay.reviews.map((review) => {
                    return parseFloat(review.starRate);
                });
                rate = (rate.reduce((acc, num) => { return acc + num }, 0) / this.currStay.reviews.length).toFixed(2);
            }
            return rate + '';
        },
        reviewsCount() {
            return this.currStay?.reviews?.length || 0;
        },

        imagesUrls() {
            const img = (this.currStay?.imgUrls?.length > 0) ? this.currStay.imgUrls : [];
            return img
        },
        hostImg() {
            return (this.currStay?.host?.pictureUrl) ? this.currStay.host.pictureUrl : 'https://res.cloudinary.com/sprint4-triman/image/upload/v1669793675/elon_mask_ltbtp6.jpg'
        },
        hostedBy() {
            return (this.currStay?.host?.name) ? this.currStay.host.name : '';
        },
        stayAchievements() {
            return (this.currStay?.achievements?.length > 0) ? this.currStay.achievements : [];
        },
        stayDescription() {
            if (this.currStay?.summary?.length > 0) {
                let { summary } = this.currStay;
                return summary;
            }
            return '';
        },
        shareBtnTxt() {
            return svgService.getSvgIcon('shareIcon') + '<span> Share </span>';
        },
        saveBtnTxt() {
            return svgService.getSvgIcon('emptyHeart') + '<span> Save </span>';
        },
        reviewsObject() {
            if (this.currStay?.reviews?.length) {
                return JSON.parse(JSON.stringify(this.currStay.reviews));
            }
            return [];
        },
        locAddress() {
            return (this.currStay?.loc?.address?.length > 0) ? this.currStay?.loc?.address : ' ';
        },
        btnStatus() {
            return (this.currDates.startDay + this.currDates.endDay !== 0) ? '<span>Reserve</span>' : '<span>Check availability</span>';
        },
    },

    components: {
        svgService,
        stayService,
        detailsAchievements,
        detailsOptionsList,
        detailsPhotosDisplay,
        detailsDescription,
        mobileDetailsPhotos,
        detailsReviewMobile,

    }
}

</script>


<template>
    <section class="details-page mobile-page">
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
                <button @click="backToPage" class="home-back">Home</button>
            </div>
            <div class="icons-div">
                <button class="details-btn share" v-html="shareBtnTxt"></button>
                <button class="details-btn save" v-html="saveBtnTxt"></button>
            </div>
        </section>
        <mobile-details-photos :urls="imagesUrls" />
        <div class="big-container">

            <section class="short-display-mobile">
                <div class="name">{{ stayName }}</div>
                <div class="short-container">
                    <div class="upper-icons">
                        <div class="star-score" v-html="starRate"></div> ·
                        <div class="reviews-count">reviews {{ reviewsCount }}</div> ·
                        <div class="host-medal"></div>
                        <div class="host-level">Superhost</div> ·
                    </div>

                    <div class="area-scope-labels">{{ locAddress }}</div>
                    <!-- <div class="area-scope-labels" v-html="labelsTxt"></div> -->
                </div>
                <!-- <button class="details-btn share" v-html="shareBtnTxt"></button>
                                    <button class="details-btn save" v-html="saveBtnTxt"></button> -->
            </section>
            <main class="sticky-and-more-details-mobile">
                <!-- <details-order :orderStay="this.currStay" /> -->
                <section class="details-display">
                    <div class="details-summary">The house is hosted by {{ hostedBy }}</div>
                    <div class="details-container">
                        <div class="guests-count"> {{ stayGuests }} guests · </div>
                        <div class="bedrooms-count">{{ stayBedrooms }} bedrooms · </div>
                        <div class="beds-count">{{ stayBeds }} beds · </div>
                        <div class="bath-count">{{ stayBaths }} baths</div>
                    </div>
                    <div class="user-icon">
                        <img :src="hostImg" alt="">
                    </div>
                </section>
                <details-achievements :achievelist="stayAchievements" />
                <section class="share-cover">
                    <img src="https://res.cloudinary.com/dj88xudav/image/upload/v1670001241/share-cover_drqj1d.png"
                        alt="share-cover" class="share-cover-img" />
                    <div class="share-cover-txt">Every booking includes free protection from Host cancellations, listing
                        inaccuracies, and other issues like trouble checking in.</div>
                    <button class="share-cover-btn">Learn more</button>
                </section>
                <!-- <v-date-picker v-model.range="range" mode="dateTime" /> -->
                <details-description :descriptionTxt="stayDescription" />
                <div class="date">
                    <v-date-picker v-model.range="rangeDate" color="gray" is-range @dayclick="onDatePicked"></v-date-picker>
                </div>


                <details-options-list :amenitiesList="stayAmenities" />
                <!-- <details-schedule :currStay="currStay" /> -->
            </main>
            <div class="sticky-scroll-end"></div>
            <div class="deal full">
                <div class="total-price"><span class="total" >Total</span><span>${{ this.priceObj.basePrice.toLocaleString() }}</span></div>
                <div @click="sendOrder" ref="elOrderBtn" class="btn-container">
                    <div v-for="i in 100" class="cell"></div>
                    <div class="content">
                        <button type="submit" class="action-btn" v-html="btnStatus"></button>
                    </div>
                </div>
            </div>
            <!-- <details-review-mobile :reviewsList="reviewsObject" /> -->
        </div>
    </section>
</template>

