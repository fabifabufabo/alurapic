<template>
  <div>
    <h1 class="centralized">Cadastro</h1>
    <h2 class="centralized">{{ picture.titulo }}</h2>

    <h2 v-if="picture._id" class="centralized">Alterando</h2>
    <h2 v-else class="centralized">Inlcuindo</h2>

    <form @submit.prevent="record()">
      <div class="control">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off" v-model="picture.titulo" />
      </div>

      <div class="control">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="picture.url" />
        <responsive-image
          v-show="picture.url"
          :url="picture.url"
          :titulo="picture.titulo"
        />
      </div>

      <div class="control">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="picture.descricao">
        </textarea>
      </div>

      <div class="centralized">
        <my-button buttonlabel="GRAVAR" buttontype="submit" />
        <router-link :to="{ name: 'home' }">
          <my-button buttonlabel="VOLTAR" buttontype="button" />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ResponsiveImage from '../shared/responsive-image/ResponsiveImage.vue';
import Button from '../shared/button/Button.vue';
import Picture from '../../domain/picture/Picture';
import PictureService from '../../domain/picture/PictureService';

export default {
  components: {
    'responsive-image': ResponsiveImage,
    'my-button': Button,
  },
  data() {
    return {
      picture: new Picture(),
      id: this.$route.params.id,
    };
  },
  methods: {
    record() {
      this.service.register(this.picture).then(
        () => {
          if (this.id) this.$router.push({ name: 'home' });
          this.picture = new Picture();
        },
        (err) => console.log(err)
      );
    },
  },
  created() {
    this.service = new PictureService(this.$resource);
    if (this.id) {
      this.service.search(this.id).then((picture) => (this.picture = picture));
    }
  },
};
</script>
<style scoped>
.centralized {
  text-align: center;
}
.control {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.control label {
  display: block;
  font-weight: bold;
}

.control label + input,
.control textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralized {
  text-align: center;
}
</style>
