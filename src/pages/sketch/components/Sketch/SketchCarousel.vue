<template>
  <v-carousel
      v-if="files.length"
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
  name: "SketchCarousel",
  props: {
    files: {
      type: Array<String>,
      default: []
    }
  },
  computed: {
    urls() {
      return this.files.map(file => {
        return `${import.meta.env.VITE_API_CONTENT_URL}/sketches/resource?url=${file}`
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>