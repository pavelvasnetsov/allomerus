<template>
  <v-autocomplete
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :items="tags"
      label="Поиск по тегам"
      multiple
      chips
      closable-chips
      variant="outlined"
      item-title="name"
      item-value="name"
      :disabled="isLoading"
      autocomplete="off"
  />
</template>

<script lang="ts">
import {mapActions, mapGetters} from "vuex";

export default {
  name: "FilterAutocomplete",
  props: {
    modelValue: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  async mounted() {
    this.isLoading = true;
    await this.getAllTags();
    this.isLoading = false;
  },
  computed: {
    ...mapGetters('tag', {
      tags: 'tags'
    })
  },
  methods: {
    ...mapActions('tag', {
      getAllTags: 'getAllTags'
    })
  }
}
</script>

<style scoped lang="scss">

</style>