<template>
  <div class="comments-list">
    <div class="comments-list__content content">
      <ul class="content__list">
        <li
            class="content__item item"
            v-for="comment in comments"
            :key="comment.id"
        >
          <div class="item__content">
            <div class="item__header">
              {{ comment.user }}
            </div>
            <div class="item__text">
              {{ comment.text }}
            </div>
          </div>
          <div class="item__tools">
            <v-btn
                v-if="comment.user === me"
                class="item__delete-btn"
                icon="$close"
                variant="text"
                @click="deleteHandler(comment.id)"
                :loader="deleteLoader && comment.id === deletingComment"
            >
              <template v-slot:loader>
                <v-progress-circular indeterminate></v-progress-circular>
              </template>
            </v-btn>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CommentsList",
  props: {
    comments: {
      type: Array,
      default: []
    },
    me: {
      type: String,
      default: ""
    },
    deleteLoader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deletingComment: ''
    }
  },
  methods: {
    deleteHandler(id) {
      this.deletingComment = id;
      this.$emit('delete:comment', id)
    }
  }
}
</script>

<style scoped lang="scss">
.comments-list {
  &__content {
  }
}

.content {
  &__list {
    list-style:none;
  }

  &__item {
    margin-bottom: 25px;
  }
}

.item {
  font-size: 16px;
  line-height: 150%;
  display: flex;

  &__content {
    flex-grow: 1;
  }

  &__header {
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    margin-bottom: 5px;
  }

  &__text {

  }
}
</style>