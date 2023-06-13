<template>
  <div class="likes">
    <v-btn
        class="ma-2"
        variant="text"
        icon="mdi-thumb-up"
        :color="liked ? 'red' : 'gray'"
        @click="likeToggle"
    ></v-btn>
    {{ countLikes }}
  </div>
</template>

<script lang="ts">
export default {
  name: "Likes",
  props: {
    liked: {
      type: Boolean,
      default: false
    },
    countLikes: {
      type: Number,
      default: 0
    }
  },
  methods: {
    likeToggle() {
      if (this.liked) {
        this.$emit('delete:like');
      } else {
        this.$emit('add:like');
      }
    }
  }
};
</script>

<style scoped lang="scss">
.likes{
  background: #F5F5F5;
  display: inline-block;
  padding-right: 20px;
  border-radius: 30px;
  margin-bottom: 25px;
  margin-top: 15px;
}
</style>