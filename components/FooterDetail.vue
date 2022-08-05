<template>
  <v-footer padless>
    <v-card class="flex" flat tile>
      <div class="text-center secondary top-radius">
        <v-card-title class="d-block title font-weight-bold">
          {{
          product.data.store.name
          }}
        </v-card-title>

        <v-card-subtitle class="body-1 black--text" v-if="product.data.store.phone_number != 0">
          Número de contácto
          {{ product.data.store.phone_number }}
        </v-card-subtitle>
        <v-card-actions class="d-block">
          <!-- <p class="body-2">Conoce mi tienda</p> -->
          <v-btn
            v-if="product.data.store.link_facebook != null"
            icon
            :href="base_path + product.data.store.link_facebook"
            target="_blank"
          >
            <font-awesome-icon
              :icon="['fab', 'facebook-f']"
              :mask="['fas', 'circle']"
              transform="shrink-6"
              style="font-size: 26px"
              color="black"
            />
          </v-btn>
          <v-btn
            v-if="product.data.store.link_instagram != null"
            icon
            :href="base_path + product.data.store.link_instagram"
            target="_blank"
          >
            <font-awesome-icon
              :icon="['fab', 'instagram']"
              :mask="['fas', 'circle']"
              transform="shrink-6"
              style="font-size: 26px"
              color="black"
            />
          </v-btn>
          <v-btn
            v-if="product.data.store.link_pinterest != null"
            icon
            :href="base_path + product.data.store.link_pinterest"
            target="_blank"
          >
            <font-awesome-icon
              :icon="['fab', 'pinterest']"
              :mask="['fas', 'circle']"
              transform="shrink-6"
              style="font-size: 26px"
              color="black"
            />
          </v-btn>
          <v-btn
            v-if="product.data.store.link_youtube != null"
            icon
            :href="base_path + product.data.store.link_youtube"
            target="_blank"
          >
            <font-awesome-icon
              :icon="['fab', 'youtube']"
              :mask="['fas', 'circle']"
              transform="shrink-6"
              style="font-size: 26px"
              color="black"
            />
          </v-btn>
        </v-card-actions>
      </div>

      <v-row class="ma-0 footer">
        <v-col
          cols="12"
          sm="12"
          lg="6"
          md="6"
          class="primary text-md-left text-lg-left px-4 py-1 f_col f_col1 text-sm-center"
          style="padding-top: 20px !important;
    padding-bottom: 20px !important;"
        >
          <img src="~assets/Logo.svg" width="110" />
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="6"
          class="primary text-md-rigth text-lg-right px-4 py-1 f_col white_bg text-sm-center"
          style="padding-top: 20px !important;
          padding-bottom: 10px !important;"
        >
          <span class="white--text">@Copyright {{ new Date().getFullYear() }} Vendo por Chat.</span>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      base_path: "https://"
    };
  },
  computed: {
    ...mapGetters({
      product: "product/product"
    })
  }
};
</script>
<style lang="scss" scoped>
@media (min-width: 320px) and (max-width: 767px) {
  .text-sm-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  //CSS
}
</style>