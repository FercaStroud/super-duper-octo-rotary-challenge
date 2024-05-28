<template>
  <div class="container">
    <h1>Challenge</h1>
    <form @submit.prevent="register">
      <label for="username">Enter a username to access the chat:</label>
      <input type="text" id="username" v-model="username" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
    };
  },
  methods: {
    async register() {
      await this.$store.dispatch('registerUser', this.username);
      this.$router.push('/messages');
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/global.scss";

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
