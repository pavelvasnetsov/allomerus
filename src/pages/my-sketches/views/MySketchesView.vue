<template>
  <div class="container my-sketches">
    <div class="my-sketches__title">
      Мои работы
    </div>
    <SketchesContent
        class="my-sketches__content"
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

import {mapActions, mapGetters} from "vuex";
import {SketchesListQueryParams} from "@/global/api";
import SketchesPagination from "@/pages/my-sketches/components/sketches/SketchesPagination.vue";
import SketchesContent from "@/pages/my-sketches/components/sketches/SketchesContent.vue";

export default {
  name: "MySketchesView",
  components: {SketchesPagination, SketchesContent},
  data() {
    return {
      currentPage: 1,
      currentCount: 30,
      allowChangePagination: true
    }
  },
  created() {
    this.currentPage = +this.$route.query?.page + 1 || 1;
    this.currentCount = +this.$route.query?.size || 30;
  },
  async mounted() {
    await this.getMySketches(this.preparedQueryParams);
  },
  computed: {
    ...mapGetters('mySketches', {
      sketches: 'sketches',
      sketchesCount: 'sketchesCount'
    }),
    totalPages() {
      return Math.ceil(this.sketchesCount / this.currentCount);
    },

    preparedQueryParams() {
      const preparedQueryParams: SketchesListQueryParams = {};

      preparedQueryParams.page = this.currentPage - 1;
      preparedQueryParams.size = this.currentCount;

      return preparedQueryParams;
    }
  },
  watch: {
    async currentPage() {
      if (this.allowChangePagination) {
        await this.getMySketches(this.preparedQueryParams);
        this.$router.push({path: this.$route.path, query: this.preparedQueryParams});
      }
    },
    async currentCount() {
      this.allowChangePagination = false;
      this.currentPage = 1;

      await this.getMySketches(this.preparedQueryParams);
      this.$router.push({path: this.$route.path, query: this.preparedQueryParams});
      this.allowChangePagination = true;
    }
  },
  methods: {
    ...mapActions('mySketches', {
      getMySketches: 'getMySketches'
    }),
    async getFilteredSketches() {
      this.currentPage = 1;
      this.currentCount = 30;

      await this.getMySketches(this.preparedQueryParams);

      this.$router.push({path: this.$route.path, query: this.preparedQueryParams});
    }
  }
};
</script>

<style scoped lang="scss">
.my-sketches {
  display: block;
  padding: 30px 10px;

  &__title {
    font-size: 30px;
    margin-bottom: 20px;
  }

  &__filter {
    margin-bottom: 20px;
  }

  &__content {
  }
}
</style>