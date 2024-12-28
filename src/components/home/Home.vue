<template>
  <div>
    <h1 class="centralized-text">{{ title }}</h1>
    <p v-show="message" class="centralized-text">{{ message }}</p>
    <input
      type="search"
      class="filter"
      @input="filter = $event.target.value"
      placeholder="Filtre por parte do título"
    />
    <ul class="pictures-list">
      <li class="pictures-list-item" v-for="picture of filteredPictures">
        <my-panel :title="picture.titulo">
          <responsive-image
            v-my-transform:scale.animate="1.2"
            :url="picture.url"
            :titulo="picture.titulo"
          />
          <router-link :to="{ name: 'altera', params: { id: picture._id } }">
            <my-button buttontype="button" buttonlabel="ALTERAR" />
          </router-link>
          <my-button
            buttontype="button"
            buttonlabel="REMOVER"
            @buttonActivated="remove(picture)"
            :confirmation="true"
            buttonstyle="warning"
          />
        </my-panel>
      </li>
    </ul>
  </div>
</template>

<script>
import Panel from '../shared/panel/Panel.vue';
import ResponsiveImage from '../shared/responsive-image/ResponsiveImage.vue';
import Button from '../shared/button/Button.vue';
import PictureService from '../../domain/picture/PictureService';

export default {
  components: {
    'my-panel': Panel,
    'responsive-image': ResponsiveImage,
    'my-button': Button,
  },
  data() {
    return {
      title: 'Alurapic',
      pictures: [],
      filter: '',
      message: '',
    };
  },
  computed: {
    filteredPictures() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), 'i');
        return this.pictures.filter((picture) => exp.test(picture.titulo));
      }
      return this.pictures;
    },
  },

  methods: {
    remove(picture) {
      this.service.remove(picture._id).then(
        () => {
          let index = this.pictures.indexOf(picture);
          this.pictures.splice(index, 1);
          this.message = 'Foto removida com sucesso';
        },
        (err) => {
          this.message = err.message;
        }
      );
    },
  },

  created() {
    this.service = new PictureService(this.$resource);

    this.service.list().then(
      (pictures) => (this.pictures = pictures),
      (err) => (this.message = err.message)
    );
  },
};
</script>

<style>
.centralized-text {
  text-align: center;
}

.pictures-list {
  list-style: none;
}

.pictures-list .pictures-list-item {
  display: inline-block;
}

.filter {
  display: block;
  width: 100%;
}
</style>
