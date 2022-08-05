<template>
  <section></section>
</template>
<script>
import { mapGetters } from "vuex";
import Carousel from "@/components/detail-product/Carousel";
import Multimedia from "@/components/detail-product/Multimedia";
import ShareButtons from "@/components/detail-product/ShareButtons";

export default {
  components: {
    Carousel,
    Multimedia,
    ShareButtons
  },

  async fetch({ store, params, req, redirect }) {
    const host = req.headers.host;

    const baseUrl =
      host == "app-qa.peiky.com" ? process.env.QA_API : process.env.PROD_API;

    let params_register = { product_id: params.id, baseUrl };

    switch (params.slug) {
      case "m":
        await store.dispatch("product/getMessage", params_register);
        break;
      case "f":
        await store.dispatch("product/getFile", params_register);
        break;
      default:
        await store.dispatch("product/getProduct", params_register);
        break;
    }
  },

  data() {
    return {
      currentURL: "",
      ogImage: "",
      baseUrl: ""
    };
  },

  methods: {
    getCurrentUrl() {
      this.currentURL = window.location.href;
    },

    setMultimediaProduct() {
      if (this.product.data.multimedia_set.length > 0) {
        if (
          this.product.data.multimedia_set[0].uri != "" &&
          this.product.data.multimedia_set[0].uri != undefined
        ) {
          return this.product.data.multimedia_set[0].uri;
        } else {
          return "/logo.png";
        }
      } else {
        return "/logo.png";
      }
    },

    getOgImage() {
      switch (this.$route.params.slug) {
        case "m" || "f":
          const obj = this.product.data.multimedia.find(
            image => image.type === 0
          );

          if (obj != undefined) {
            return obj.uri;
          }
          break;

        default:
          return this.setMultimediaProduct();
          break;
      }
    },

    convertPrice(currency) {
      let priceFormatter;

      switch (currency) {
        case "USD":
          priceFormatter =
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(this.product.data.price) + " USD";
          break;
        case "COP":
          priceFormatter =
            new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP"
            }).format(this.product.data.price) + " COP";
          break;
        case "MXM":
          priceFormatter =
            Intl.NumberFormat("es-MX", {
              style: "currency",
              currency: "MXN"
            }).format(this.product.data.price) + " MXM";
          break;

        case "EUR":
          priceFormatter = new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR"
          }).format(this.product.data.price);
          break;

        case "PEN":
          priceFormatter = new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN"
          }).format(this.product.data.price);
          break;

        case "BRL":
          priceFormatter = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(this.product.data.price);
          break;
      }

      return priceFormatter;
    }
  },

  mounted() {
    switch (this.$route.params.slug) {
      case "m":
        this.getCurrentUrl();
        this.getOgImage();
        break;
      case "f":
        this.getCurrentUrl();
        this.getOgImage();
        break;
      default:
        if (process.client) {
          window.location.replace(
            `https://vendoporchat.com/${this.$route.params.slug}/product/${this.$route.params.id}`
          );
        }
        break;
    }
  },

  computed: {
    ...mapGetters({
      product: "product/product"
    }),

    convertToMoney() {
      if (this.product.data.price > 0) {
        return this.convertPrice(this.product.data.currency);
      } else {
        return null;
      }
    }
  },

  head() {
    return {
      title: this.product.data.name,
      meta: [
        // og metas
        {
          hid: "og:title",
          property: "og:title",
          content: this.product.data.name
        },

        {
          hid: "og:type",
          property: "og:type",
          content: "website"
        },
        {
          hid: "og:image:width",
          property: "og:image:width",
          content: "200"
        },
        {
          hid: "og:image:height",
          property: "og:image:height",
          content: "200"
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          itemprop: "image",
          content: this.product.data.image_prev
        },
        {
          hid: "og:image",
          property: "og:image",
          itemprop: "image",
          content: this.product.data.image_prev
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            this.product.data.description != "" &&
            this.product.data.description != undefined &&
            this.product.data.description != null
              ? this.product.data.description
              : this.product.data.reference_code
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://www.vendoporchat.com"
        }
        // {
        //   hid: "og:site_name",
        //   property: "og:site_name",
        //   content: this.product.data.company.name
        // }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.btn-whatsapp {
  background-color: #00bb2d !important;
}

.description {
  display: block;
}
@media only screen and (min-width: 960px) {
  .btn-whatsapp {
    display: none;
  }
}
</style>
