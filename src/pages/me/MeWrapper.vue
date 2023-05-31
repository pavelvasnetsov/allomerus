<template>
  <div>
    Me
  </div>
</template>

<script lang="ts">
import {isAuthorized} from "@/global/utils";

export default {
  name: 'RegistrationWrapper',
  beforeCreate() {
    if (!isAuthorized()) {
      this.$router.push('/authorization');
    }
  },
};
</script>

<style lang="scss" scoped>

</style>