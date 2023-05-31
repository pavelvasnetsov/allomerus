<template>
  <v-app>
    <v-app-bar>
      <div class="container">
        <AuthorizedTools v-if="!isAuthorized"/>
        <UnauthorizedTools v-else/>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <MySnackbar/>
  </v-app>
</template>

<script lang="ts">
import {mapGetters} from 'vuex';
import AuthorizedTools from './components/AuthorizedTools.vue';
import UnauthorizedTools from './components/UnauthorizedTools.vue';
import './global/style/style.css'

export default {
  components: {AuthorizedTools, UnauthorizedTools},
  name: "App",
  computed: {
    ...mapGetters('checkingAuthorization', {
      isAuthorized: 'isAuthorized'
    }),
  },
  watch: {
    isAuthorized(value: boolean) {
      if (value) {
        this.$router.push('/sketches');
      } else {
        this.$router.push('/authorization');
      }
    }
  }
};
</script>

<style lang="scss">
</style>
