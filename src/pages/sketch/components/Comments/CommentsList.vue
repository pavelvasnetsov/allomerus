<template>
  <div class="comments-list">
    <div class="comments-list__content content">
      <ul class="content__list">
        <li
            class="content__item item"
            v-for="comment in comments"
            :key="comment.id"
        >
          <div class="item__header">
            {{ comment.user }}
          </div>
          <div class="item__text">
            {{ comment.text }}
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