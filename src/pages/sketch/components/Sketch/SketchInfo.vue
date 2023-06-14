<template>
  <div class="sketch-info">
    <div class="sketch-info__title">
      {{ sketchInfo.name }}
    </div>
    <div class="sketch-info__description">
      {{ sketchInfo.description }}
    </div>
    <div class="sketch-info__author-name">
      <span class="sketch-info__field">Автор:</span>
      {{ sketchInfo.authorName }}
    </div>
    <div class="sketch-info__author-email">
      <span class="sketch-info__field">Электронная почта автора:</span>
      {{ sketchInfo.authorEmail }}
    </div>
    <div
        class="sketch-info__tags"
        v-if="!!preparedTags"
    >
      <span class="sketch-info__field">Теги:</span>
      {{ preparedTags }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SketchInfo",
  props: {
    sketchInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    preparedTags() {
      return this.sketchInfo.tags.map(tag => tag.name).join(", ");
    }
  }
}
</script>

<style scoped lang="scss">
.sketch-info {
  font-size: 18px;
  line-height: 150%;

  &__title {
    font-size: 24px;
    line-height: 150%;
    margin-bottom: 10px;
    font-weight: 500;
  }

  &__description {
    color: gray;
    margin-bottom: 30px;
  }

  &__author-name {
    margin-bottom: 10px;
  }

  &__field {
    color: gray;
    font-weight: 500;
    display: inline-block;
    width: 250px;
  }

  &__author-email {
    margin-bottom: 10px;
  }

  &__tags {
    margin-bottom: 10px;
  }
}
</style>