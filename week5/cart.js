import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js";

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "yjchen-vue";

const productModal = {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: {},
      qty: 1,
    };
  },
  template: "#userProductModal",
  methods: {
    closeModal() {
      this.modal.hide();
    },
    openModal() {
      this.modal.show();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
};

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
      cart: {},
      loadingItem: "", // 存正在處理中品項的id，讓使用者不能在請求未處理完就一直發新的request
    };
  },
  methods: {
    getProducts() {
      axios.get(`${apiUrl}/api/${apiPath}/products/all`).then((res) => {
        this.products = res.data.products;
      });
    },
    getProduct(id) {
      axios.get(`${apiUrl}/api/${apiPath}/product/${id}`).then((res) => {
        this.tempProduct = res.data.product;
        this.$refs.productModal.openModal();
      });
    },
    addToCart(id, qty = 1) {
      // 使用預設值
      console.log("add to cart: ", id, qty);
      const data = {
        product_id: id,
        qty,
      };
      console.log("data: ", data);
      this.loadingItem = id;
      axios.post(`${apiUrl}/api/${apiPath}/cart`, { data }).then((res) => {
        console.log(res.data);
        this.$refs.productModal.closeModal();
        this.getCartList(); // 加入購物車後更新購物車列表
        this.loadingItem = "";
      });
    },
    getCartList() {
      axios.get(`${apiUrl}/api/${apiPath}/cart`).then((res) => {
        this.cart = res.data.data;
      });
    },
    updateCartItem(item) {
      // 更新購物車內品項的數量
      // 購物車內選項的id, 產品的id
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };
      this.loadingItem = item.id;
      axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data }).then((res) => {
        this.getCartList();
        this.loadingItem = "";
      });
    },
    deleteCartItem(id) {
      this.loadingItem = id;
      axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`).then((res) => {
        this.getCartList();
        this.loadingItem = "";
      });
    },
    cleanCartList() {
      axios.delete(`${apiUrl}/api/${apiPath}/carts`).then((res) => {
        this.getCartList();
      });
    },
  },
  components: {
    productModal,
  },
  mounted() {
    this.getProducts();
    this.getCartList();
  },
});

app.mount("#app");
