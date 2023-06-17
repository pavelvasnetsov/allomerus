<template>
  <AuthorizationView/>
</template>

<script lang="ts">
import AuthorizationView from './views/AuthorizationView.vue';
import {isAuthorized} from "@/global/utils";
import {mapMutations} from "vuex";

export default {
  components: {AuthorizationView},
  name: 'RegistrationWrapper',

  data() {
    return {};
  },

  created() {
    if (isAuthorized()) {
      this.$router.push('/sketches');
    }
    this.setIsAuthorized(isAuthorized());
    this.setLoader(false);
  },

  methods: {
    ...mapMutations('checkingAuthorization', {
      setIsAuthorized: 'SET_IS_AUTHORIZED'
    }),
    ...mapMutations('loader', {
      setLoader: 'SET_SHOW'
    }),
  }
};
</script>

<style lang="scss" scoped>

</style>