<template>
  <div class="post__list" v-if="posts.length > 0">
    <h1>Post List</h1>
    <post-item v-for="post in posts" :key="post.id" :post="post" @remove="$emit('remove', post.id)"
        @change="$emit('change', post.id, $event.newTitle, $event.newBody)" />
  </div>
  <h2 class="error" v-else> Posts not founded</h2>

</template>

<script>


import PostItem from './PostItem.vue'

export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },

}

</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.post__list {
  margin-top: 25px;
  margin-bottom: 20px;
}
</style>