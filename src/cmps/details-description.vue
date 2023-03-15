<script>
import {detailsTextService} from '../services/stay-details-text.service.js';
import { svgService } from '../services/svg.service.js';

export default {
              props: ['descriptionTxt'],
              data(){
                return{
                        containerWidth: 0,
                        currFontSize: 0,
                        linesNum: 5,
                }
              },
              mounted(){
                const elTxtContainer = this.$refs.descriptionNode;
                this.containerWidth = elTxtContainer.offsetWidth;
                this.currFontSize = parseFloat(window.getComputedStyle(elTxtContainer, null).getPropertyValue('font-size'));
              },
              computed: {
                descriptionHtml(){
                        let currText = '';
                        let maxLettersPerLine  = 0;
                        const currLines = [];
                        const bios = 2.2;

                        if(this.descriptionTxt?.length > 5 && this.containerWidth !== 0 && this.currFontSize !== 0){
                                currText += this.descriptionTxt;
                                maxLettersPerLine = Math.floor(this.containerWidth / this.currFontSize*bios);
                                
                                let idx = 0;
                                if(currText.length > (maxLettersPerLine * this.linesNum)){
                                        idx = currText.indexOf('.', (maxLettersPerLine * this.linesNum));
                                        currText = currText.substring(0,idx) + '...';
                                }

                                
                                let quitWhile = false;
                               
                                while(!quitWhile){
                                        if(currText.length <= maxLettersPerLine){
                                                currLines.push(currText);
                                                quitWhile = true;
                                                break;
                                        }
                                        
                                        idx = 0;
                                        idx = currText.lastIndexOf('.', maxLettersPerLine);
                                        if(currText.lastIndexOf(',', maxLettersPerLine) > idx){
                                                idx = currText.lastIndexOf(',', maxLettersPerLine);
                                        }
                                        if(currText.lastIndexOf(' ', maxLettersPerLine) > idx){
                                                idx = currText.lastIndexOf(' ', maxLettersPerLine);
                                        }

                                        currLines.push(currText.substring(0,idx));
                                        currText = currText.substring(idx, currText.length);
                                }
                        }
        
                    return `<div class="short-description"> ${currLines.join('\n')}</div><button class="show-more-btn"> Show more ${svgService.getSvgIcon('rightArrow')}</button>`
                }
              },
              components:{
                        detailsTextService,
                        svgService,
              }
       }
</script>

<template>
        <section class="description-display" ref="descriptionNode" v-html="descriptionHtml">
        </section>
</template>