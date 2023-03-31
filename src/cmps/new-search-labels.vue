<template>
    
    <swiper class="swiper"  :modules="modules" :slides-per-view="13" :space-between="10"
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
                labelsList: null,
                filterBy: {
                    propertyType: [],
                },




            };

        },
            methods: {
            filter(value) {

                this.filterBy.propertyType = []
                this.filterBy.propertyType.push(value)
                console.log("🚀 ~ file: search-labels.vue:77 ~ filter ~ filterBy", this.filterBy)
                this.$router.push({ path: '/', query: { ...this.filterBy } });
                this.$store.dispatch({ type: 'setFilter', filterBy: this.filterBy });
            },
            getImgUrlFilter(file) {
                const imgUrl = new URL(`../assets/labels-img/${file}`, import.meta.url);
                return imgUrl;
            }
        },

        created() {
            this.$store.dispatch({ type: 'setLabelsList' });
        },
        computed: {
            getLabelList() {
                return this.$store.getters.getLabels;
            }
        },
        components: {
            Swiper,
                SwiperSlide
        },
    };
</script>

<style></style>
  