<template>
  <div class="container sketches">
    <Filter
        class="sketches__filter"
        v-model:name="name"
        v-model:tags="tags"
        @sketches:filter="getFilteredSketches"
    />
    <SketchesContent
        class="sketches__content"
        :sketches="sketches"
    />
    <SketchesPagination
        v-if="sketches.length"
        :total-pages="10"
        v-model:current-page="currentPage"
        v-model:current-count="currentCount"
    />
  </div>
</template>

<script lang="ts">

import SketchesContent from "@/pages/sketches/components/sketches/SketchesContent.vue";
import Filter from "@/pages/sketches/components/filter/Filter.vue";
import {mapActions, mapGetters} from "vuex";
import SketchesPagination from "@/pages/sketches/components/sketches/SketchesPagination.vue";
import {SketchesListQueryParams} from "@/global/api";

export default {
  name: "SketchesView",
  components: {SketchesPagination, Filter, SketchesContent},
  data() {
    return {
      currentPage: 1,
      currentCount: 30,
      name: '',
      tags: [],
      allowChangePagination: true
    }
  },
  async mounted() {
    await this.getSketches({
      page: this.currentPage - 1,
      size: this.currentCount
    });
  },
  computed: {
    ...mapGetters('sketches', {
      sketches: 'sketches'
    })
  },
  watch: {
    async currentPage() {
      if (this.allowChangePagination) {
        await this.getSketches({
          page: this.currentPage - 1,
          size: this.currentCount
        });
      }
    },
    async currentCount() {
      this.allowChangePagination = false;
      this.currentPage = 1;

      await this.getSketches({
        page: this.currentPage - 1,
        size: this.currentCount
      });
      this.allowChangePagination = true;
    }
  },
  methods: {
    ...mapActions('sketches', {
      getSketches: 'getSketches'
    }),
    async getFilteredSketches() {
      this.currentPage = 1;
      this.currentCount = 30;

      const preparedQueryParams: SketchesListQueryParams = {};

      preparedQueryParams.page = this.currentPage - 1;
      preparedQueryParams.size = this.currentCount;

      if (this.name) {
        //@ts-ignore
        const preparedName = this.name.replace(/\s+/g, ' ');
        preparedQueryParams.name = preparedName.split(' ');
      }

      if (this.tags.length) {
        preparedQueryParams.tags = this.tags.map(tag => tag);
      }

      await this.getSketches(preparedQueryParams);
    }
  }
};
</script>

<style scoped lang="scss">
.sketches {
  display: block;
  padding: 30px 10px;

  &__filter {
    margin-bottom: 20px;
  }

  &__content {
  }
}
</style>