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
import { mapState, mapGetters, mapActions } from 'vuex';
import Sceleton from '@/components/Sceleton.vue';

export default {
  components: {
    Sceleton
  },
  computed: {
    ...mapState('user', ['selectedUser', 'isLoading', 'isLoadError']),
    ...mapGetters('user', ['user']),
  },
  methods: {
    ...mapActions('user', ['fetchUser']),
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUser(userId);
  }
};
</script>


<style scoped>
strong {
  color: #55a45e;
}

.selected__post {
  margin-bottom: 20px;
}
</style>
