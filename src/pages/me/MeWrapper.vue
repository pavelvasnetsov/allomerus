<template>
  <div>
    <MeView />
  </div>
</template>

<script lang="ts">
import MeView from '@/pages/me/views/MeView.vue';
import {isAuthorized} from "@/global/utils";

export default {
  name: 'MeWrapper',
  components: {
    MeView
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