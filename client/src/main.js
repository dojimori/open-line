import { createApp } from 'vue'
import App from './App.vue'
import './app.css'
import { MotionPlugin } from '@vueuse/motion'
import { router } from './router'
import { createStore } from 'vuex'
// import userApi from './utils/api/user.api'
import { store } from './utils/store'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
.use(MotionPlugin)
.use(pinia)
.use(router)
.mount('#app')
