<template>
  <div class="product-screen">
    <h1>Product screen</h1>
    <ProductListing></ProductListing>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ProductListing from "./components/ProductListing.vue";
import { ProductStore } from "@/screens/stores/ProductStore";

@Component({
  components: {
    ProductListing,
  },
})
export default class ProductScreen extends Vue {
  created() {
    console.log("ProductScreen::created");
    ProductStore.handleLoadProductList({ from: 0, keyword: "" });
  }

  beforeDestroy() {
    console.log("ProductScreen::beforeDestroy");
    ProductStore.reset();
  }
}
</script>

<style>
.product-screen {
}
</style>
