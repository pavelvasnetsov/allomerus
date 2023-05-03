<template>
    <div>
        <v-btn
            @click="logout"
        >Выйти</v-btn>
    </div>
</template>

<script lang="ts">
import { mapMutations } from 'vuex'

export default {
    name: 'AuthorizedTools',
    methods: {
        ...mapMutations('checkingAuthorization', {
            setIsAuthorized: 'SET_IS_AUTHORIZED'
        }),
        logout() {
            this.setIsAuthorized(false);
            this.$router.push('/authorization');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    }
}
</script>

<style lang="scss">

</style>