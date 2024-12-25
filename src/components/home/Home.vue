<template>
  <div>
    <h1 class="centralized-text">{{ title }}</h1>
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
          <my-button
            buttontype="button"
            buttonlabel="REMOVER"
            @buttonActivated="remove(picture)"
            :confirmation="false"
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
      alert(`Removi a foto: ${picture.titulo}`);
    },
  },

  created() {
    let promise = this.$http.get('http://localhost:3000/v1/fotos');
    promise
      .then((res) => res.json())
      .then((pictures) => (this.pictures = pictures));
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
