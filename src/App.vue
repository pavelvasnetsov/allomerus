<template>
  <v-app>
    <v-main> 
      Приветствую 
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {
  name: "App",

  data() {
    return {
      //
    };
  },
};
</script>
