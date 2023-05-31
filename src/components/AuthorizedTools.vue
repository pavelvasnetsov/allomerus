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
          @click="$router.push('/sketches')"
      >
        Скетчи
      </v-btn>
      <v-btn
          class="authorized-tools__me"
          @click="$router.push('/me')"
      >
        Личный кабинет
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import {mapMutations} from 'vuex'

export default {
  name: 'AuthorizedTools',
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