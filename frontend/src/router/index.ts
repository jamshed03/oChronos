import { createWebHashHistory, createRouter } from 'vue-router'

import Home from '../pages/Home.vue'
import GesamteZeit from '../pages/ListOfTimes.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/list', component: GesamteZeit },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
