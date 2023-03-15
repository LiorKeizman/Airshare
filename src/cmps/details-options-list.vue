<script>
import { svgService } from '../services/svg.service.js';

export default {
    props: ['amenitiesList'],
    data(){
        return {
            currAmenities: [],
        }
    }, 
    computed: {
        amenitiesListHtml(){
            let html = '';
            if(this.currAmenities?.length > 0){
                let amenitiesLength = (this.currAmenities.length < 10)? this.currAmenities.length : 10;
                for (let i = 0; i < amenitiesLength; i++) {
                    html +=  `<div class="amenitie-wrapper"> ${svgService.getSvgIcon(this.currAmenities[i].svgName)}<span class="icon-txt">${this.currAmenities[i].txt}</span></div>`;
                }
            }
            return html
        },

       svgAirConditioner(){
              const svgHtml = `AC - split type ductless system`;
            return  svgHtml ;
        }
    },
    watch:{
        amenitiesList:{
            handler(newValue){
                this.currAmenities = newValue
            },
            deep:true
        }
    },
    // created(){
    //     console.log(this.amenitiesList)
    //     this.currAmenities = this.amenitiesList
    // },
    // watch:{
    //     amenitiesList:{
    //         handler(newVal) {
    //             console.log(newVal)
    //             if(newVal?.length > 0 ){
    //                 this.currAmenities = [...newVal];
    //             }
    //             // .then();
               
    //         },
    //         deep: true
    //     }
    // },
    components:{
        svgService,
    }
}
</script>

<template>
       <section class="options-icons-display">
            <div class="options-title">What this place offers</div>
            <div class="options-icon-container" v-html="amenitiesListHtml">
            </div>
        </section>
</template>