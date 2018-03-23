import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoPage from '../components/todo/TodoPage'
import MoviePage from '../components/movies/MoviePage'
import MovieSingle from '../components/movies/MovieSingle'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: TodoPage},
  {path: '/movies', component: MoviePage},
  {path: '/movies/backlog', component: MoviePage},
  {path: '/movies/:movie_id', name: 'movieDetail', component: MovieSingle},
]

export default new VueRouter({
  mode: 'history',
  routes
})
