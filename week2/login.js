import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";


createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`${this.apiUrl}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          // token 寫入 cookie
          document.cookie = `hexToken=${token}; expires=${expired};`;
          window.location = "products.html";
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },
  },
}).mount("#app");