import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";

const site = "https://vue3-course-api.hexschool.io/v2";
const api_path = "yjchen-vue";

// 1. 確認登入
// 2. 取得產品列表
// 3. 取得產品細節

createApp({
data() {
  return {
    products:[],
  }
},
methods: {
  checkLogin(){
    axios.post(`${site}/api/user/check`)
    .then(res=>{
      //登入成功 取得產品列表
      this.getProducts();
    })
    .catch(err=>{
      alert(err.data.message);
    })
  },
  getProducts(){
    axios.get(`${site}/api/${api_path}/admin/products/all`)
    .then(res=>{
      console.log(res);
      this.products = res.data.products;
    })
  }
},
mounted() {
  //取出token
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];
  console.log(cookieValue);
  //axios headers
  axios.defaults.headers.common["Authorization"] = cookieValue;
  this.checkLogin();
},
}).mount('#app');