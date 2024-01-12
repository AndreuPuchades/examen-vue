import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../components/views/BookLi.vue'
import BookForm from '../components/views/BookForm.vue'
import AppCarrito from '../components/views/AppCarrito.vue'
import AppAbout from '../components/views/AppAbout.vue'
import AppCompras from '@/components/utils/AppCompras.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: BooksList
    },
    {
      path: '/about',
      name: 'about',
      component: AppAbout
    },
    {
      path: '/bookForm',
      name: 'bookForm',
      component: BookForm
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: AppCarrito
    },
    {
      path: '/compras',
      name: 'compras',
      component: AppCompras
    },
    {
      path: '/editBookForm/:id',
      name: 'editBookForm',
      component: BookForm,
      props: true
    }
  ]
});

export default router