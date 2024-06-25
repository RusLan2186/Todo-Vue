<template>
  <div>
    <div v-if="!isLoading && !isLoadError && user">
      <h1>You selected post with <strong>{{ user.name }}</strong></h1>
      <div class="post selected__post">
        <p>User: {{ user.name }}</p>
        <p>Email: <a class="item__hover" :href="'mailto:' + user.email">{{ user.email }}</a></p>
        <p>City: {{ user.address.city }}</p>
      </div>
      <my-button @click="$router.back">Back</my-button>
    </div>

    <div v-else>
      <p class="error">{{ isLoadError }}</p>
    </div>

  </div>
  <div v-if="isLoading">
    <Sceleton v-for="n in 1" :key="n" />
  </div>

</template>

<script>
import axios from 'axios';
import Sceleton from '@/components/Sceleton.vue'

export default {
  components: {
    Sceleton
  },
  data() {
    return {
      userId: this.$route.params.id,
      user: {},
      users: [],
      isLoading: false,
      isLoadError: ''
    };
  },
 
  methods: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        this.isLoadError = '';
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.users = response.data;
        this.isLoading = false;
      } catch (e) {
        this.isLoadError = `User not found: ${e.message}`;
        this.isLoading = false;
        console.log(e.message);
      }
    },
    async fetchUser() {
      await this.fetchUsers();
      const id = parseInt(this.$route.params.id);
      this.user = this.users.find(user => user.id === id);
    }
  },
  created() {
    this.fetchUser();
  }
}
</script>

<style scoped>
strong {
  color: #55a45e;
}

.selected__post {
  margin-bottom: 20px;
}
</style>
