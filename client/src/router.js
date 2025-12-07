import { createWebHistory, createRouter } from 'vue-router'
import LoginView from './views/login-view.vue';
import ChatView from './views/chat-view.vue';
import RegisterView from './views/register-view.vue';
import userApi from './utils/api/user.api';
import EditProfile from './views/edit-profile.vue';
// import { store } from './utils/store'
import { useStore } from '@/store';

const routes = [
  {
    path: '/',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    component: RegisterView,
    meta: { requiresGuest: true }
  },
  {
    path: '/chat',
    component: ChatView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/edit',
    component: EditProfile,
    meta: { requiresAuth: true }
  }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
  const store = useStore()

  if (!store.user && !store.isLoading) {
    await store.fetchUser()
  }

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next('/')
  }
  else if (to.meta.requiresGuest && store.isAuthenticated) {
    next('/chat')
  }
  else {
    next()
  }
})