<template>
  <div>
    Sketches
  </div>
</template>

<script lang="ts">
import {isAuthorized} from "@/global/utils";

export default {
  name: 'SketchesWrapper',

  beforeCreate() {
    if (!isAuthorized()) {
      this.$router.push('/authorization');
    }
  },
};
</script>

<style lang="scss" scoped>
</style>