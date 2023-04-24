<template>
    <!-- <div v-if="labelsLoaded"> -->
        <swiper v-if="labelsLoaded" class="swiper" :modules="modules" :slides-per-view="13" :space-between="20" :navigation="true" :breakpoints="{
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
            <swiper-slide v-if="getLabelList" v-for="(label, idx) in labelsLoaded" ref="labels" :key="label">
                <div @click="filter(label.propertyType)" class="labels">
                    <img class="property-type-img" :src="getImgUrlFilter(label.src)" />
                    <span>{{ label.propertyType }}</span>
                </div>
            </swiper-slide>
        </swiper>
    <!-- </div> -->
</template>

<!-- 
<script setup>
import { ref, onMounted } from 'vue';

const el = ref();

onMounted(() => {
  setTimeout(() => {
    const prev = document.querySelector('.swiper-button-prev');
    // prev.style.visibility = 'hidden';
    const next = document.querySelector('.swiper-button-next');
    next.addEventListener('click', e => {
    prev.style.visibility = 'visible';
  });
  }, 100);
  
});
</script>
  -->
<script>
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


export default {
    name: 'explore-labels',
    data() {
        return {

            modules: [Navigation],
            labelList: null,
            filterBy: {
                propertyType: [],
            },




        };

    },
    methods: {
        filter(value) {
           
            this.filterBy.propertyType = []
            this.filterBy.propertyType.push(value)
            this.$router.push({ path: '/home', query: { ...this.filterBy } });
            this.$store.dispatch({ type: 'setFilter', filterBy: this.filterBy });
        },
        getImgUrlFilter(file) {
            const imgUrl = new URL(`../assets/labels-img/${file}`, import.meta.url);
            return imgUrl;
        }
    },
    // mounted() {
    //     this.$store.dispatch({ type: 'setLabelsList' });
    // },
    created() {
        this.$store.dispatch({ type: 'setLabelsList' });
    },
    computed: {
        getLabelList() {
            return this.$store.getters.getLabels;
        },
        labelsLoaded() {
            let arr = this.$store.getters.getLabels
           if(arr){
               return arr;
           }
           return
        }
    },
    components: {
        Swiper,
        SwiperSlide
    },
};
</script>

<style></style>
  