<template>
    <div class="auth-btns">
        <v-btn
            color="green"
            @click="$router.push('/registration')"
        >К регистрации</v-btn>
        <v-btn
            type="submit"
            color="blue"
        >Войти</v-btn>
    </div>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss" scoped>
.auth-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>