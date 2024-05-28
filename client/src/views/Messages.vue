<template>
  <div>
    <div class="chat-container">
      <div class="chat-header">
        <img src="https://avatar.iran.liara.run/public" alt="avatar"/>
        <h5 class="mb-0">
          {{ user.name }}
        </h5>
      </div>
      <div class="container">
        <div class="row m-2">
          <input type="text" class="form-control" placeholder="Search..." v-model="search">
        </div>
      </div>
      <div class="chat-body" id="chatBody">
        <div class="chat-message" v-for="message in filteredMessages" :key="message.id"
             :class="message.user.id === user.id ? 'message-sent' : 'message-received'">
          <div class="message-text">
            <strong v-if="message.user.id !== user.id">
              {{ message.user.name }}
            </strong>
            {{ message.message }}
          </div>
        </div>
      </div>
      <div class="chat-footer">
        <form @submit.prevent="sendMessage">
          <div class="input-group">
            <input type="text" id="messageInput" class="form-control" placeholder="Type your message" v-model="newMessage">
            <div class="input-group-append">
              <button class="btn" id="sendButton" type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      newMessage: '',
      search: '',
    };
  },
  computed: {
    ...mapGetters(['messages', 'user']),
    filteredMessages() {
      const lowerCaseSearch = this.search.toLowerCase();

      return this.messages.filter(message =>
          message.message.toLowerCase().includes(lowerCaseSearch) ||
          message.user.name.toLowerCase().includes(lowerCaseSearch)
      );
    },
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
img {
  height: 40px;
  margin-right: 10px
}
</style>
