<template>
  <div>
    <button @click="addLike">++++</button>
    {{likes}}
    <button @click="removeLike">-----</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: 0
    };
  },
  methods: {
    addLike() {
      this.likes += 1;
    },
    removeLike() {
      this.likes -= 1;
    },
   
  }
};
</script>


<style></style>