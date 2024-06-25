<template>
  {{ likes }}
  <button @click="addLike">Click</button>
  <input type="text" v-model="title">
  <button @click="addPost">Add Post</button>
  <div v-for="post in posts" :key="post.id">
    <span>{{ post.title }}</span>
  </div>

</template>
<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      likes: 0,
      title: ''
    }
  },
  methods: {
    addLike() {
      this.likes += 1;
    },
    addPost() {
      const newPost = {
        id: Date.now(),
        title: this.title
      };
      this.posts.push(newPost);
    }
  }
}
</script>


<style></style>