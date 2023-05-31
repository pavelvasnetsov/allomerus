<template>
  <div>
    <RegistrationView/>
  </div>
</template>

<script lang="ts">
import RegistrationView from './view/RegistrationView.vue';
import {isAuthorized} from "@/global/utils";

export default {
  components: {RegistrationView},
  name: 'RegistrationWrapper',

  beforeCreate() {
    if (isAuthorized()) {
      this.$router.push('/sketches');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>