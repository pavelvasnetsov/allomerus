<template>
  <v-app>
    <v-app-bar>
      <div class="container">
        <AuthorizedTools />
        <UnauthorizedTools />
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import AuthorizedTools from './components/AuthorizedTools.vue';
import UnauthorizedTools from './components/UnauthorizedTools.vue';
import './global/style/style.css'

export default {
  components: { AuthorizedTools, UnauthorizedTools },
  name: "App",

  data() {
    return {
      //
    };
  },
  computed: {
  }
};
</script>

<style lang="scss">
</style>
