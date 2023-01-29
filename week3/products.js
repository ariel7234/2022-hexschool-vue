import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";

const site = "https://vue3-course-api.hexschool.io/v2";
const api_path = "yjchen-vue";

let productModal = {};
let delProductModal = {};

createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
    };
  },
  methods: {
    checkLogin() {
      axios
        .post(`${site}/api/user/check`)
        .then((res) => {
          //登入成功 取得產品列表
          this.getProducts();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    getProducts() {
      axios.get(`${site}/api/${api_path}/admin/products`).then((res) => {
        this.products = res.data.products;
      });
    },
    openModal(status, product) {
      if (status === "create") {
        this.tempProduct = {
          imagesUrl: [], // FIXME: 若陣列是空 打api好像不會存到，導致新增的產品若只有設主要圖片，會沒有imagesUrl這個陣列，編輯時會無法設定多圖
        };
        this.isNew = true;
        productModal.show();
      } else if (status === "edit") {
        this.isNew = false;
        this.tempProduct = { ...product };
        productModal.show();
      } else if (status === "delete") {
        this.tempProduct = { ...product };
        delProductModal.show();
      }
    },
    updateProduct() {
      let url = `${site}/api/${api_path}/admin/product`;
      let method = "post";
      if (!this.isNew) {
        url = `${site}/api/${api_path}/admin/product/${this.tempProduct.id}`;
        method = "put";
      }
      axios[method](url, { data: this.tempProduct })
      .then(() => {
        this.getProducts();
        productModal.hide();
      })
      .catch(err => {
        alert(err.data.message)
      })
    },
    deleteProduct() {
      axios
        .delete(`${site}/api/${api_path}/admin/product/${this.tempProduct.id}`)
        .then(() => {
          this.getProducts();
          delProductModal.hide();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    //取出token
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    //axios headers
    axios.defaults.headers.common["Authorization"] = cookieValue;
    this.checkLogin();
    // bootstrap
    productModal = new bootstrap.Modal(document.getElementById("productModal"));
    delProductModal = new bootstrap.Modal(document.getElementById("delProductModal"));
  },
}).mount("#app");
