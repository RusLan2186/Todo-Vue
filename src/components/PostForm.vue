<template>
  <form class="form" @submit.prevent>
    <h3>Create post</h3>

    <div class="inputWrapper">
      <span class="error">{{ titleError }}</span>
      <my-input v-model.trim="post.title" v-focus placeholder="title" @blur="validateFieldWrapper('title')">
      </my-input>

      <span class="error">{{ bodyError }}</span>

      <my-input v-model.trim="post.body" placeholder="description" @blur="validateFieldWrapper('body')">
      </my-input>
    </div>

    <my-button class="modal__button" @click="createPost">
      Create post
    </my-button>
  </form>
</template>

<script>

import { validationMixin } from './mixins/validationMixin';

export default {
  mixins: [validationMixin],

  data() {
    return {
      post: {
        title: '',
        body: ''
      },
      titleError: '',
      bodyError: '',
    }
  },
  props: {
    modalVisible: {
      type: Boolean,
      required: true
    },
  },

  methods: {
    validateFieldWrapper(field) {
      this.validateField(field, this.post, this)
    },

    createPost() {
      this.validateField('title', this.post, this);
      this.validateField('body', this.post, this);

      if (this.titleError || this.bodyError) {
        return;
      }
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = { title: '', body: '' };
    },

    resetForm() {
      console.log('ok');
      this.titleError = '';
      this.bodyError = ' ';
    }
  },
}

</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.inputWrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
}

.modal__button {
  align-self: flex-end;
}
</style>