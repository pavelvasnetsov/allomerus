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
    <div class="sketch__tools">
      <Likes
          :liked="thereIsMyLike(userEmail)"
          :countLikes="countLikes"
          @add:like="likeSketch(sketchId)"
          @delete:like="deleteLikeSketch({ sketchId, userEmail })"
      />
      <div
          class="sketch__btns"
      >
        <v-btn
            color="red"
            variant="text"
            v-if="canBeDeleted"
            @click="deleteSketch"
            :loading="deleteSketchLoader"
        >
          Удалить работу
          <template v-slot:loader>
            <v-progress-circular indeterminate></v-progress-circular>
          </template>
        </v-btn>
      </div>
    </div>

    <div class="sketch__comments-header">
      Комментарии
    </div>

    <CommentsForm
        v-model="commentText"
        @add:comment="addComment"
    />

    <CommentsList
        :comments="sketchComments"
        :me="userEmail"
        :delete-loader="deleteSketchCommentLoader"
        @delete:comment="deleteSketchComment"
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
      commentText: '',
      deleteSketchLoader: false,
      deleteSketchCommentLoader: false
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
    },
    canBeDeleted() {
      return this.sketchInfo.authorEmail === this.userEmail;
    }
  },
  async mounted() {
    try {
      this.setLoader(true);
      await this.getSketch(this.$route.params.sketchId);
      await this.getSketchLikes(this.$route.params.sketchId);
      await this.getSketchComments(this.$route.params.sketchId);
    } catch (e) {
      console.error(e);
      await this.$router.push('/sketches');
    } finally {
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
      getSketch: 'getSketch',
      deleteSketchAction: 'deleteSketch',
      deleteSketchCommentAction: 'deleteSketchComment',
    }),
    ...mapMutations('loader', {
      setLoader: 'SET_SHOW'
    }),
    ...mapMutations('snackbar', {
      setShow: 'SET_SHOW',
      setMessage: 'SET_MESSAGE'
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
    },
    async deleteSketch() {
      try {
        this.deleteSketchLoader = true;

        await this.deleteSketchAction(this.sketchId);
        await this.$router.push('/sketches');
        this.setMessage('Работа успешно удалена');
        this.setShow({
          show: true,
          color: 'green'
        });
      } catch (e) {
        console.error(e);
      } finally {
        this.deleteSketchLoader = false;
      }
    },
    async deleteSketchComment(commentId) {
      try {
        this.deleteSketchCommentLoader = true;

        await this.deleteSketchCommentAction(commentId);
        this.setMessage('Комментарий успешно удален');
        this.setShow({
          show: true,
          color: 'green'
        });
      } catch (e) {
        console.error(e);
      } finally {
        this.deleteSketchCommentLoader = false;
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

  &__tools {
    display: flex;
    justify-content: space-between;
  }

  &__comments-header {
    font-size: 24px;
    line-height: 150%;
    margin-bottom: 20px;
  }
}
</style>