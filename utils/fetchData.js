import axios from "axios";

var os = require("os");
var hostname = os.hostname();

console.log(hostname, "HOSTNAME");

// import { isQa } from "../config_base_url";

// const baseUrl =
// hostname == "app-qa.peiky.com" ? process.env.QA_API : process.env.PROD_API;

export default new (class fetchData {
  getShowProduct({ product_id, baseUrl }) {
    return axios({
      url: `${baseUrl}:8002/api/v1/community/general/product/detail`,
      params: {
        product_id
      },
      method: "GET"
    })
      .then(resp => {
        return resp.data;
      })
      .catch(err => {
        return err;
      });
  }

  getShowFile({ id, baseUrl }) {
    return axios({
      url: `${baseUrl}:91/api/v1/web_detail/${id}`,
      method: "GET"
    })
      .then(resp => {
        return resp.data;
      })
      .catch(err => {
        return err;
      });
  }

  getShowMessage({ id, baseUrl }) {
    return axios({
      url: `${baseUrl}:81/api/v1/web_detail/${id}`,
      method: "GET"
    })
      .then(resp => {
        return resp.data;
      })
      .catch(err => {
        return err;
      });
  }

  getBrand({ brand, baseUrl }) {
    return axios({
      url: `${baseUrl}:8002/api/v1/community/brand/${brand}?location=0,0&distance=50&lang=es`,
      method: "GET"
    })
      .then(resp => {
        return resp.data;
      })
      .catch(err => {
        return err;
      });
  }
})();
