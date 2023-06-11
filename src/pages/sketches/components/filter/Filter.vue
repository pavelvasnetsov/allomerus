<template>
  <div
      class="filter"
  >
    <div
        class="filter__title"
    >Фильтр
    </div>
    <v-text-field
        class="filter__search"
        :model-value="name"
        @update:model-value="$emit('update:name', $event)"
        label="Поиск по имени"
        type="text"
        hide-details="auto"
        variant="outlined"
        autocomplete="off"
        clearable
    />
    <FilterAutocomplete
        :model-value="tags"
        @update:model-value="$emit('update:tags', $event)"
    />
    <v-btn
        class="filter__btn"
        color="blue"
        @click="$emit('sketches:filter')"
    >Отфильтровать
    </v-btn>
  </div>
</template>

<script lang="ts">
import FilterAutocomplete from "@/pages/sketches/components/filter/FilterAutocomplete.vue";

export default {
  name: "Filter",
  components: {FilterAutocomplete},
  props: {
    name: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: ''
    }
  }
};
</script>

<style scoped lang="scss">
.filter {
  &__title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  &__search {
    margin-bottom: 10px;
  }

  &__btn {
    margin-bottom: 10px;
  }
}
</style>