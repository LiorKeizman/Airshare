<!-- <template>

    <swiper>
        <swiper-slide v-for="(url, idx) in this.urls" ref="labels" :key="url">
            
                <img class="type-img" :src="url" />
                
            
        </swiper-slide>

    </swiper>
     <section class="photo-display" v-html="generatePhotosHtml"></section> -->
<!-- </template> --> -->
<!-- <button class="prev-arrow"></button> -->
<!-- <template>
    <swiper class="swiper"  :modules="modules" :slides-per-view="1" :space-between="10"
    :navigation="true" :breakpoints="{
        300: {
            slidesPerView: 3,
            spaceBetween: 0
        },
        768: {
            slidesPerView: 7,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 13,
            spaceBetween: 20
        }
    }">
        <swiper-slide v-for="(label, idx) in getLabelList" ref="labels" :key="label">
            <div @click="filter(label.propertyType)" class="labels">
                <img class="property-type-img" :src="getImgUrlFilter(label.src)" />
                <span>{{ label.propertyType }}</span>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

export default {
   
    props: ['urls'],
    data() {
        return {

        }
    },
    computed: {
        generatePhoto() {
            this.urls.forEach((url, idx) => {
                if (idx !== 0) {
                    html += `<img class="photo-num-${idx}" src="${url}" alt="image ${idx + 1}">`;
                }
            });
        },
        generatePhotosHtml() {
            let html = `<img class="main-photo" src="" alt=""></div>
                     <div class="photos-group-container"><img class="photo-num-1" src="" alt="">
                     <img class="photo-num-2" src="" alt=""><img class="photo-num-3" src="" alt="">
                     <img class="photo-num-4" src="" alt=""></div>`;

            if (this.urls?.length >= 5) {
                html = '';
                html += `<div class="main-img-container"><img class="main-photo" src="${this.urls[0]}" alt=""></div><div class="photos-group-container">`;
                this.urls.forEach((url, idx) => {
                    if (idx !== 0) {
                        html += `<img class="photo-num-${idx}" src="${url}" alt="image ${idx + 1}">`;
                    }
                });
                html += '</div>'
            }
            return html;
        },
    },
    component: {
        Swiper,
        SwiperSlide
    },
}
</script> -->

<template>
    <section class="photo-display-mobile full">
        <swiper class="swiper" >
            <swiper-slide v-for="(url, idx) in this.urls" ref="urls" :key="url">
                <img class="type-img" :src="url" />
            </swiper-slide>
        </swiper>
    </section>
</template>



 
<script>
// import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default {
    name: 'explore-labels',
    props: ['urls'],
    data() {
        return {
            imgs:["http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437013/gz1hfzv47xzfwcmosadc.jpg","http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437168/vbmfmdmwrxt7xfwbsw7c.jpg","http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436582/vv0y7twjl7zcj9g71sjf.jpg",

"http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg",

"http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437361/h7fdhfrwoo9jtcgwqzn7.jpg"],
                modules: [Navigation],
                labelsList: null,
                filterBy: {
                    propertyType: [],
                },
            };

        },
        created(){
            console.log(this.urls);
        },
        components: {
            Swiper,
            SwiperSlide
        },
    };
</script>

<style></style>