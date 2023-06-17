<template>
  <MySketchesView/>
</template>

<script lang="ts">

import MySketchesView from "@/pages/my-sketches/views/MySketchesView.vue";
import {isAuthorized} from "@/global/utils";
import {mapMutations} from "vuex";

export default {
  name: "MySketchesWrapper",
  components: {MySketchesView},
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