import { createRouter, createWebHistory } from 'vue-router'
import PostPage from '@/pages/PostPage.vue'
import SelectedPost from '@/pages/SelectedPost.vue'
import About from '@/pages/About.vue'
import NotFound from '@/pages/NotFound.vue'
import PostPagewithStore from '@/pages/PostPageWithStore.vue'

const routes = [
  {
    path: '/',
    component: PostPage
  },

  {
    path: '/posts/:id',
    component: SelectedPost
  },

  {
    path: '/contacts',
    component: About
  },

  {
    path: '/:pathMatch(.*)*', 
    component: NotFound
  },

  {
    path: '/store',
    component: PostPagewithStore
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
