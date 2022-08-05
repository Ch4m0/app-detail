<template>
  <div></div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  async fetch({ store, params, req }) {
    const host = req.headers.host;
    const baseUrl =
      host == "app-qa.peiky.com" ? process.env.QA_API : process.env.PROD_API;

    let _params = { brand: params.slug, baseUrl };

    await store.dispatch("product/getBrand", _params);
  },

  computed: {
    ...mapGetters({
      brand: "product/brand"
    })
  },

  methods: {
    getOgImage() {
      if (
        this.brand.data.brand.logo != "" &&
        this.brand.data.brand.logo != undefined
      ) {
        return this.brand.data.brand.logo;
      } else {
        return "/favicon.ico";
      }
    }
  },

  head() {
    return {
      title: this.brand.data.brand.name,
      meta: [
        // og metas
        {
          hid: "og:title",
          property: "og:title",
          content: this.brand.data.brand.name
        },

        {
          hid: "og:type",
          property: "og:type",
          content: "website"
        },

        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          itemprop: "image",
          content: this.getOgImage()
        },
        {
          hid: "og:image",
          property: "og:image",
          itemprop: "image",
          content: this.getOgImage()
        },
        {
          hid: "og:image:width",
          property: "og:image:width",
          content: "250"
        },
        {
          hid: "og:image:height",
          property: "og:image:height",
          content: "250"
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            this.brand.data.brand.description != "" &&
            this.brand.data.brand.description != undefined
              ? this.brand.data.brand.description
              : "La plataforma de e-commerce donde puedes vender y comprar todo lo que necesites"
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://www.vendoporchat.com"
        }
      ]
    };
  },

  mounted() {
    if (process.client) {
      window.location.replace(
        `https://qa-community.peiky.com/${this.$route.params.slug}`
      );
    }
  }
};
</script>