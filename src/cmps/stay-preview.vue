<template>
    <section class="stay-preview">
        <div @click="setLiked" class="like">
            <span><svg :class="{ liked: isLiked }" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true" role="presentation" focusable="false"
                    style="display: block; fill:rgba(0, 0, 0, 0.5) ; height: 24px; width: 24px; stroke: white; stroke-width: 2; overflow: visible;">
                    <path
                        d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z">
                    </path>
                </svg>
            </span>
        </div>

        <el-carousel @click="showStayDetails" trigger="click" :autoplay="false">
            <el-carousel-item v-for="img in previewImages" :key="img">
                <div class="img-wrapper">
                    <img :src="img" />
                </div>
            </el-carousel-item>
        </el-carousel>
        <!-- <img src='https://res.cloudinary.com/ddt1fjmim/image/upload/v1669798080/001_pxpfis.jpg' -->
        <div class="content">
            <div class="location-info flex justify-space-between">
                <span>{{ currCity }}, {{ currCountry }}</span>
                <div class="stared-con">
                    <span class="stared">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            role="presentation" focusable="false"
                            style="display: block; height: 12px; width: 12px; fill: currentcolor;">
                            <path
                                d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                                fill-rule="evenodd"></path>
                        </svg>
                        <span>
                            {{ currRate }} ({{ getReviewsAmount }})
                        </span>
                    </span>
                </div>
            </div>
            <div class="name-rooms">
                <div>{{ summarySize }}</div>
                <div>{{ currRooms }} rooms, {{ currBeds }} beds</div>
            </div>
            <div class="price">
                <span class="currency">${{ currPrice }}</span>
                <span>night</span>
            </div>
        </div>
        <!-- <div class="content" style="padding: 14px">
            <span>Stay Name: {{ previewStay.name }}</span>
            <span> Price: {{ previewStay.price }}$</span>
            <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button @click="goToEdit" text class="button edit">edit</el-button>
                <el-button @click="goToDetail" text class="button details">details</el-button>
                <el-button @click="removeStay(previewStay._id)" text class="button delete">delete</el-button>
            </div>
        </div> -->
    </section>
</template>
    
<script>
// import { ref } from 'vue'
import { utilService } from '../services/util.service'

export default {
    name: 'stay-preview',
    props: ['previewStay'],
    data() {
        return {
            isLiked: false,
            summary: ''
        }
    },
    created() {
        //
    },
    components: {
        utilService,
    },
    computed: {
        summarySize() {
            if (this.previewStay?.summary?.length > 32) {
                let desc = this.previewStay.summary.slice(0, 32) + '...'
                return this.summary = desc;
            } else if (this.previewStay?.summary) {
                this.summary = this.previewStay.summary
                return this.summary
            }
            return ''
        },
        currCity() {
            return (this.previewStay?.loc?.city?.length > 0) ? this.previewStay.loc.city : '';
        },
        currCountry() {
            return (this.previewStay?.loc?.country?.length > 0) ? this.previewStay.loc.country : '';
        },
        getReviewsAmount(){
            return (this.previewStay.reviews?.length)? this.previewStay.reviews?.length : 0
        },
        currRate() {
            // if (this.previewStay?.reviews.length > 0) {
            //     let starRate = this.previewStay.reviews.reduce((acc, review) => acc + parseFloat(review.starRate), 0) / this.previewStay.reviews.length
            //     return starRate.toFixed(2)
            // }
            if(utilService.getRandomIntInclusive(0,1) === 0){
                return 4.5 + utilService.getRandomIntInclusive(0,5)/10
            }
            return 4.5 + utilService.getRandomIntInclusive(1,50)/100
        },
        currRooms() {
            return (this.previewStay?.bedrooms > 0) ? this.previewStay.bedrooms : '0';
        }, currBeds() {
            return (this.previewStay?.bathrooms > 0) ? this.previewStay.bathrooms : '0';
        }, currPrice() {
            return (this.previewStay?.price > 0) ? this.previewStay.price : '---';
        },
        previewImages() {
            if (this.previewStay?.imgUrls?.length > 0) {
                return [...this.previewStay.imgUrls];
            }
            return null
        }
    },
    methods: {
        setLiked() {
            this.isLiked = !this.isLiked
        },
        showStayDetails() {
            //add event bus
            this.$router.push('/stay/' + this.previewStay._id);
        },
        imageUrl(name) {
            return new URL(`/src/img/${name}.jpg`, import.meta.url)
        },
        goToDetail() {
            this.$router.push(`/stay/${this.previewStay._id}`)
        },
        goToEdit() {
            this.$router.push(`/stay/edit/${this.previewStay._id}`)
        },
        removeStay(stayId) {
            this.$emit('removeStay', stayId)
        }
    }
}
</script>
  
<style>
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}
</style>