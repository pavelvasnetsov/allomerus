<template>
  <div>
    <AddSketchView />
  </div>
</template>

<script lang="ts">
import AddSketchView from '@/pages/add-sketch/views/AddSketchView.vue';
import {isAuthorized} from "@/global/utils";
import {mapMutations} from "vuex";

export default {
  name: 'AddSketchWrapper',
  components: {
    AddSketchView
  },
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