<template>

  <div @click="setVisibleSortList(false)">
    <div class="post__page">
      <my-button @click="isShowModal">Create post</my-button>

      <div class="search__wrapper" :class="{ expanded: isInputFocused }">
        <my-input :model-value="searchValue" @update:model-value="setSearchValue" placeholder="Search"
          @focus="isInputFocused = true" @blur="isInputFocused = false" />


        <span v-if="searchValue" @mousedown.prevent="handleClearSearch" class="search__clear">X</span>
      </div>

      <div @click.stop class="sort__wrapper">
        Sort by: <span class="sort__title" @click="setVisibleSortList(!isVisibleSortList)">{{ selectedSortText }}</span>
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
import { notifySuccess, notifyError } from '@/assests/toastNotifications';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    PostForm,
    PostList,
    Pagination,
    Sceleton
  },

  data() {
    return {
      modalVisible: false,
      isInputFocused: false,
    }
  },
  methods: {
    ...mapMutations({
      setVisibleSortList: 'post/setVisibleSortList',
      setPageNumber: 'post/setPageNumber',
      setSelectedSort: 'post/setSelectedSort',
      setSearchValue: 'post/setSearchValue',
      setRemovePost: 'post/setRemovePost',

    }),

    ...mapActions({
      fetchPosts: 'post/fetchPosts'
    }),

    createPost(post) {
      this.posts.unshift(post)
      this.modalVisible = false;
      notifySuccess('Post created');
    },

    removePost(id) {
      this.setRemovePost(id)
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
      this.isVisibleSortList = true;
    },

    selectSort(sortValue) {
      this.setSelectedSort(sortValue);
      this.setVisibleSortList(false)
    },

    handleClearSearch() {
      this.isInputFocused = true;
      this.setSearchValue('')
    },
    changePage(page) {
      this.setPageNumber(page)
      this.fetchPosts()
    }
  },

  mounted() {
    this.fetchPosts()
  },

  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      isLoadError: state => state.post.isLoadError,
      isVisibleSortList: state => state.post.isVisibleSortList,
      searchValue: state => state.post.searchValue,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      pageNumber: state => state.post.pageNumber,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      filteredPosts: 'post/filteredPosts',
      selectedSortText: 'post/selectedSortText',
    })
  },


};
</script>

<style scoped>
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
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.3s ease;
}

.search__clear {
  display: inline-block;
  cursor: pointer;
  transition: width 0.3s ease;
  transform: translateX(-30px);
}

.expanded {
  width: 35%;
}

.search__clear:hover {
  color: #55a45e;
}
</style>
