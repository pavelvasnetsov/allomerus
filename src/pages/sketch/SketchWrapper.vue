<template>
  <SketchView/>
</template>

<script lang="ts">
import SketchView from "@/pages/sketch/views/SketchView.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SketchWrapper",
  components: {SketchView}
};
</script>

<style scoped lang="scss">

</style>