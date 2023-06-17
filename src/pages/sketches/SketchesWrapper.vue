<template>
  <SketchesView/>
</template>

<script lang="ts">
import {isAuthorized} from "@/global/utils";
import SketchesView from "@/pages/sketches/views/SketchesView.vue";
import {mapMutations} from "vuex";

export default {
  name: 'SketchesWrapper',
  components: {SketchesView},

  created() {
    if (!isAuthorized()) {
      this.$router.push('/authorization');
    }
    this.setIsAuthorized(isAuthorized());
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