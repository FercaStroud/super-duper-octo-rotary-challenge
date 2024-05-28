<template>
  <div class="container d-flex flex-column justify-content-center align-items-center min-vh-100">
    <div class="row w-100">
      <div class="col-12 col-md-6 offset-md-3">
        <h1 class="text-center">Challenge</h1>
        <div class="d-flex justify-content-center">
          <img src="https://avatar.iran.liara.run/public" alt="avatar"/>
        </div>
        <form @submit.prevent="register" class="mt-4">
          <div class="form-group">
            <label for="username">Enter a username to access the chat:</label>
            <input type="text" id="username" v-model="username" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary btn-block w-100 mt-2">Register</button>
        </form>
      </div>
    </div>
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
img{
  max-width:300px;
}
</style>
