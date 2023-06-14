<template>
  <div>
    <RegistrationView/>
  </div>
</template>

<script lang="ts">
import RegistrationView from './view/RegistrationView.vue';
import {isAuthorized} from "@/global/utils";
import {mapMutations} from "vuex";

export default {
  components: {RegistrationView},
  name: 'RegistrationWrapper',

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