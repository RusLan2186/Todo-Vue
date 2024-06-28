import { fetchData } from '@/fetch/fetchData';
import axios from 'axios';

export const userModule = {
  state: () => ({
    users: [],
    selectedUser: null,
    isLoading: false,
    isLoadError: '',
  }),
  getters: {
    user: state => state.selectedUser,
    isLoading: state => state.isLoading,
    isLoadError: state => state.isLoadError,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setSelectedUser(state, user) {
      state.selectedUser = user;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setIsLoadError(state, error) {
      state.isLoadError = error;
    },
  },
  actions: {
    async fetchUsers({ state, commit }) {
      const url = 'https://jsonplaceholder.typicode.com/users'
    await fetchData({ state, commit }, { url, setDataMutation: 'setUsers'});
    },
    async fetchUser({ state, commit, dispatch }, userId) {
      if (!state.users.length) {
        await dispatch('fetchUsers');
      }
      const user = state.users.find(user => user.id === parseInt(userId));
      commit('setSelectedUser', user);
    },
  },
  namespaced: true,
};
