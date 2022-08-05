<template>
  <section>
    <!-- show Images -->

    <!-- <span
      itemprop="image"
      itemscope
      itemtype="image/jpeg"
      v-if="product.data.multimedia.length > 0"
    >
      <link
        itemprop="url"
        v-if="product.data.multimedia[0].type == 0"
        :href="product.data.multimedia[0].uri"
      />
    </span>-->

    <Carousel v-bind:product="product" class="pt-lg-8" />

    <v-content class="px-5 px-lg-14">
      <v-row class="pt-8 pb-4" v-if="convertToMoney != null">
        <h2 class="primary--text font-weight-bold">{{ convertToMoney }}</h2>
      </v-row>
      <v-row class="py-6">
        <h1 class="display-1 font-weight-bold">{{ product.data.name }}</h1>
      </v-row>

      <v-row class="py-6">
        <v-chip class="mr-2" label>{{ product.data.category.name }}</v-chip>
        <v-chip class="mr-2" label v-if="product.data.subcategory != null">
          {{
          product.data.subcategory.name
          }}
        </v-chip>
      </v-row>

      <v-row class="py-6">
        <p class="font-weight-light description">{{ product.data.description }}</p>
      </v-row>

      <Multimedia :product="product" v-if="product.data.multimedia.length > 0" class="my-4" />

      <!-- <ShareButtons :product="product" /> -->

      <v-btn
        class="btn-whatsapp"
        fixed
        dark
        fab
        bottom
        right
        data-action="share/whatsapp/share"
        :href="'https://wa.me/57' + product.data.store.phone_number"
        target="_blank"
        v-if="product.data.store.phone_number"
      >
        <font-awesome-icon :icon="['fab', 'whatsapp']" style="font-size: 32px" />
      </v-btn>
    </v-content>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import Carousel from "@/components/detail-product/Carousel";
import Multimedia from "@/components/detail-product/Multimedia";
import ShareButtons from "@/components/detail-product/ShareButtons";

export default {
  layout: "detail",

  components: {
    Carousel,
    Multimedia,
    ShareButtons
  },

  async fetch({ store, params, req }) {
    const host = req.headers.host;

    const baseUrl =
      host == "app-qa.peiky.com" ? process.env.QA_API : process.env.PROD_API;

    let params_register = { id: params.id, baseUrl };

    switch (params.slug) {
      case "p":
        await store.dispatch("product/getProduct", params_register);
        break;
      case "m":
        await store.dispatch("product/getMessage", params_register);
        break;
      case "f":
        await store.dispatch("product/getFile", params_register);
        break;
    }
  },

  data() {
    return {
      currentURL: "",
      ogImage: ""
    };
  },

  methods: {
    getCurrentUrl() {
      this.currentURL = window.location.href;
    },

    getOgImage() {
      const obj = this.product.data.multimedia.find(image => image.type === 0);

      if (obj != undefined) {
        this.ogImage = obj.uri;
      } else {
        return "/favicon.ico";
      }
      //this.ogImage =
      //   "https://storage.googleapis.com/faces_v1/faces/g5o7tduuur81a.jpg";
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
    },

    makeDescription() {
      if (
        this.product.data.description != "" &&
        this.product.data.description != undefined &&
        this.product.data.description != null
      ) {
        return this.product.data.description;
      } else {
        return "";
      }
    }
  },

  mounted() {
    this.getCurrentUrl();
    this.getOgImage();
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
          content: this.product.data.name + "|" + this.product.data.store.name
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
          content: this.product.thumbnail || this.product.data.store.logo
        },
        {
          hid: "og:image",
          property: "og:image",
          itemprop: "image",
          content: this.product.thumbnail || this.product.data.store.logo
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
          content: this.makeDescription()
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.currentURL
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: this.product.data.store.name
        }
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
