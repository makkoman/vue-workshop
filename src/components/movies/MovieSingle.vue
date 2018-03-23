<template>
  <div class="container mt-5">
    <a href="#" @click="goBack">&lt;&lt;Back to movies</a>
    <div class="row">
      <div class="col-3">
        <img :src="movie.image" :alt="movie.title" class="poster">
      </div>
      <div class="col-9">
        <div class="row">
          <h1 class="text-center col-lg-12">{{movie.title}}</h1>
          <h3 class="text-center col-lg-12">{{movie.tagline}}</h3>
          <h4 class="col-lg-12">Release Date: <span>{{movie.releaseDate}}</span></h4>
        </div>
        <div class="row">
          <div class="col-lg-12 actions">
            <movie-card-vote-average :voteAverage="movie.voteAverage"/>
            <a v-if="!saved" href="#" @click.prevent="saveMovie(movie)"
               class="btn btn-primary save-btn">
              Add to backlog
            </a>
            <a v-else href="#" @click.prevent="removeMovie(movie)"
               class="btn btn-danger save-btn">
              Remove
            </a>
          </div>
          <h3 class="col-lg-12">Overview</h3>
          <p class="col-lg-12">{{movie.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import MovieCardVoteAverage from './MovieCardVoteAverage'
  import backlogOperationMixin from '../../mixins/backlogOperationsMixin'

  export default {
    name: "movie-single",
    components: {
      MovieCardVoteAverage
    },
    mixins: [
      backlogOperationMixin,
    ],
    mounted() {
      this.fetchMovie(this.$route.params.movie_id);
    },
    computed: {
      movie () {
        return this.$store.getters.movieSingle
      },
      saved () {
        const savedMovies = this.$store.state.savedMovies
        return savedMovies.some(movie => movie.id === this.movie.id)
      },
    },
    methods: {
      ...mapActions({
        fetchMovie: 'fetchMovie',
      }),
      goBack: function () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  h4>span{
    color: darkgray;
  }
  .poster{
    width: 90%;
  }
  .actions{
    position: relative !important;
    display: block !important;
    height: 66px;
  }
  .save-btn{
    margin: 9px 75px;
  }
</style>
