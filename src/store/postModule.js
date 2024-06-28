import { fetchData } from '@/fetch/fetchData';


export const postModule = {
  state: () => ({
    posts: [],
    isPostsLoading: false,
    isLoadError: '',
    searchValue: '',
    isVisibleSortList: false,
    selectedSort: 'Select option',
    sortOptions: [
      { value: 'default', text: 'Default' },
      { value: 'id', text: 'ID' },
      { value: 'title', text: 'Title' },
      { value: 'body', text: 'Description' }
    ],
    pageNumber: 1,
    limit: 10,
    totalPages: 0,
  }),

  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        if (state.selectedSort === 'id') {
          return post1[state.selectedSort] - post2[state.selectedSort];
        }
        if (state.selectedSort === 'default') {
          return state.posts
        }
        return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]);
      }
      )
    },
    filteredPosts(state, getters) {
      const filtered = getters.sortedPosts.filter(post =>
        post.title.toLowerCase().includes(state.searchValue.toLowerCase()) ||
        post.body.toLowerCase().includes(state.searchValue.toLowerCase())
      );
      const start = (state.pageNumber - 1) * state.limit;
      const end = start + state.limit;
      return filtered.slice(start, end);
    },
    selectedSortText(state) {
      const selectedOption = state.sortOptions.find(option => option.value === state.selectedSort);
      return selectedOption ? selectedOption.text : 'Select option';
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setIsLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setIsLoadError(state, error) {
      state.isLoadError = error
    },
    setPageNumber(state, page) {
      state.pageNumber = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSortOptions(state, sortOption) {
      state.sortOptions = sortOption
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setVisibleSortList(state, bool) {
      state.isVisibleSortList = bool
    },
    setSearchValue(state, searchValue) {
      state.searchValue = searchValue
    },
    setRemovePost(state, id) {
      state.posts = state.posts.filter(post => post.id !== id);
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      const url = 'https://jsonplaceholder.typicode.com/posts'
      await fetchData({ commit }, { url, setDataMutation: 'setPosts' });
      commit('setTotalPages', Math.ceil(state.posts.length / state.limit));
    },
  },
  namespaced: true
}