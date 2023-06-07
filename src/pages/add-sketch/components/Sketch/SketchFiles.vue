<template>
  <v-file-input
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      placeholder="Загрузите ваше эскизы (.jpg, .png, .jpeg)"
      label="Эскизы"
      accept="image/png, image/jpeg, image/jpg"
      multiple
      prepend-icon="mdi-camera"
      variant="outlined"
  >
    <template v-slot:selection="{ fileNames }">
      <template v-for="fileName in fileNames" :key="fileName">
        <v-chip
            size="small"
            label
            color="blue"
            class="me-2"
        >
          {{ fileName }}
        </v-chip>
      </template>
    </template>
  </v-file-input>
</template>

<script lang="ts">
export default {
  name: "AddFiles",
  props: {
    modelValue: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped lang="scss">

</style>