import axios from "axios";

export async function fetchData({ commit }, { url, setDataMutation  }) {
  try {
    commit('setIsLoading', true);
    commit('setIsLoadError', '');
    const response = await axios.get(url);
    commit(setDataMutation, response.data);  
    commit('setIsLoading', false);
  } catch (e) {
    commit('setIsLoadError', `Error loading data: ${e.message}`);
    commit('setIsLoading', false);
  }
}

