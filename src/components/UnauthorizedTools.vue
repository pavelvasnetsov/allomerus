<template>
    <div>
        <v-btn
            @click="$router.push('/authorization')"
        >Авторизация</v-btn>
        <v-btn
            @click="$router.push('/registration')"
        >Регистрация</v-btn>
    </div>
</template>

<script lang="ts">
export default {
    name: 'UnauthorizedTools',

}
</script>

<style lang="scss">

</style>