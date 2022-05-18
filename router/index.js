import vue from 'vue'
import VueRouter from "vue-router"
import Main from "../views/Main";
import Home from "../views/home/index";
import User from "../views/user/index";

vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home,
            },
            {
                path: '/user',
                name: 'user',
                component: User,
            }
        ]
    }
]
const router = new VueRouter({
    model: 'history',
    routes
})

export default router