<template>
  <div class="container me">
    <div class="me__header">
      <div class="me__title">Личный кабинет</div>
      <v-btn class="me__edit-btn">редактировать</v-btn>
    </div>
    <div class="me__info info">
      <div class="info__avatar">
        {{ me.avatar }}
      </div>
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
    </div>
  </div>
</template>

<script lang="ts">

import {mapActions, mapGetters} from "vuex";

export default {
  name: 'MeView',
  async mounted() {
    this.getMeInfo();
  },
  computed: {
    ...mapGetters('me', {
      me: 'meInfo'
    })
  },
  methods: {
    ...mapActions('me', {
      getMeInfo: 'getMeInfo'
    })
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