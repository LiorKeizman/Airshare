import { createApp } from 'vue'

import { SetupCalendar, Calendar, DatePicker } from 'v-calendar'


import { router } from './router.js'
import { store } from './store/store.js'
import VCalendar from 'v-calendar';
import VueClickAway from 'vue3-click-away';

// import HistogramSlider from 'vue-histogram-slider';
// import 'vue-histogram-slider/dist/histogram-slider.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/main.scss'
import './assets/styles/setup/_typography.scss'
import rootCmp from './root-cmp.vue'

import vue3GoogleLogin from 'vue3-google-login'


const app = createApp(rootCmp)
app.use(vue3GoogleLogin, {
    clientId: 'YOUR_GOOGLE_CLIENT_ID'
})
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VCalendar, {});
// app.use(SetupCalendar, {});

app.use(VueClickAway)

// app.component('Calendar', Calendar)
// app.component('DatePicker', DatePicker)

app.mount('#app')
