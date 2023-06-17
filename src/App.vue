<template>
  <div
      class="loader"
      v-show="showLoader"
  >
    <loading
        class="loader__icon"
        :active="showLoader"
        color="#2196F3"
    />
  </div>
  <v-app>
    <v-app-bar>
      <div class="container">
        <AuthorizedTools v-if="isAuthorized"/>
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
import {mapActions, mapGetters} from 'vuex';
import UnauthorizedTools from './components/UnauthorizedTools.vue';
import AuthorizedTools from './components/AuthorizedTools.vue';
import './global/style/style.css'
import Loading from 'vue-loading-overlay';

export default {
  components: {AuthorizedTools, UnauthorizedTools, Loading},
  name: "App",
  computed: {
    ...mapGetters('checkingAuthorization', {
      isAuthorized: 'isAuthorized'
    }),
    ...mapGetters('loader', {
      showLoader: 'show'
    })
  },
  watch: {
    isAuthorized(value: boolean) {
      if (value) {
        this.$router.push('/sketches');
      } else {
        this.$router.push('/authorization');
      }
    }
  },
  async mounted() {
    if (this.isAuthorized) {
      try {
        await this.getMeInfo();
      } catch (e) {
        console.error(e);
      }
    }
  },
  methods: {
    ...mapActions('me', {
      getMeInfo: 'getMeInfo'
    })
  }
};
</script>

<style lang="scss">
.loader {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__icon {

  }
}
</style>
