<template>
  <div class="container edit-me">
    <div class="edit-me__header">
      Редактирование аккаунта
    </div>
    <v-img
        class="edit-me__avatar"
        v-if="loadedAvatar"
        :src="loadedAvatar ? loadedAvatar : ''"
        width="200"
        height="200"
        cover
    >
    </v-img>
    <v-form
        ref="editMeForm"
        class="edit-me__form"
    >
      <v-file-input
          v-model="avatar"
          placeholder="Загрузите вашу фотографию (.jpg, .png, .jpeg)"
          label="Фото профиля"
          accept="image/png, image/jpeg, image/jpg"
          prepend-icon="mdi-camera"
          variant="outlined"
      >
        <template v-slot:selection="{ fileNames }">
          <template v-for="fileName in fileNames" :key="fileName">
            <v-chip
                size="small"
                label
                color="blue"
                class="me-2"
            >
              {{ fileName }}
            </v-chip>
          </template>
        </template>
      </v-file-input>
      <v-text-field
          v-model="firstName"
          class="edit-me__input"
          label="Имя"
          :rules="rules"
          hide-details="auto"
          variant="outlined"
      ></v-text-field>
      <v-text-field
          v-model="lastName"
          class="edit-me__input"
          label="Фамилия"
          :rules="rules"
          hide-details="auto"
          variant="outlined"
      ></v-text-field>
      <v-text-field
          v-model="username"
          class="edit-me__input"
          label="Имя пользователя"
          :rules="rules"
          hide-details="auto"
          variant="outlined"
      ></v-text-field>
      <v-textarea
          v-model="bio"
          class="edit-me__input"
          label="Коротко о себе"
          :rules="rules"
          hide-details="auto"
          variant="outlined"
      >
      </v-textarea>
      <v-select
          v-model="role"
          class="edit-me__input"
          item-title="title"
          item-value="value"
          label="Роль"
          :items="roles"
          variant="outlined"
      ></v-select>
    </v-form>
    <div class="edit-me__tools">
      <v-btn
          @click="saveChanges"
          color="blue"
      >
        Сохранить
      </v-btn>
      <v-btn
          @click="$emit('change:edit-mode', false)"
          color="blue"
          variant="text"
      >
        Отмена
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import {Roles} from "@/global/types";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "EditMeView",
  data() {
    return {
      loadedAvatar: null,
      avatar: null,
      firstName: '',
      lastName: '',
      username: '',
      bio: '',
      roles: [
        {
          title: 'Покупатель',
          value: Roles.consumer
        },
        {
          title: 'Дизайнер',
          value: Roles.author
        }
      ],
      role: Roles.consumer,
      rules: [
        (value: string) => !!value || 'Поле обязательное',
        (value: string) => (value && value.length >= 4) || 'Минимум 4 символа',
      ]
    }
  },
  async mounted() {
    this.firstName = this.meInfo.firstName;
    this.lastName = this.meInfo.lastName;
    this.username = this.meInfo.username;
    this.bio = this.meInfo.bio;
    this.role = this.meInfo.roles[0];
  },
  computed: {
    ...mapGetters('me', {
      meInfo: 'meInfo'
    })
  },
  watch: {
    avatar() {
      if (this.avatar || this.avatar[0]) {
        try {
          let reader = new FileReader();
          reader.onload = (e) => {
            //@ts-ignore
            this.loadedAvatar = e.target.result;
          }
          reader.readAsDataURL(this.avatar[0]);
        } catch (e) {
          this.loadedAvatar = null;
        }
      }
    }
  },
  methods: {
    ...mapActions('me', {
      updateMeInfo: 'updateMeInfo'
    }),
    ...mapMutations('snackbar', {
      setShow: 'SET_SHOW',
      setMessage: 'SET_MESSAGE'
    }),
    async saveChanges() {

      try {
        const {valid} = await this.$refs.editMeForm.validate();

        if (valid) {
          await this.updateMeInfo({
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            bio: this.bio,
            roles: [this.role],
            avatar: this.avatar?.[0]
          });

          this.setMessage('Работа успешно добавлена');
          this.setShow({
            show: true,
            color: 'green'
          });

          this.$emit('change:edit-mode', false);
        }
      } catch (e) {
        console.log(e);
      } finally {
      }
    }
  }
}
</script>

<style scoped lang="scss">
.edit-me {
  padding: 30px 10px;
  display: block;

  &__header {
    font-size: 30px;
    line-height: 150%;
    margin-bottom: 30px;
  }

  &__avatar {
    margin-bottom: 30px;
  }

  &__form {
  }

  &__input {
    margin-bottom: 20px;
  }

  &__tools {
    display: flex;
    justify-content: space-between;
  }
}
</style>