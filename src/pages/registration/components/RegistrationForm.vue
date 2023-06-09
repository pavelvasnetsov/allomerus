<template>
  <v-form
      ref="registrationForm"
      class="registration"
      @submit.prevent="registrationRequest"
  >
    <v-text-field
        v-model="firstName"
        class="registration__input"
        label="Имя"
        :rules="rules"
        hide-details="auto"
        variant="outlined"
    ></v-text-field>
    <v-text-field
        v-model="lastName"
        class="registration__input"
        label="Фамилия"
        :rules="rules"
        hide-details="auto"
        variant="outlined"
    ></v-text-field>
    <v-text-field
        v-model="username"
        class="registration__input"
        label="Имя пользователя"
        :rules="rules"
        hide-details="auto"
        variant="outlined"
    ></v-text-field>
    <v-text-field
        v-model="email"
        class="registration__input"
        label="Электронная почта"
        type="email"
        placeholder="example@example.com"
        :rules="emailRules"
        hide-details="auto"
        variant="outlined"
    ></v-text-field>
    <v-textarea
        v-model="bio"
        class="registration__input"
        label="Коротко о себе"
        :rules="rules"
        hide-details="auto"
        variant="outlined"
    >
    </v-textarea>
    <v-select
        v-model="role"
        item-title="title"
        item-value="value"
        label="Роль"
        :items="roles"
        variant="outlined"
    ></v-select>
    <v-text-field
        class="registration__input"
        label="Пароль"
        :rules="rules"
        hide-details="auto"
        v-model="password"
        :append-icon="!show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
        variant="outlined"
    ></v-text-field>
    <v-text-field
        class="registration__input"
        label="Повторить пароль"
        :rules="repeatPasswordRules"
        hide-details="auto"
        v-model="repeatPassword"
        :append-icon="!show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        @click:append="show2 = !show2"
        variant="outlined"
    ></v-text-field>
    <RegistrationTools/>
  </v-form>
</template>

<script lang="ts">
import {mapActions, mapMutations} from 'vuex';
import RegistrationTools from './RegistrationTools.vue';
//@ts-ignore
import {isAuthorized} from '@/global/utils';
import {Roles} from "@/global/types";

export default {
  name: 'RegistrationForm',
  components: {RegistrationTools},
  data() {
    return {
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      username: '',
      email: '',
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
      show1: false,
      show2: false,
      rules: [
        (value: string) => !!value || 'Поле обязательное',
        (value: string) => (value && value.length >= 4) || 'Минимум 4 символа',
      ],
      repeatPasswordRules: [
        (value: string | any) => this.password === value || 'Пароли должны совпадать'
      ],
      emailRules: [
        (value: string) => !!value || 'Поле обязательное',
        (value: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Некорректный адрес электронной почты'
      ]
    }
  },

  methods: {
    ...mapActions('registration', {
      registrationAction: 'registration'
    }),
    ...mapActions('me', {
      getMeInfo: 'getMeInfo'
    }),
    ...mapMutations('loader', {
      setLoader: 'SET_SHOW'
    }),
    async registrationRequest() {
      //@ts-ignore
      const {valid} = await this.$refs.registrationForm.validate();

      if (valid) {
        this.setLoader(true);

        await this.registrationAction({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          bio: this.bio,
          password: this.password,
          role: this.role
        });

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

<style lang="scss">
.registration {
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