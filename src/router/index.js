import { createRouter, createWebHistory } from 'vue-router'
import CategoriesView from '@/components/views/CategoriesView.vue'
import GameForm from '@/components/views/GameForm.vue'
import OrderView from '@/components/views/OrderView.vue'
import GameView from '@/components/views/GameView.vue'
import PlataformasView from '@/components/views/PlataformasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameView
    },
    {
      path: '/plataformas',
      name: 'plataformas',
      component: PlataformasView
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: CategoriesView
    },
    {
      path: '/juegos',
      name: 'juegos',
      component: GameView
    },
    {
      path: '/juegos/:nombre/:id',
      name: 'juegos-by',
      component: GameView,
      props: true
    },
    {
      path: '/nuevoJuego',
      name: 'nuevoJuego',
      component: GameForm
    },
    {
      path: '/juegos-edit/:id',
      name: 'juegos-edit',
      component: GameForm,
      props: true
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: OrderView
    }
  ]
});

export default router