<template>
  <v-form ref="loginForm" class="auth" @submit.prevent="loginRequest">
        <v-text-field
            v-model="login"
            class="auth__input"
            label="Имя пользователя"
            :rules="rules"
            hide-details="auto"
        ></v-text-field>
        <v-text-field
            class="auth__input"
            label="Пароль"
            :rules="rules"
            hide-details="auto"
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!show ? 'text' : 'password'"
            @click:append="show = !show"
        ></v-text-field>
        <AuthorizationTools />
    </v-form>
</template>

<script lang="ts">
import { mapActions, mapMutations } from 'vuex';
import AuthorizationTools from './AuthorizationTools.vue';
//@ts-ignore
import { isAuthorized } from '@/global/utils';

export default {
    name: 'AuthorizationForm',
    components: { AuthorizationTools },
    data() {
        return {
            password: '',
            login: '',
            show: true,
            rules: [
                (value: string) => !!value || 'Поле обязательное',
                (value: string) => (value && value.length >= 4) || 'Минимум 4 символа',
            ]
        }
    },
    methods: {
        ...mapActions('authorization', {
            loginAction: 'login'
        }),
        ...mapMutations('checkingAuthorization', {
            setIsAuthorized: 'SET_IS_AUTHORIZED'
        }),
        async loginRequest() {
            //@ts-ignore
            const { valid } = await this.$refs.loginForm.validate();

            if (valid) {
                await this.loginAction({login: this.login, password: this.password});
                this.setIsAuthorized(true);
                this.$router.push('/sketches');
            }
        }
    },
    beforeCreate() {        
        if (isAuthorized()) {
            this.$router.push('/sketches');
        }
    }
}
</script>

<style lang="scss" scoped>
.auth {
    max-width: 700px;
    padding: 20px;
    margin: 10px auto;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    &__input {
        margin-bottom: 20px;
    }
}
</style>