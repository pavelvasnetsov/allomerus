<template>
  <v-carousel
      v-if="urls.length"
      hide-delimiter-background
      :show-arrows="urls.length > 1 ? 'hover' : false"
  >
    <v-carousel-item
        v-for="url in urls"
        :key="url"
        :src="url"
    ></v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
export default{
  name: "SketchPreviewCarousel",
  props: {
    urls: {
      type: Array<String>,
      default: []
    }
  }
}
</script>

<style scoped lang="scss">

</style>