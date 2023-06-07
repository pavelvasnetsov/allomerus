<template>
  <div>
    <AddSketchView />
  </div>
</template>

<script lang="ts">
import AddSketchView from './view/AddSketchView.vue';
import {isAuthorized} from "@/global/utils";

export default {
  name: 'AddSketchWrapper',
  components: {
    AddSketchView
  },
  beforeCreate() {
    if (!isAuthorized()) {
      this.$router.push('/authorization');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>