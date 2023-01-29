import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";

const site = "https://vue3-course-api.hexschool.io/v2";
const api_path = "yjchen-vue";

let productModal = {};
let delProductModal = {};

// 1. 確認登入
// 2. 取得產品列表
// 3. 取得產品細節

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
        console.log(res);
        this.products = res.data.products;
      });
    },
    updateProduct() {
      let url = `${site}/api/${api_path}/admin/product`;
      let method = 'post';
      if (!this.isNew) {
        url = `${site}/api/${api_path}/admin/product/${this.tempProduct.id}`;
        method = "put";
      }
      console.log(url);
      axios[method](url, { data: this.tempProduct })
      .then((res) => {
        console.log(res);
        this.getProducts();
        productModal.hide();
      });
    },
    deleteProduct(){
      axios.delete(`${site}/api/${api_path}/admin/product/${this.tempProduct.id}`)
      .then(()=>{
        this.getProducts();
        delProductModal.hide();
      })
      .catch(err=>{
        alert(err.data.message);
      })
    },
    openModal(status, product) {
      console.log(status);
      if (status === "create") {
        productModal.show();
        this.isNew = true;
        tempProduct: {
          imagesUrl: [];
        }
      } else if (status === "edit") {
        productModal.show();
        this.isNew = false;
        this.tempProduct = { ...product };
      } else if (status === "delete"){
        delProductModal.show();
        this.tempProduct = { ...product };
      }
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
