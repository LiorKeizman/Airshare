
<template>
    <section class="reviews-display">
         <div class="details-title" v-html="svgBlackStar">
         </div>
         <div class="stay-attributes" v-html="stayAttributesHtml">
         </div>
         <div class="stay-reviews-board" ref="reviewsBoardContainer" v-html="reviewsBoardHtml">
         </div>
     </section>
</template>

<script>
import {svgService} from '../services/svg.service.js';

export default {
    props: ['reviewsList'],
    data(){
        return {
            currStayReviews: [],
            currStayStarRating: 0,
            currStayAttributes: {
                cleanlinessRating: 0,
                communicationRating: 0,
                checkInRating: 0,
                accuracyRating: 0,
                locationRating: 0,
                valueRating: 0,
            },
            reviewsUsers: [],
        }
    },
    methods:{
        getReviewTxt(idx){
                var currTxt = '';
                if(this.reviewsList[idx]?.content?.length > 0){
                    var currLines = [];
                    currTxt = this.reviewsList[idx].content;
                 
                    if(this.reviewWidth > 0){
                    
                        let fontSize = parseFloat(window.getComputedStyle(this.$refs.reviewsBoardContainer, null).getPropertyValue('font-size'));
                        let maxLettersPerLine = (this.reviewWidth / fontSize)
                        let quitWhile = false;
                        let strIdx;

                        while(!quitWhile){
                            
                            if(currTxt.length < maxLettersPerLine){
                                quitWhile = true;
                                break;
                            }

                            strIdx = 0;
                            strIdx = currTxt.lastIndexOf('.', maxLettersPerLine);

                            if(currTxt.lastIndexOf(',', maxLettersPerLine) > strIdx){
                                strIdx = currTxt.lastIndexOf(',', maxLettersPerLine);
                            }

                            if(currTxt.lastIndexOf(' ', maxLettersPerLine) > strIdx){
                                strIdx = currTxt.lastIndexOf(' ', maxLettersPerLine);
                            }

                            // currLines.push(currTxt.substring(0,strIdx));
                            currTxt = currTxt.substring(strIdx, currTxt.length);
                            
                        }
                        
                        currTxt = '';
                        for (let i = 0; i < 10; i++) {
                            if(currLines[i]){
                                currTxt += currLines[i];
                            }
                        }

                        if(currTxt[currTxt.length -1] !== '.' && currTxt[currTxt.length -1] !== ','){
                            currTxt += '.';
                        }
                        
                    }
                }
                return currTxt;
            },
            getDateMonthNYear(currDate){
                return new Date(currDate).toLocaleString('default', { month: 'long' }) + ' ' + new Date(currDate).getFullYear();
            },
        },
        
    computed: {
        reviewWidth(){
            let currWidth = 0;
            if(this.$refs?.reviewsBoardContainer){
                currWidth = (this.$refs.reviewsBoardContainer.offsetWidth/2)*0.8
            }
            return currWidth;
        },
    svgBlackStar(){
            const svgHtml = svgService.getSvgIcon('blackStarIcon') + `<span class="average-reviews">${this.currStayStarRating}</span>·
            <span class="reviewers-count">${this.currStayReviews.length}</span>reviews`
            return svgHtml;
        },
        stayAttributesHtml(){
            let strHtml = '' 
            if(this.currStayReviews?.length > 0 ){
                let attrStr = '';
                let idx = -1;
                strHtml = '<section class="attr-group">'
                for (const key in this.currStayAttributes) {
                    attrStr = key +'';
                    idx = attrStr.indexOf('Rating');
                    attrStr = attrStr.substring(0, 1).toLocaleUpperCase() + attrStr.substring(1,idx);
                    if(attrStr === 'CheckIn'){attrStr = 'Check-in';}
                   strHtml += `<div class="attribute"><label class="attribute-name">${attrStr}</label><div class="attr-bar"><span class="attr-score-bar"></span>
                    <span class="attr-score-value" style="width: calc(120px * ${this.currStayAttributes[key]}/5)"></span>
                    <span class="attr-score-num">${this.currStayAttributes[key]}</span></div></div>`;
                    if(attrStr === 'Check-in'){strHtml += '</section><section class="attr-group">';}
                }
                strHtml += '</section>';
               
            }
            return strHtml;
        },
        reviewsBoardHtml(){
            let strHtml = '';
            if(this.reviewsList.length > 0){
                for (let i = 0; i < 6; i++) {
                    if(this.reviewsList[i]){
                        strHtml += `<div class="review-item"><div class="user-card"><img class="user-image" src="${this.reviewsList[i].user.imgUrl}">
                            <span class="user-name">${this.reviewsList[i].user.name}</span>
                            <span class="post-date">${this.getDateMonthNYear(this.reviewsList[i].reviewPostDate)}</span></div>
                            <div class="review-content" style="width: ${this.reviewWidth}px">${this.getReviewTxt(i)}</div></div>`;
                    }
                }
            }
            return strHtml;
        },

    }, 
    watch:{
        reviewsList:{
            handler(newVal, oldVal) {
                if(newVal?.length > 0){
                    this.currStayStarRating = (newVal.reduce((acc, review) => acc + parseFloat(review.starRate), 0)/newVal.length).toFixed(2) ;
                    this.currStayAttributes.cleanlinessRating = (newVal.reduce((acc, review) => acc + parseFloat(review.attributes.cleanliness), 0)/newVal.length).toFixed(2);
                    this.currStayAttributes.communicationRating = (newVal.reduce((acc, review) => acc + parseFloat(review.attributes.communication), 0)/newVal.length).toFixed(2);
                    this.currStayAttributes.checkInRating = (newVal.reduce((acc, review) => acc += parseFloat(review.attributes.checkIn), 0)/newVal.length).toFixed(2);
                    this.currStayAttributes.accuracyRating = (newVal.reduce((acc, review) => acc += parseFloat(review.attributes.accuracy), 0)/newVal.length).toFixed(2);
                    this.currStayAttributes.locationRating = (newVal.reduce((acc, review) => acc += parseFloat(review.attributes.location), 0)/newVal.length).toFixed(2);
                    this.currStayAttributes.valueRating = (newVal.reduce((acc, review) => acc += parseFloat(review.attributes.value), 0)/newVal.length).toFixed(2);
                    this.currStayReviews = newVal;
                }
            },
            deep: true
        }
    },
    components:{
        svgService,
    },
}
</script>
