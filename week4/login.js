import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";

const site = "https://vue3-course-api.hexschool.io/v2";

createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`${site}/admin/signin`, this.user)
        .then((res) => {
          // 儲存token到cookie
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          // 導頁到產品頁
          window.location = "products.html";
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
}).mount("#app");
