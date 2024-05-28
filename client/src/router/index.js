import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Messages from '../views/Messages.vue';
import store from '../store';

const routes = [
    {
        path: '/',
        name: 'Register',
        component: Register,
    },
    {
        path: '/messages',
        name: 'Messages',
        component: Messages,
        beforeEnter: (to, from, next) => {
            if (!store.getters.user) {
                next({ name: 'Register' });
            } else {
                next();
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
