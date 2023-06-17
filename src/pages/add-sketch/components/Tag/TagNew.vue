<template>
  <div class="tag-new">
    <v-dialog
        v-model="dialog"
        width="900px"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            v-bind="props"
            class="tag-new__btn"
            variant="text"
        >
          Добавить новый тег
        </v-btn>
      </template>

      <v-card
          class="tag-new__dialog"
      >
        <v-form
            ref="tagForm"
        >
          <v-text-field
              v-model="tag"
              label="Новый тег"
              type="text"
              :rules="rules"
              hide-details="auto"
              variant="outlined"
              autocomplete="off"
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red-darken-1"
              variant="text"
              @click="dialog = false"
          >
            Отмена
          </v-btn>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="createNewTag"
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {mapActions, mapMutations} from "vuex";

export default {
  name: "TagNew",
  data() {
    return {
      tag: '',
      dialog: false,
      rules: [
        (value: string) => !!value || 'Поле обязательное',
        (value: string) => (value && value.length >= 2) || 'Минимум 2 символа',
      ],
    }
  },
  methods: {
    ...mapActions('tag', {
      createTag: 'createTag'
    }),
    ...mapMutations('snackbar', {
      setShow: 'SET_SHOW',
      setMessage: 'SET_MESSAGE'
    }),
    async createNewTag() {
      //@ts-ignore
      const {valid} = await this.$refs.tagForm.validate();

      if (valid) {
        try {
          await this.createTag({
            name: this.tag
          });

          this.tag = '';
          this.dialog = false;
          await this.$refs.tagForm.reset();
          this.setMessage('Новый тег успешно добавлен')
          this.setShow({
            show: true,
            color: 'green'
          });
        } catch (e) {
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.tag-new {
  &__dialog {
    padding: 20px 20px 0;
  }

  &__btn {
  }
}
</style>