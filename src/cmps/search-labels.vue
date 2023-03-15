<template >
  <div class="labels-container">

    <carousel v-if="getLabelList" :settings="settings" :breakpoints="breakpoints" :adjustable-height="true" :transition="300"
      :items-to-show="10" snapAlign="start">
      <slide v-for="(label, idx) in getLabelList" ref="labels" :key="label" >
        <div @click="filter(label.propertyType)" class="labels">
          <img class="property-type-img" :src="utilService.getImgUrlFilter(label.src)" />
          <span>{{ label.propertyType }}</span>
        </div>
      </slide>

      <template #addons>
        <navigation ref="el" />
      </template>
    </carousel>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';

const el = ref();

onMounted(() => {
  setTimeout(() => {
    const prev = document.querySelector('.carousel__prev');
    prev.style.visibility = 'hidden';
    const next = document.querySelector('.carousel__next');
    next.addEventListener('click', e => {
    prev.style.visibility = 'visible';
  });
  }, 100);
  
});
</script>
  
<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { utilService } from '../services/util.service.js';

export default {
  name: 'explore-labels',
  data() {
    return {
      labelsList: null,
      filterBy: {
        propertyType: [],
      },
      // carousel settings
      settings: {
        itemsToShow: 3,
        itemsToScroll: 3,
        snapAlign: "center"
      },
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 7,
          itemsToScroll: 4,
          snapAlign: 'center',
        },
        // 1024 and up
        1024: {
          itemsToShow: 13,
          itemsToScroll: 4,
          snapAlign: 'start',
        },
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
  },

  created() {
    this.$store.dispatch({type:'setLabelsList'});
  },
  computed: {
    getLabelList(){
      return this.$store.getters.getLabels;
    }
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
};
</script>

<style>

</style>
  