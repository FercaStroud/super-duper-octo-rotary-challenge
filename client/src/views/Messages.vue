<template>
  <div>
    <header class="color-white bg-primary">
      <strong class="color-white">All messages</strong>
    </header>
    <div>
      <img class="avatar" src="https://avatar.iran.liara.run/public" alt="avatar"/>
      <div>
        <h2 class="color-primary">{{ user.name }}</h2>
        <small>{{ user.id }}</small>
      </div>
    </div>
    <div class="container">
      <div class="messenger">
        <div class="message bubble" v-for="message in messages" :key="message.id" :class="message.user.id === user.id ? 'right' : 'left'">
          <div class="">
            <strong v-if="message.user.id !== user.id">{{ message.user.name }} </strong>
            {{ message.message }}
          </div>
        </div>
      </div>
    </div>
    <nav>
      <form @submit.prevent="sendMessage">
        <input type="text" v-model="newMessage" placeholder="Type your message" required/>
        <button type="submit">Send</button>
      </form>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      newMessage: '',
    };
  },
  computed: {
    ...mapGetters(['messages', 'user']),
  },
  methods: {
    sendMessage() {
      const messageData = {
        userId: this.user.id,
        message: this.newMessage,
      };
      this.$store.dispatch('sendMessage', messageData);
      this.newMessage = '';
    },
  },
  created() {
    this.$store.dispatch('fetchMessages');
    this.$store.dispatch('initSocket');
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/global.scss";

.container {
  height: calc(100vh - 510px) !important;
  overflow-y: scroll !important;
  width: 80vw !important;
  max-width: 100% !important;
}

nav {
  width: 100%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

form {
  width: 100%;
  max-width: 600px;
  padding: 10px;
  box-sizing: border-box;
}

.avatar {
  height: 52px;
  padding-right: 10px;
  float: left;
}

.messenger {
  display: flex !important;
  flex-direction: column !important;
}

.message {
  width: 200px;
  margin: 10px;
}

.bubble {
  padding: 10px;
  border-radius: 15px;
}

.left {
  background-color: #f0f0f0;
  align-self: flex-start;
}

.right {
  background-color: $primary-color;
  align-self: flex-end;
  color: white;
}

</style>
