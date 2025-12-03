import { createWebHistory, createRouter } from 'vue-router'
import LoginView from './views/login-view.vue';
import ChatView from './views/chat-view.vue';
import RegisterView from './views/register-view.vue';
import { getMe } from './utils/user';
import EditProfile from './views/edit-profile.vue';
const routes = [
    {
        path: '/', name: "login", 
        component: LoginView,
        beforeEnter: async (to, from, next) => {
            const user = await getMe();
            console.log(user)
            if (user) next('/chat')
            else next();
        }
    },
    {
        path: '/register', 
        component: RegisterView,
        beforeEnter: async (to, from, next) => {
            const user = await getMe();
            if (user) next('/chat')
            else next();
        }
    },
    {
        path: '/chat',
        component: ChatView,
        beforeEnter: async (to, from, next) => {
            const user = await getMe();
            if (!user) next('')
            else next();
        }
    },
    {
        path: '/profile/edit',
        component: EditProfile,
        beforeEnter: async (to, from, next) => {
            const user = await getMe();
            if (!user) next('')
            else next();
        }
    }

];

export const router = createRouter({
    history: createWebHistory(),
    routes
})