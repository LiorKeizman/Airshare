<script>

export default {
       props: ['urls'],
       data(){
              return {

              }
       },
       computed:{
              generatePhotosHtml(){
                     let html = `<img class="main-photo" src="" alt=""></div>
                     <div class="photos-group-container"><img class="photo-num-1" src="" alt="">
                     <img class="photo-num-2" src="" alt=""><img class="photo-num-3" src="" alt="">
                     <img class="photo-num-4" src="" alt=""></div>`;

                     if (this.urls?.length >= 5){
                            html = '';
                            html += `<div class="main-img-container"><img class="main-photo" src="${this.urls[0]}" alt=""></div><div class="photos-group-container">`;
                            this.urls.forEach((url, idx) => {
                                   if(idx !== 0){
                                          html += `<img class="photo-num-${idx}" src="${url}" alt="image ${idx + 1}">`;
                                   }
                            });
                            html += '</div>'
                     }
              return html;
              },
       },
}
</script>

<template>
       <section class="photo-display" v-html="generatePhotosHtml"></section>
</template>