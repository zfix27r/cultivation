import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'game',
      component: () => import('./pages/GamePage.vue'),
      meta: { title: 'Игра' },
    },
  ],
})

router.afterEach((to) => {
  document.title = `Культиватор | ${to.meta.title || 'Игра'}`
})

export default router