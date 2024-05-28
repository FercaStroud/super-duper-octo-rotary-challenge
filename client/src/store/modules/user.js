import axios from 'axios';

const state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
};

const mutations = {
    /**
     * Sets the user in the state and localStorage.
     * Author: Fernando Cárdenas
     * @param {Object} state - Vuex state object.
     * @param {Object} user - User object.
     * @returns {void}
     */
    SET_USER(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
    },
};

const actions = {
    /**
     * Registers a new user.
     * Author: Fernando Cárdenas
     * @param {Object} context - Vuex context object.
     * @param {String} name - User's name.
     * @returns {Promise<void>}
     */
    async registerUser({ commit }, name) {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, { name });
        commit('SET_USER', response.data);
    },
};

const getters = {
    /**
     * Gets the user from the state.
     * Author: Fernando Cárdenas
     * @param {Object} state - Vuex state object.
     * @returns {Object|null} User object or null if not logged in.
     */
    user: (state) => state.user,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
