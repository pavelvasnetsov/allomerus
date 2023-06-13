<template>
  <div class="reg-btns">
    <v-btn
        color="blue"
        variant="text"
        @click="$router.push('/authorization')"
    >К авторизации
    </v-btn>
    <v-btn
        type="submit"
        color="blue"
    >Зарегистрироваться
    </v-btn>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss">
.reg-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>