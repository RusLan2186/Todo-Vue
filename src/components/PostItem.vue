<template>
  <div class="post">
    <div class="post__item">
      <div><strong>Id: </strong>{{ post.id }}</div>
      <div class="item__hover" @click="$router.push(`/posts/${post.userId}`)"><strong>Title: </strong>{{ post.title }}
      </div>
      <div class="buttons">
        <img @click="$emit('remove', post.id)" :src="removeIcon" class="remove__icon" alt="Remove Icon" />
        <img @click="openModal" :src="changeIcon" class="remove__icon" alt="Change Icon" />
      </div>

    </div>
    <div class="description"><strong>Description: </strong>{{ post.body }}</div>

  </div>

  <my-modal v-model:show="modalVisible">
    <div class="inputs__block">
      <h1>Change form</h1>
      <span class="error">{{ newTitleError }}</span>
      <my-input v-model.trim="newTitle" v-focus type="text" placeholder="title"
        @blur="validateFieldWrapper('newTitle')"></my-input>

      <span class="error">{{ newBodyError }}</span>
      <my-input v-model.trim="newBody" placeholder="description" @blur="validateFieldWrapper('newBody')"></my-input>
      <div class="buttons">
        <my-button @click="saveChanges">Save</my-button>
        <my-button @click="removeChanges">Cancel</my-button>
      </div>
    </div>
  </my-modal>
</template>


<script>
import { notifyError } from '../assests/toastNotifications'
import { validationMixin } from './mixins/validationMixin';
import removeIcon from '../assests/img/removeIcon.svg';
import changeIcon from '../assests/img/changeIcon.svg';

export default {

  mixins: [validationMixin],
  data() {
    return {
      newTitle: '',
      newBody: '',
      newTitleError: '',
      newBodyError: '',
      modalVisible: false,
      removeIcon,
      changeIcon
    }
  },
  created() {
    this.newTitle = this.post.title;
    this.newBody = this.post.body;
  },

  props: {
    post: {
      type: Object,
      required: true
    },
  },

  methods: {
    validateFieldWrapper(field) {
      if (field === 'newTitle') {
        this.validateField('title', { title: this.newTitle }, this);
      } else if (field === 'newBody') {
        this.validateField('body', { body: this.newBody }, this);
      }
    },

    removeChanges() {
      this.newTitle = this.post.title;
      this.newBody = this.post.body;
      this.modalVisible = false;
      notifyError('Post not changed')
    },

    saveChanges() {
      this.newTitleError = '';
      this.newBodyError = '';

      if (!this.newTitle.trim()) {
        this.newTitleError = 'Title cannot be empty';
        setTimeout(() => {
          this.newTitleError = '';
        }, 3000);
        return;
      }

      if (!this.newBody.trim()) {
        this.newBodyError = 'Description cannot be empty';
        setTimeout(() => {
          this.newBodyError = '';
        }, 3000);
        return;
      }

      if (this.newTitleError || this.newBodyError) {
        return;
      }

      this.$emit('change', { newTitle: this.newTitle, newBody: this.newBody });

      this.modalVisible = false;
    },

    openModal() {
      this.modalVisible = true;
    },
  },
}

</script>


<style>
.post {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  gap: 15px;
  padding: 15px;
  border: 2px solid #55a45e;
  margin-top: 15px;
  border-radius: 15px;

}

.post__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.buttons {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.remove__icon {
  cursor: pointer;
  transition: 0.3s all ease 0s;
}

.remove__icon:hover {
  transform: scale(1.2);
}

.inputs__block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
</style>ё1йФ-