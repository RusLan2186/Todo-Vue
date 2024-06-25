<template>
  <input  type="text" :value="modelValue" @input="updateInput" class="input">
  
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  },
  // mounted() {
  //   this.$refs.titleInput.focus();
  // }
}
</script>

<style scoped>

</style>