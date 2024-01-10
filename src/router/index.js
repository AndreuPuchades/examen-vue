import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../components/BookLi.vue'
import BookForm from '../components/BookForm.vue'
import AppCarrito from '../components/AppCarrito.vue'
import AppAbout from '../components/AppAbout.vue'

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
      path: '/editBookForm/:id',
      name: 'editBookForm',
      component: BookForm,
      props: true
    }
  ]
});

export default router