<script>
import { eventBus } from '../services/event-bus.service.js';
import {svgService} from '../services/svg.service.js';


export default {
       props: ['currStay'],
       data(){
              return{
                     currDates: {
                            startDay: 0,
                            endDay: 0,
                            daysNum: 0,
                            isFirst: true,
                     },
                     hasDates: false,
              }
       },
       computed: {
              keyboardSvg(){
                     return svgService.getSvgIcon('keyboardIcon');
              },
              currStayLocation(){
                     let stayLoc = '';
                     if(this.currStay?.loc?.city?.length > 0){
                            stayLoc = this.currStay.loc.city;
                     } else if(this.currStay?.loc?.country?.length > 0){
                            stayLoc = this.currStay.loc.country;
                     } else if(this.currStay?.name?.length > 0){
                            stayLoc = this.currStay.name;
                     }
                     return stayLoc;
              },
              stayStartDate(){
                     return (this.currDates.startDay)? new Date(this.currDates.startDay).toLocaleDateString() : 'starting date';
              },
              stayEndDate(){
                     return (this.currDates.endDay)? new Date(this.currDates.endDay).toLocaleDateString() : 'ending date';
              },
       },
       components:{
                     svgService,
              },
       methods:{
              sendDayToOrder(day){
                     eventBus.emit('getDateFromSchedule', day);
                     this.calcDayNum(day);
              },
              calcDayNum(day){
                     if(this.currDates.isFirst){
                            this.currDates.startDay =  new Date(day.id).getTime();
                            this.currDates.isFirst = false;
                     } else{
                            this.currDates.endDay = new Date(day.id).getTime();
                            this.currDates.isFirst = true;
                            this.currDates.daysNum = Math.ceil((this.currDates.endDay - this.currDates.startDay)/86400000);
                            if(!this.hasDates) this.hasDates=  true;
                     }
              }
              
       }
}
</script>

<template>
       <section class="schedule-display">
              <div class="details-title"> 
                     <div class="schedule-transcription">
                            <span class="night-num">{{currDates.daysNum}}</span>
                            <span> nights in </span>
                            <span class="general-area-name"> {{currStayLocation}}</span>
                     </div>
                     <div class="schedule-dates">
                            <span class="first-night-date">  {{stayStartDate}}  </span>
                            <span class="bar-br" :class="{hide: hasDates}">   -   </span>
                            <span class="last-night-date">  {{stayEndDate}}  </span>
                     </div>
              </div>
              <section class="dates-picker"></section>
              <v-date-picker color="gray" :border="none" :attributes="attrs" trim-weeks is-expanded :locale="locale" mode="date"
              :columns="$screens({ default: 1, lg: 2 })" :rows="1" is-range @dayclick="sendDayToOrder"></v-date-picker>
              <div class="ctrl-panel">
                     <button class="use-keyboard-btn" v-html="keyboardSvg"></button>
                     <button class="clear-btn">Clear dates</button>
              </div>
        </section>
</template>