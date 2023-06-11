<template>
  <SketchesView/>
</template>

<script lang="ts">
import {isAuthorized} from "@/global/utils";
import SketchesView from "@/pages/sketches/views/SketchesView.vue";

export default {
  name: 'SketchesWrapper',
  components: {SketchesView},

  beforeCreate() {
    if (!isAuthorized()) {
      this.$router.push('/authorization');
    }
  },
};
</script>

<style lang="scss" scoped>
</style>