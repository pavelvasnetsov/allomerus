<template>
  <div>
    <MeView
        v-if="!editMode"
        @change:edit-mode="editMode = $event"
    />
    <EditMeView
        v-else
        @change:edit-mode="editMode = $event"
    />
  </div>
</template>

<script lang="ts">
import MeView from '@/pages/me/views/MeView.vue';
import {isAuthorized} from "@/global/utils";
import {mapActions} from "vuex";
import EditMeView from "@/pages/me/views/EditMeView.vue";

export default {
  name: 'MeWrapper',
  components: {
    EditMeView,
    MeView
  },
  data() {
    return {
      editMode:false
    }
  },
  beforeCreate() {
    if (!isAuthorized()) {
      this.$router.push('/authorization');
    }
  },
  async mounted() {
    await this.getMeInfo();
  },
  methods: {
    ...mapActions('me', {
      getMeInfo: 'getMeInfo'
    })
  }
};
</script>

<style lang="scss" scoped>

</style>