<template>
  <v-form ref="loginForm" class="auth" @submit.prevent="loginRequest">
    <v-text-field
        v-model="login"
        class="auth__input"
        label="Электронная почта"
        :rules="emailRules"
        hide-details="auto"
        variant="outlined"
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
        variant="outlined"
    ></v-text-field>
    <AuthorizationTools/>
  </v-form>
</template>

<script lang="ts">
import {mapActions, mapMutations} from 'vuex';
import AuthorizationTools from './AuthorizationTools.vue';
//@ts-ignore
import {isAuthorized} from '@/global/utils';
import MySnackbar from "@/global/components/MySnackbar.vue";

export default {
  name: 'AuthorizationForm',
  components: {MySnackbar, AuthorizationTools},
  data() {
    return {
      password: '',
      login: '',
      show: true,
      rules: [
        (value: string) => !!value || 'Поле обязательное',
        (value: string) => (value && value.length >= 4) || 'Минимум 4 символа',
      ],
      emailRules: [
        (value: string) => !!value || 'Поле обязательное',
        (value: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Некорректный адрес электронной почты'
      ]
    }
  },
  methods: {
    ...mapActions('authorization', {
      loginAction: 'login'
    }),
    ...mapActions('me', {
      getMeInfo: 'getMeInfo'
    }),
    ...mapMutations('checkingAuthorization', {
      setIsAuthorized: 'SET_IS_AUTHORIZED'
    }),
    ...mapMutations('loader', {
      setLoader: 'SET_SHOW'
    }),
    async loginRequest() {
      //@ts-ignore
      const {valid} = await this.$refs.loginForm.validate();

      if (valid) {
        this.setLoader(true);
        await this.loginAction({login: this.login, password: this.password});
        await this.getMeInfo();
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