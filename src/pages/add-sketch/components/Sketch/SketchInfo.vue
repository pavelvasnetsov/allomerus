<template>
  <div
      class="sketch-info"
  >
    <v-text-field
        class="sketch-info__name"
        :modelValue="name"
        @update:modelValue="$emit('update:name', $event)"
        label="Название"
        type="text"
        :rules="rules"
        hide-details="auto"
        variant="outlined"
        autocomplete="off"
    ></v-text-field>
    <v-textarea
        class="sketch-info__description"
        :modelValue="description"
        @update:modelValue="$emit('update:description', $event)"
        label="Описание"
        :rules="rules"
        hide-details="auto"
        variant="outlined"
    >
    </v-textarea>
  </div>
</template>

<script lang="ts">
export default {
  name: "SketchInfo",
  props: {
    name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rules: [
        (value: string) => !!value || 'Поле обязательное',
        (value: string) => (value && value.length >= 4) || 'Минимум 4 символа',
      ],
    }
  }
}
</script>

<style scoped lang="scss">
.sketch-info {
  &__name {
    margin-bottom: 20px;
  }

  &__description {
    margin-bottom: 20px;
  }
}
</style>