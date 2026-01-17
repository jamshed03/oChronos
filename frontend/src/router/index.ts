import { createWebHistory, createRouter } from 'vue-router'

import Home from '../pages/Home.vue'
import GesamteZeit from '../pages/ListOfTimes.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/list-of-times', component: GesamteZeit },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
