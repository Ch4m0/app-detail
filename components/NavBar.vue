<template>
  <v-app-bar prominent class="px-5" height="100%">
    <v-avatar size="80" class="head-avatar" v-if="product.data.store.logo != null">
      <img :src="product.data.store.logo" alt="logo" />
    </v-avatar>
    <v-avatar size="80" class="head-avatar" v-else>
      <img src="~assets/Tienda.svg" />
    </v-avatar>
    <v-toolbar-title class="ml-5 font-weight-bold head-title">{{ product.data.store.name }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      product: "product/product"
    })
  }
};
</script>

<style>
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
</style>