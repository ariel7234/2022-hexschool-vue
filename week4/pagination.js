export default {
  props: ["pages"],
  template: `
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {{pages.total_pages}} //FIXME: 哭喔 一直說total_pages undefined 明明就有
    <li class="page-item" v-for="page in pages" :key="page + 'page'"><a class="page-link" href="#">{{ page }}</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
  mounted() {
    console.log("page", this.page);
  },
};
