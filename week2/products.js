import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "yjchen-vue",
      products: [],
      tmpProduct: {},
    };
  },
  methods: {
    checkAdmin(){
      axios.post(`${this.apiUrl}/api/user/check`)
        .then((res)=>{
          this.getProducts();
        })
        .catch((err)=>{
          alert(err.data.message);
          window.location = 'login.html';
        })
    },
    getProducts(){
        axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
          .then((res)=>{
              this.products = res.data.products;
          })
          .catch((err)=>{
            alert(err.data.message);
          })
    },
    getDetail(product){
      this.tmpProduct = product;
    },
  },
  mounted() {
    //從cookie取token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    // 每次都會預設帶入Authorization header
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },

}).mount('#app');