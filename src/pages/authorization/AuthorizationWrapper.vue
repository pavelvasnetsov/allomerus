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

  beforeMount() {
    if (isAuthorized()) {
      this.$router.push('/sketches');
    } else {
      this.setIsAuthorized(false);
    }
  },

  methods: {
    ...mapMutations('checkingAuthorization', {
      setIsAuthorized: 'SET_IS_AUTHORIZED'
    })
  }
};
</script>

<style lang="scss" scoped>

</style>