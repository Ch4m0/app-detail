import fetchData from "@/utils/fetchData";

export const state = () => ({
  product: {
    code: 8232,
    name: ""
  },

  brand: {}
});

export const getters = {
  product: state => state.product,
  brand: state => state.brand
};

export const mutations = {
  setProduct: (state, product) => (state.product = product),
  setBrand: (state, brand) => (state.brand = brand)
};

export const actions = {
  async getBrand({ commit }, params) {
    await fetchData.getBrand(params).then(brand => {
      if (brand.code != 0) {
        this.$router.push({ path: "/ufff" });
      } else {
        commit("setBrand", brand);
      }
    });
  },

  setMultimediaProduct() {
    if (this.product.data.multimedia_set.length > 0) {
      if (
        this.product.data.multimedia_set[0].uri != "" &&
        this.product.data.multimedia_set[0].uri != undefined
      ) {
        return this.product.data.multimedia_set[0].uri;
      } else {
        return "/favicon.ico";
      }
    } else {
      return "/favicon.ico";
    }
  },

  async getProduct({ dispatch, commit }, params) {
    await fetchData.getShowProduct(params).then(product => {
      if (product.data.multimedia_set.length > 0) {
        for (let p of product.data.multimedia_set) {
          if (p.type == 0) {
            product.data.image_prev = p.uri;
            break;
          }
        }

        if (
          product.data.image_prev == "" &&
          product.data.image_prev == undefined &&
          product.data.image_prev == null
        ) {
          product.data.image_prev = "/logo.png";
        }
      } else {
        product.data.image_prev = "/logo.png";
      }

      if (product.code != 0) {
        this.$router.push({ path: "/ufff" });
      } else {
        commit("setProduct", product);
      }
    });
  },

  async getFile({ commit }, params) {
    await fetchData.getShowFile(params).then(file => {
      if (file.code != 0) {
        this.$router.push("/ufff");
      } else {
        commit("setProduct", file);
      }
    });
  },

  async getMessage({ commit }, params) {
    await fetchData.getShowMessage(params).then(message => {
      if (message.code != 0) {
        this.$router.push("/ufff");
      } else {
        commit("setProduct", message);
      }
    });
  }
};
