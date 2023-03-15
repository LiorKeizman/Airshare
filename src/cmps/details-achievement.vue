<script>
import {svgService} from '../services/svg.service.js';
export default {
              props: ['achievelist'], 
              computed: {
                achievementHtml(){
                    let str = '<div class="empty-achievement"></div>';
                    if(this.achievelist?.length > 0){
                        str = '';
                        this.achievelist.forEach(achievement => {
                           if(achievement.achievementDescription?.length < 1){
                                str += `<div class="stay-achievement">${svgService.getSvgIcon(achievement.iconName)}
                                    <span class="achievement-explanation">${achievement.achievementName}</span></div>`;
                            } else if(achievement.iconName === 'supremeHost' || achievement.iconName === 'experiencedHost'){
                                str += `<div class="stay-achievement">${svgService.getSvgIcon(achievement.iconName)}
                                <span class="achievement-title">${achievement.hostName + ' ' + achievement.achievementName}</span>
                                <span class="achievement-description">${achievement.achievementDescription}</span></div>`;
                            } else {
                                str += `<div class="stay-achievement">${svgService.getSvgIcon(achievement.iconName)}
                                <span class="achievement-title">${achievement.achievementName}</span>
                                <span class="achievement-description">${achievement.achievementDescription}</span></div>`;
                            }
                        });
                    }
                    return str;
                }
              },
              components:{
                     svgService,
              }
       }
</script>

<template>
       <section class="achievement-display" v-html="achievementHtml">
        </section>
</template>