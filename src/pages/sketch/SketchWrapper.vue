<template>
  <SketchView/>
</template>

<script lang="ts">
import SketchView from "@/pages/sketch/views/SketchView.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SketchWrapper",
  components: {SketchView},
  async mounted() {
    try {
      await this.getSketch(this.$route.params.sketchId);
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    ...mapActions('sketch', {
      getSketch: 'getSketch'
    })
  }
};
</script>

<style scoped lang="scss">

</style>