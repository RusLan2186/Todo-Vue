<template>
  <Transition>
  <div class="modal" v-if="show" @click="hideDialog">

    <div @click.stop class="modal__content">
      <slot></slot>
    </div>

  </div>
</Transition>
</template>

<script>
export default {
  name: 'my-modal',
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    }
  }

}
</script>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.514);
  display: flex;
}

.modal__content {
  margin: auto;
  background-color: #fff;
  border-radius: 15px;
  min-width: 650px;
  min-height: 50px;
  padding: 20px;
  border: 4px solid #55a45e;
  box-shadow: 0 4px 8px rgba(6, 230, 84, 0.1);
  font-size: 20px;
}

@media (max-width: 700px) {
  .modal__content {
    min-width: 90%;
  }
}
</style>