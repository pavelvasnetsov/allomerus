<template>
  <v-form
      ref="comment_form"
      class="comment-form"
  >
    <v-text-field
        class="comment-form__input"
        :model-value="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        label="Введите комментарий"
        type="text"
        :rules="rules"
        hide-details="auto"
        variant="outlined"
        autocomplete="off"
    />
    <v-btn
        class="comment-form__btn"
        @click="$emit('add:comment', $refs.comment_form)"
        color="blue"
    >
      Оставить комментарий
    </v-btn>
  </v-form>
</template>

<script lang="ts">
export default {
  name: "CommentsForm",
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rules: [
        (value: string) => !!value || 'Поле обязательное',
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.comment-form {
  margin-bottom: 25px;

  &__input {
    margin-bottom: 10px;
  }

  &__btn {
  }
}
</style>