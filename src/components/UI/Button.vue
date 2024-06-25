<template>
  <button class="btn">
    <slot></slot>
  </button>

</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.btn {
  border: 2px solid #55a45e;
  padding: 10px 25px;
  background-color: transparent;
  cursor: pointer;
  border-radius: 15px;
  transition: 0.3s all ease 0s;
  background-color: #fff;
}

.btn:hover {
  background-color: #55a45e;
  color: #fff;
  border: 2px solid #fff;
}
</style>