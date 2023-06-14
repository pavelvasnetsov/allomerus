<template>
  <div class="container me">
    <div class="me__header">
      <div class="me__title">Мой аккаунт</div>
      <div class="me__tools">
        <v-btn
            v-if="isAuthor"
            class="me__sketches-btn"
            color="blue"
            @click="$router.push('/sketches/my')"
        >мои работы</v-btn>
        <v-btn
            class="me__edit-btn"
            @click="$emit('change:edit-mode', true)"
        >редактировать профиль</v-btn>
      </div>
    </div>
    <div class="me__info info">
      <v-img
          class="info__avatar"
          v-if="imageUrl"
          :src="imageUrl"
          width="200"
          height="200"
          cover
      >
      </v-img>
      <div class="info__firstName">
        <span class="info__subtitle">Имя:</span> {{ me.firstName }}
      </div>
      <div class="info__lastName">
        <span class="info__subtitle">Фамилия:</span> {{ me.lastName }}
      </div>
      <div class="info__username">
        <span class="info__subtitle">Имя пользователя:</span> {{ me.username }}
      </div>
      <div class="info__email">
        <span class="info__subtitle">Почта:</span> {{ me.email }}
      </div>
      <div class="info__bio">
        <span class="info__subtitle">Обо мне:</span> {{ me.bio }}
      </div>
      <div class="info__role">
        <span class="info__subtitle">Моя роль:</span> {{ role }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {mapGetters} from "vuex";
import {Roles} from "@/global/types";

export default {
  name: 'MeView',
  computed: {
    ...mapGetters('me', {
      me: 'meInfo',
      roles: 'roles',
    }),
    role() {
      if (this.roles.includes(Roles.author)) {
        return 'Автор';
      }

      return 'Пользователь'
    },
    isAuthor() {
      return this.roles.includes(Roles.author);
    },
    imageUrl() {
      return this.me.avatar ?
          `${import.meta.env.VITE_API_USERS_URL}/me/resource?url=${this.me.avatar}`
          : '';
    }
  }
};
</script>

<style lang="scss" scoped>
.me {
  display: block;
  padding: 30px 10px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  &__title {
    font-size: 30px;
    line-height: 150%;
  }

  &__sketches-btn {
    margin-right: 10px;
  }

  &__edit-btn {
  }

  &__info {
  }
}

.info {
  div {
    margin-bottom: 10px;
  }

  &__subtitle {
    display: inline-block;
    font-weight: 700;
    width: 200px;
  }

  &__avatar {
  }

  &__firstName {
  }

  &__lastName {
  }

  &__username {
  }

  &__email {
  }

  &__bio {
  }
}
</style>