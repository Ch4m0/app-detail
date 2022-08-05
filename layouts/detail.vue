<template>
  <v-app>
    <NavBar v-if="product.code == 0" />
    <v-content>
      <v-container class="main_container">
        <nuxt />
      </v-container>
    </v-content>
    <FooterDetail v-if="product.code == 0" />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar";
import FooterDetail from "@/components/FooterDetail";

export default {
  components: {
    NavBar,
    FooterDetail
  },

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
header {
  box-sizing: content-box;
}
.v-toolbar {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.02), 0px 1px 10px 0px rgba(0, 0, 0, 0.02);
}
.head-avatar,
.head-title {
  align-self: center !important;
}
.top-radius {
  border-radius: 30px 30px 0 0 !important;
}

.footer {
  height: 50px;

  .f_col {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media only screen and (max-width: 768px) {
      justify-content: center;
    }
  }

  .f_col1 {
    justify-content: flex-start;
    @media only screen and (max-width: 768px) {
      justify-content: center;
    }
  }
}

@media only screen and (max-width: 960px) {
  .f_col {
    text-align: center;
  }
  .v-application .white_bg {
    color: white;
    border-color: white !important;
  }
}
@media (min-width: 1904px) {
  .main_container {
    max-width: 1185px;
  }
}
</style>
