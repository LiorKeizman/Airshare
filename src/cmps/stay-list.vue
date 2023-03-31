<template>
    <section class="stay-list-container">
      <ul class="stay-list clean-list stay-list-layout">
        <stay-preview v-for="stay in currStays" :key="stay._id" :previewStay="stay" />
      </ul>
    </section>
  </template>
  
  <script>
  import stayPreview from "./stay-preview.vue"

  export default {
    props:['currStays'],
    components: {
      stayPreview,
    },
    methods: {
      toAddStay() {
        this.$router.push("/stay/edit")
      },
    },
  }
  </script>
  <style>
  .stay-list-container a {
    margin-bottom: 10px;
    display: inline-block;
  }
  </style>
  