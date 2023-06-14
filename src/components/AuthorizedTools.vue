<template>
  <div class="authorized-tools">
    <v-btn
        class="authorized-tools__logout"
        color="red"
        @click="logout"
    >
      Выйти
    </v-btn>
    <div>
      <v-btn
          class="authorized-tools__sketches"
          @click="$router.push('/add-sketch')"
          v-if="isAuthor"
      >
        Добавить работу
      </v-btn>
      <v-btn
          class="authorized-tools__sketches"
          @click="$router.push('/sketches')"
      >
        Работы
      </v-btn>
      <v-btn
          class="authorized-tools__me"
          @click="$router.push('/me')"
      >
        Мой аккаунт
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import {mapGetters, mapMutations} from 'vuex'
import {Roles} from "@/global/types";

export default {
  name: 'AuthorizedTools',
  computed: {
    ...mapGetters('me', {
      roles: 'roles'
    }),
    isAuthor() {
      return this.roles.includes(Roles.author);
    }
  },
  methods: {
    ...mapMutations('checkingAuthorization', {
      setIsAuthorized: 'SET_IS_AUTHORIZED'
    }),
    logout() {
      this.setIsAuthorized(false);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }
}
</script>

<style lang="scss">
.authorized-tools {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__logout {
  }

  &__me {
  }
}
</style>