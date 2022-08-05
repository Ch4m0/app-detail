<template>
  <v-row class="py-6 justify-center">
    <h3 class="my-6">Comparte este producto</h3>
    <v-btn
      icon
      class="mx-4"
      :href="'https://www.facebook.com/sharer/sharer.php?u=' + currentURL"
      target="_blank"
    >
      <font-awesome-icon
        :icon="['fab', 'facebook-f']"
        :mask="['fas', 'circle']"
        transform="shrink-6"
        style="font-size: 30px"
        color="black"
      />
    </v-btn>

    <v-btn
      icon
      class="mx-4"
      :href="
        'https://co.pinterest.com/pin/create/button/?media=' +
          urlPImage +
          '&description=' +
          product.data.description +
          '%20' +
          currentURL
      "
      target="_blank"
    >
      <font-awesome-icon
        :icon="['fab', 'pinterest']"
        :mask="['fas', 'circle']"
        transform="shrink-6"
        style="font-size: 30px"
        color="black"
      />
    </v-btn>

    <v-btn icon class="mx-4" :href="'https://twitter.com/?status=' + currentURL" target="_blank">
      <font-awesome-icon
        :icon="['fab', 'twitter']"
        :mask="['fas', 'circle']"
        transform="shrink-6"
        style="font-size: 30px"
        color="black"
      />
    </v-btn>

    <v-btn
      icon
      class="mx-4"
      :href="
        'https://wa.me/?text=' +
          'Estoy interesado en el' +
          '%20' +
          product.data.type +
          '%20' +
          product.data.name +
          '%20' +
          currentURL
      "
      target="_blank"
    >
      <font-awesome-icon
        :icon="['fab', 'whatsapp']"
        :mask="['fas', 'circle']"
        transform="shrink-6"
        style="font-size: 30px"
        color="black"
      />
    </v-btn>

    <v-btn icon class="mx-4" :href="'https://t.me/share/url?url=' + currentURL" target="_blank">
      <font-awesome-icon
        :icon="['fab', 'telegram']"
        :mask="['fas', 'circle']"
        transform="shrink-6"
        style="font-size: 30px"
        color="black"
      />
    </v-btn>

    <v-btn
      icon
      class="mx-4"
      :href="
        'mailto:?Subject=' +
          product.data.name +
          '&amp;Body=' +
          product.data.description +
          '%20' +
          currentURL
      "
      target="_blank"
    >
      <font-awesome-icon
        :icon="['fas', 'envelope']"
        :mask="['fas', 'circle']"
        transform="shrink-6"
        style="font-size: 30px"
        color="black"
      />
    </v-btn>
  </v-row>
</template>
<script>
export default {
  name: "ShareButtons",
  props: ["product"],
  data() {
    return {
      currentURL: "",
      urlPImage: ""
    };
  },
  methods: {
    getCurrentUrl() {
      this.currentURL = window.location.href;
    },
    getPinterestImage() {
      const obj = this.product.data.multimedia.find(image => image.type === 0);
      if (obj != undefined) {
        this.urlPImage = obj.uri;
      }
    }
  },
  mounted() {
    this.getCurrentUrl();
    this.getPinterestImage();
  }
};
</script>
<style lang="scss" scoped>
h3 {
  width: 100%;
  text-align: center;
}
</style>
