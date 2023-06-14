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