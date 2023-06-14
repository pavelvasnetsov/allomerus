<template>
  <div class="sketch-card">
    <div class="sketch-card__img-block">
      <v-img
          :src="imageUrl"
          height="200px"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
                color="grey-lighten-4"
                indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>
    </div>
    <div class="sketch-card__content">
      <div class="sketch-card__name">
        {{ title }}
      </div>
      <div class="sketch-card__description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SketchesCard",
  props: {
    imageSrc: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Название работы'
    },
    description: {
      type: String,
      default: 'Описание работы'
    }
  },
  computed: {
    imageUrl() {
      return this.imageSrc ?
          `${import.meta.env.VITE_API_CONTENT_URL}/sketches/resource?url=${this.imageSrc}`
          : 'https://topzero.com/wp-content/uploads/2020/06/topzero-products-Malmo-Matte-Black-TZ-PE458M-image-003.jpg';
    }
  }
};
</script>

<style scoped lang="scss">
.sketch-card {
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  border: 1px solid #f5f5f5;
  border-radius: 5px;

  &__img-block {
    border-bottom: 1px solid #f5f5f5;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 200px;
    background: #f5f5f5;
    padding: 10px 20px;
  }

  &__name {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 5px;
  }

  &__description {
    font-size: 14px;
    line-height: 21px;
    color: gray;
    overflow: hidden;
    width: 100%;
  }
}
</style>