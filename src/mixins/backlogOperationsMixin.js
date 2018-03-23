import {mapActions} from 'vuex'

const backlogOperationMixin = {
  methods: {
    ...mapActions({
      saveMovie: 'saveMovie',
      removeMovie: 'removeMovie'
    })
  }
};
export default backlogOperationMixin;
