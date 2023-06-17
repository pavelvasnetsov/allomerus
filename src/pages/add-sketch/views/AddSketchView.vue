<template>
  <div
      class="container add-sketch"
  >
    <div
        class="add-sketch__title"
    >
      Добавление новой работы
    </div>
    <SketchPreviewCarousel
        class="add-sketch__carousel"
        :urls="urls"
    />
    <SketchFiles
        class="add-sketch__files"
        v-model="files"
    />
    <v-form
        ref="infoForm"
    >
      <SketchInfo
          class="add-sketch__info"
          v-model:name.trim="name"
          v-model:description="description"
      />
    </v-form>
    <div
        class="add-sketch__tag"
    >
      <TagAutocomplete
          class="add-sketch__autocomplete"
          v-model="tags"
      />
      <TagNew
          class="add-sketch__new"
      />
    </div>
    <v-btn
        color="blue"
        @click="createSketch"
        :loading="isCreateLoading"
        :disabled="isCreateLoading"
    >
      Добавить работу
      <template v-slot:loader>
        <v-progress-circular indeterminate></v-progress-circular>
      </template>
    </v-btn>
  </div>
</template>

<script lang="ts">
import SketchFiles from '../components/Sketch/SketchFiles.vue';
import SketchInfo from "@/pages/add-sketch/components/Sketch/SketchInfo.vue";
import TagAutocomplete from "@/pages/add-sketch/components/Tag/TagAutocomplete.vue";
import TagNew from "@/pages/add-sketch/components/Tag/TagNew.vue";
import {mapActions, mapMutations} from "vuex";
import SketchPreviewCarousel from "@/pages/add-sketch/components/Sketch/SketchPreviewCarousel.vue";

export default {
  name: "AddSketchView",
  components: {
    SketchPreviewCarousel,
    TagNew,
    TagAutocomplete,
    SketchInfo,
    SketchFiles
  },
  data() {
    return {
      files: [],
      name: '',
      description: '',
      tags: [],
      isCreateLoading: false,
      urls: []
    };
  },
  watch: {
    files(newValue)  {
      if (newValue || newValue.length) {
        try {
          this.urls = [];

          newValue.forEach(file => {
            let reader = new FileReader();

            reader.onload = (e) => {
              //@ts-ignore
              this.urls.push(e.target.result);
            }

            reader.readAsDataURL(file);
          })
        } catch (e) {
          this.urls = [];
        }
      } else {
        this.urls = [];
      }
    }
  },
  methods: {
    ...mapActions('addSketch', {
      createSketchAction: 'createSketch'
    }),
    ...mapMutations('snackbar', {
      setShow: 'SET_SHOW',
      setMessage: 'SET_MESSAGE'
    }),
    async createSketch() {
      try {
        const {valid} = await this.$refs.infoForm.validate();

        if (valid) {
          this.isCreateLoading = true;

          await this.createSketchAction({
            files: this.files,
            name: this.name,
            description: this.description,
            tags: this.tags
          });

          this.files = [];
          this.name = '';
          this.description = '';
          this.tags = [];

          await this.$refs.infoForm.reset();

          this.setMessage('Работа успешно добавлена');
          this.setShow({
            show: true,
            color: 'green'
          });
        }
      } catch (e) {

      } finally {
        this.isCreateLoading = false;
      }

    }
  }
};
</script>

<style scoped lang="scss">
.add-sketch {
  display: block;
  padding: 30px 10px;

  &__title {
    font-size: 30px;
    margin-bottom: 20px;
  }

  &__carousel {
    height: 500px;
    margin-bottom: 30px;
  }

  &__files {
  }

  &__info {
  }

  &__tag {
    display: flex;
  }

  &__autocomplete {
    margin-right: 20px;
    flex-grow: 1;
  }

  &__new {
    margin-top: 8px;
  }
}
</style>