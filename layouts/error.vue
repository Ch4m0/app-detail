<template>
  <v-app>
    <h1>Regístro no encontrado</h1>
    <a href="#" @click="back()">Regresar a la página Anterior</a>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
  data() {
    return {
      pageNotFound: "404 Página no encontrada",
      otherError: "An error occurred"
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
