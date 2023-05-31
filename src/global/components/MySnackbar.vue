<template>
  <v-snackbar
      :modelValue="show"
      @update:modelValue="setShow($event)"
      multi-line
  >
    {{ message }}
    <template v-slot:actions>
      <v-btn
          color="red"
          variant="text"
          @click="setShow(false)"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'MySnackbar',
  computed: {
    ...mapGetters('snackbar', {
      message: 'message',
      show: 'show'
    })
  },
  methods: {
    ...mapMutations('snackbar', {
      setShow: 'SET_SHOW'
    })
  }
}
</script>

<style>

</style>