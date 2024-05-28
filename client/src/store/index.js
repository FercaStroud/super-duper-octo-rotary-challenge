import { createStore } from 'vuex';
import user from './modules/user';
import chat from './modules/chat';

const store = createStore({
    modules: {
        user,
        chat,
    },
});

export default store;
