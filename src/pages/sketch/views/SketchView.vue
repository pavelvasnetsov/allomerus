<template>
  <div class="container sketch">
    <SketchCarousel
        class="sketch__carousel"
        :files="sketchInfo.files"
    />
    <SketchInfo
        class="sketch__info"
        :sketch-info="sketchInfo"
    />
    <Likes
        :liked="thereIsMyLike(userEmail)"
        :countLikes="countLikes"
        @add:like="likeSketch(sketchId)"
        @delete:like="deleteLikeSketch({ sketchId, userEmail })"
    />

    <div class="sketch__comments-header">
      Комментарии
    </div>

    <CommentsForm
        v-model="commentText"
        @add:comment="addComment"
    />

    <CommentsList
        :comments="sketchComments"
    />
<!--    <ReviewsList/>-->
<!--    <ReviewsForm/>-->
  </div>
</template>

<script lang="ts">
import {mapActions, mapGetters, mapMutations} from "vuex";
import SketchCarousel from "@/pages/sketch/components/Sketch/SketchCarousel.vue";
import SketchInfo from "@/pages/sketch/components/Sketch/SketchInfo.vue";
import Likes from "@/pages/sketch/components/Likes/Likes.vue";
import CommentsList from "@/pages/sketch/components/Comments/CommentsList.vue";
import CommentsForm from "@/pages/sketch/components/Comments/CommentsForm.vue";
import ReviewsList from "@/pages/sketch/components/Reviews/ReviewsList.vue";
import ReviewsForm from "@/pages/sketch/components/Reviews/ReviewsForm.vue";

export default {
  name: "SketchView",
  components: {ReviewsList, CommentsForm, CommentsList, Likes, SketchInfo, SketchCarousel, ReviewsForm},
  data() {
    return {
      commentText: ''
    }
  },
  computed: {
    ...mapGetters('sketch', {
      sketchInfo: 'sketchInfo',
      thereIsMyLike: 'thereIsMyLike',
      countLikes: 'countLikes',
      sketchComments: 'sketchComments'
    }),
    ...mapGetters('me', {
      meInfo: 'meInfo'
    }),
    userEmail() {
      return this.meInfo.email;
    },
    sketchId() {
      return this.$route.params.sketchId;
    }
  },
  async mounted() {
    try {
      this.setLoader(true);
      await this.getSketch(this.$route.params.sketchId);
      await this.getSketchLikes(this.$route.params.sketchId);
      await this.getSketchComments(this.$route.params.sketchId);
      this.setLoader(false);
    } catch (e) {
      console.error(e);
      this.setLoader(false);
    }
  },
  methods: {
    ...mapActions('sketch', {
      getSketchLikes: 'getSketchLikes',
      likeSketch: 'likeSketch',
      deleteLikeSketch: 'deleteLikeSketch',
      createSketchComment: 'createSketchComment',
      getSketchComments: 'getSketchComments',
      getSketch: 'getSketch'
    }),
    ...mapMutations('loader', {
      setLoader: 'SET_SHOW'
    }),
    async addComment(form) {
      const {valid} = await form.validate();

      if (valid) {
        await this.createSketchComment({
          sketchId: this.$route.params.sketchId,
          payload: {
            text: this.commentText
          }
        });

        this.commentText = '';
        await form.reset();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.sketch {
  display: block;
  padding: 30px 10px;

  &__carousel {
    width: 100%;
    height: 500px;
    margin-bottom: 20px;
  }

  &__info {
  }

  &__comments-header {
    font-size: 24px;
    line-height: 150%;
    margin-bottom: 20px;
  }
}
</style>