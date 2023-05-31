<template>
  <AuthorizationView/>
</template>

<script lang="ts">
import AuthorizationView from './views/AuthorizationView.vue';
import {isAuthorized} from "@/global/utils";

export default {
  components: {AuthorizationView},
  name: 'RegistrationWrapper',

  data() {
    return {};
  },

  beforeCreate() {
    if (isAuthorized()) {
      this.$router.push('/sketches');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>