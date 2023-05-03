<template>
  <v-snackbar
        v-model="snackbar"
        multi-line
    >
        {{ errMsg }}
        <template v-slot:actions>
            <v-btn
                color="red"
                variant="text"
                @click="snackbar = false"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts">
export default {

}
</script>

<style>

</style>