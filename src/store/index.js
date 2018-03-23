import Vue from 'vue'
import Vuex from 'vuex'
import MovieService from '../services/MovieService'
Vue.use(Vuex)

const store = {
  state: {
    movies: [],
    savedMovies: [],
    genres: [],
    selectedGenre: null,
    loading: false,
    currentPage: 1,
    totalPages: 0,
    selectedMovie: {},
  },

  actions: {
    async fetchMovies (context, page=1) {
      context.commit('setLoading', true)
      const moviesData = await MovieService.getMovies({
        page: page,
        genre: context.state.selectedGenre
      })
      context.commit('setMovies', moviesData.data)
      context.commit('setLoading', false)
    },
    async fetchGenres (context) {
      const genreData = await MovieService.getGenres()
      context.commit('setGenres', genreData.data)
    },
    async loadMovie (context, movieId) {
      const selectedMovie = await MovieService.getMovie(movieId)
      context.commit('setMovie', selectedMovie.data)
    },
    filterMovies (context, genreId) {
      context.commit('setGenre', genreId)
      context.dispatch('fetchMovies')
    },
    fetchPage (context, page) {
      context.dispatch('fetchMovies', page)
    },
    fetchMovie (context, movieId) {
      context.dispatch('loadMovie', movieId)
    },
    saveMovie (context, movie) {
      context.commit('saveMovie', movie)
      context.commit('persistSavedMovies')
    },
    removeMovie (context, movie) {
      context.commit('removeMovie', movie)
      context.commit('persistSavedMovies')
    },
    fetchSavedMovies (context) {
      const savedMoviesJson = localStorage.getItem('savedMovies')
      let savedMovies = []
      try {
        console.log(savedMoviesJson)
        savedMovies = JSON.parse(savedMoviesJson)
        console.log(savedMovies)
      } catch (error) {
        console.log(error)
      }
      context.commit('setSavedMovies', savedMovies || [])
    }
  },

  mutations: {
    setMovies (state, moviesData) {
      state.currentPage = moviesData.page
      state.totalPages = moviesData.total_pages
      state.movies = moviesData.results
    },
    setGenres (state, genreData) {
      state.genres = genreData.genres
    },
    setGenre (state, genreId) {
      state.selectedGenre = genreId
    },
    setMovie (state, movieInfo) {
      state.selectedMovie = movieInfo
    },
    setLoading (state, value) {
      state.loading = value
    },
    saveMovie (state, movie) {
      state.savedMovies.push(movie)
    },
    removeMovie (state, removedMovie) {
      state.savedMovies = state.savedMovies
        .filter(movie => movie.id !== removedMovie.id)
    },
    persistSavedMovies (state) {
      localStorage.setItem('savedMovies',
        JSON.stringify(state.savedMovies))
    },
    setSavedMovies (state, savedMovies) {
      state.savedMovies = savedMovies
    }
  },

  getters: {
    movieCards (state) {
      const imageBasePath = 'http://image.tmdb.org/t/p/w370_and_h556_bestv2'
      return state.movies.map(movie => ({
        id: movie.id,
        image: `${imageBasePath}${movie.poster_path}`,
        title: movie.title,
        description: movie.overview,
        voteAverage: movie.vote_average
      }))
    },
    selectedGenreName (state) {
      const genre = state.genres
        .find(genre => genre.id === state.selectedGenre)

      return genre ? genre.name : null
    },
    movieSingle (state) {
      const imageBasePath = 'http://image.tmdb.org/t/p/w370_and_h556_bestv2';
      const movie = state.selectedMovie;
      return {
        id: movie.id,
        image: `${imageBasePath}${movie.poster_path}`,
        title: movie.title,
        description: movie.overview,
        voteAverage: movie.vote_average,
        tagline: movie.tagline || '',
        releaseDate: movie.release_date,
        runtime: movie.runtime,
      }
    },
  }
}
export default new Vuex.Store(store)
