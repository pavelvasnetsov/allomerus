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
        v-if="sketchesCount"
        :total-pages="totalPages"
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
  created() {
    this.name = this.$route.query.name instanceof Array ? this.$route.query.name.join(' ') : (this.$route.query.name ?? '');
    this.tags = this.$route.query.tags instanceof Array ? this.$route.query.tags : (this.$route.query.tags ? [this.$route.query.tags] : []);
    this.currentPage = +this.$route.query?.page + 1 || 1;
    this.currentCount = +this.$route.query?.size || 30;
  },
  async mounted() {
    await this.getSketches(this.preparedQueryParams);
  },
  computed: {
    ...mapGetters('sketches', {
      sketches: 'sketches',
      sketchesCount: 'sketchesCount'
    }),
    totalPages() {
      return Math.ceil(this.sketchesCount / this.currentCount);
    },
    preparedNameParam() {
      return this.name.replace(/\s+/g, ' ').split(' ');
    },

    preparedQueryParams() {
      const preparedQueryParams: SketchesListQueryParams = {};

      preparedQueryParams.page = this.currentPage - 1;
      preparedQueryParams.size = this.currentCount;

      if (this.name) {
        preparedQueryParams.name = this.preparedNameParam;
      }

      if (this.tags.length) {
        preparedQueryParams.tags = this.tags.map(tag => tag);
      }

      return preparedQueryParams;
    }
  },
  watch: {
    async currentPage() {
      if (this.allowChangePagination) {
        await this.getSketches(this.preparedQueryParams);
        this.$router.push({path: this.$route.path, query: this.preparedQueryParams});
      }
    },
    async currentCount() {
      this.allowChangePagination = false;
      this.currentPage = 1;

      await this.getSketches(this.preparedQueryParams);
      this.$router.push({path: this.$route.path, query: this.preparedQueryParams});
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

      await this.getSketches(this.preparedQueryParams);

      this.$router.push({path: this.$route.path, query: this.preparedQueryParams});
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