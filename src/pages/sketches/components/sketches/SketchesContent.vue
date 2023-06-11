<template>
  <div class="sketch-content">
    <div
        class="sketch-content__empty"
        v-if="!sketches.length"
    >
      Работы не найдены
    </div>
    <div class="sketch-content__cards" v-else>
      <SketchesCard
          class="sketch-content__card"
          v-for="sketch in sketches"
          :key="sketch.id"
          :image-src="sketch.files[0]"
          :title="sketch.name"
          :description="sketch.description"
      />
    </div>
  </div>
</template>

<script lang="ts">
import SketchesCard from "@/pages/sketches/components/sketches/SketchesCard.vue";
import {Sketch} from "@/global/api";
export default {
  name: "SketchesContent",
  components: {SketchesCard},
  props: {
    sketches: {
      type: Array<Sketch>,
      default: []
    }
  },
}
</script>

<style scoped lang="scss">
.sketch-content {

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-bottom: 20px;
  }

  &__empty {
    font-size: 30px;
  }
}
</style>