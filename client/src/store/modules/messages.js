import axios from 'axios';
import { io } from 'socket.io-client';

const state = {
    messages: [],
    socket: null,
};

const mutations = {
    /**
     * Sets messages in the state.
     * Author: Fernando Cárdenas
     * @param {Object} state - Vuex state object.
     * @param {Array} messages - Array of message objects.
     * @returns {void}
     */
    SET_MESSAGES(state, messages) {
        state.messages = messages;
    },
    /**
     * Adds a message to the state.
     * Author: Fernando Cárdenas
     * @param {Object} state - Vuex state object.
     * @param {Object} message - Message object.
     * @returns {void}
     */
    ADD_MESSAGE(state, message) {
        state.messages.push(message);
    },
    /**
     * Sets the socket in the state.
     * Author: Fernando Cárdenas
     * @param {Object} state - Vuex state object.
     * @param {Object} socket - Socket object.
     * @returns {void}
     */
    SET_SOCKET(state, socket) {
        state.socket = socket;
    },
};

const actions = {
    /**
     * Fetches messages from the server.
     * Author: Fernando Cárdenas
     * @param {Object} context - Vuex context object.
     * @returns {Promise<void>}
     */
    async fetchMessages({ commit }) {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/messages`);
        commit('SET_MESSAGES', response.data);
    },
    /**
     * Initializes the socket connection.
     * Author: Fernando Cárdenas
     * @param {Object} context - Vuex context object.
     * @returns {void}
     */
    initSocket({ commit }) {
        const socket = io(import.meta.env.VITE_API_URL);
        commit('SET_SOCKET', socket);
    },
    /**
     * Sends a message to the server via socket.
     * Author: Fernando Cárdenas
     * @param {Object} context - Vuex context object.
     * @param {Object} message - Message object.
     * @returns {void}
     */
    sendMessage({ state }, message) {
        state.socket.emit('chat message', message);
    },
};

const getters = {
    /**
     * Gets messages from the state.
     * Author: Fernando Cárdenas
     * @param {Object} state - Vuex state object.
     * @returns {Array} Array of message objects.
     */
    messages: (state) => state.messages,
};

export default {
    state,
    mutations,
    actions,
    getters,
};
