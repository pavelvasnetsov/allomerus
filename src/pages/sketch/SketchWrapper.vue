<template>
  <SketchView/>
</template>

<script lang="ts">
import SketchView from "@/pages/sketch/views/SketchView.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";
import {isAuthorized} from "@/global/utils";

export default {
  name: "SketchWrapper",
  components: {SketchView},
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

<style scoped lang="scss">

</style>