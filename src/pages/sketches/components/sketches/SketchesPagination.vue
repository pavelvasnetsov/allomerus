<template>
  <div
      class="pagination"
  >
    <v-pagination
        :length="totalPages"
        :modelValue="currentPage"
        @update:modelValue="$emit('update:current-page', $event)"
        class="pagination__pages"
    />
    <div
        class="pagination__count"
    >
      <button
          v-for="count in counts"
          :key="count"
          class="pagination__btn"
          :disabled="count === currentCount"
          @click="$emit('update:current-count', count)"
      >
        {{ count }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SketchesPagination",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 5
    },
    currentCount: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      counts: [30, 60, 90]
    }
  }
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;

  &__pages {
  }

  &__count {
  }

  &__btn {
    width: 48px;
    height: 48px;
    border-radius: 3px;
    font-weight: 500;
    margin-right: 10px;

    &:hover {
      background: #F5F5F5;
    }

    &[disabled] {
      background: #E5E5E5;
    }
  }
}
</style>