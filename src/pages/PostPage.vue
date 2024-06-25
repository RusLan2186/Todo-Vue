<template>
  <div @click="this.isVisibleSortList = false;">
    <div class="post__page">
      <my-button @click="isShowModal">Create post</my-button>
      <div class="search__wrapper">
        <input v-model="searchValue" placeholder="Search" :class="{ expanded: isInputFocused }"
          @focus="isInputFocused = true" @blur="isInputFocused = false" />
        <span v-if="searchValue" @mousedown.prevent="handleClearSearch" class="search__clear">X</span>
      </div>
      <div @click.stop class="sort__wrapper">
        Sort by: <span class="sort__title" @click="toggleSortList">{{ selectedSortText }}</span>
        <ul class="sort__list" v-if="isVisibleSortList">
          <li v-for="option in sortOptions" :key="option.value" @click="selectSort(option.value)">
            {{ option.text }}
          </li>
        </ul>
      </div>
    </div>

    <my-modal v-model:show="modalVisible">
      <post-form :modalVisible="modalVisible" @create="createPost" />
    </my-modal>


    <post-list :posts="filteredPosts" @remove="removePost" @change="changePost"
      v-if="!isPostsLoading && !isLoadError" />

    <Sceleton v-else-if="isPostsLoading" v-for="n in limit" :key="n" />

    <div class="error">{{ isLoadError }}</div>

    <Pagination v-if="filteredPosts.length > 0" :totalPages="totalPages" :pageNumber="pageNumber"
      @changePage="changePage" />

  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import Pagination from '@/components/Pagination.vue'
import Sceleton from '@/components/Sceleton.vue'
import axios from 'axios';
import { notifySuccess, notifyError } from '@/assests/toastNotifications';


export default {
  components: {
    PostForm,
    PostList,
    Pagination,
    Sceleton
  },

  data() {
    return {
      posts: [],
      modalVisible: false,
      isPostsLoading: false,
      isLoadError: '',
      searchValue: '',
      isVisibleSortList: false,
      selectedSort: 'Select option',
      sortOptions: [
        { value: 'id', text: 'ID' },
        { value: 'title', text: 'Title' },
        { value: 'body', text: 'Description' }
      ],
      isInputFocused: false,
      pageNumber: 1,
      limit: 10,
      totalPages: 0,
    }

  },
  methods: {

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        this.isLoadError = '';
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.posts = response.data;
        this.totalPages = Math.ceil(this.posts.length / this.limit);
        this.isPostsLoading = false;
      } catch (e) {
        this.isLoadError = `Erorr loading posts: ${e.message}`;
        this.isPostsLoading = false;
      }
    },

    createPost(post) {
      this.posts.unshift(post)
      this.modalVisible = false;
      notifySuccess('Post created');
    },

    removePost(id) {
      this.posts = this.posts.filter(post => post.id !== id)
      notifyError('Post deleted')
    },

    changePost(id, newTitle, newBody) {
      const post = this.posts.find(post => post.id === id);

      if (post) {
        post.title = newTitle;
        post.body = newBody;
        notifySuccess('Post changed');
      }
    },

    isShowModal() {
      this.modalVisible = true;
    },

    toggleSortList() {
      this.isVisibleSortList = !this.isVisibleSortList;
    },

    selectSort(sortValue) {
      this.isVisibleSortList = false;
      this.selectedSort = sortValue;
    },


    handleClearSearch() {
      this.isInputFocused = true;
      this.searchValue = ''
    },
    changePage(page) {
      this.pageNumber = page
      this.fetchPosts()
    }
  },

  mounted() {
    this.fetchPosts()
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        if (this.selectedSort === 'id') {
          return post1[this.selectedSort] - post2[this.selectedSort];
        }
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
      });
    },
    filteredPosts() {
      const filtered = this.sortedPosts.filter(post =>
        post.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        post.body.toLowerCase().includes(this.searchValue.toLowerCase())
      );
      const start = (this.pageNumber - 1) * this.limit;
      const end = start + this.limit;
      return filtered.slice(start, end);
    },
    selectedSortText() {
      const selectedOption = this.sortOptions.find(option => option.value === this.selectedSort);
      return selectedOption ? selectedOption.text : 'Select option';
    }
  },


};
</script>

<style>
.post__page {
  display: flex;
  justify-content: space-between;
  column-gap: 15px;
  align-items: center;
  font-size: 20px;
  padding: 10px;
}

.sort__wrapper {
  position: relative;
  width: 20%;
}

.sort__title {
  cursor: pointer;
  margin-left: 5px;
  transition: 0.3s all ease 0s;
  color: #55a45e;
}

.sort__title:hover {
  color: rgb(23, 23, 23);
}

.sort__list {
  margin-top: 5px;
  position: absolute;
  cursor: pointer;
  right: 0;
  border: 2px solid #55a45e;
  background-color: #fff;
  border-radius: 12px;
}

.sort__list li {
  padding: 5px 10px;
  transition: 0.3s all ease 0s;
  width: 100%;
}

.sort__list li:hover {
  background-color: #55a45e;
  color: #fff;
}

.search__wrapper {
  position: relative;
  width: 60%;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
}

.search__clear {
  display: inline-block;
  cursor: pointer;
  transition: width 0.3s ease;
  transform: translateX(-30px);
}

.search__clear:hover {
  color: #55a45e;
}

input {
  transition: width 0.3s ease;
  width: 200px;
  border: 2px solid #55a45e;
  padding: 10px;
}

input.expanded {
  width: calc(80% - 40px);
  left: -20px;
  outline: none;
}
</style>
