<template>
  <div class="product-screen">
    <div class="product-screen--search">
      <input v-model="keyword">
    </div>
    <status-widget :status="status" :error="error" @retry="handleRetry">
        <ProductListing
          class="product-screen--product-listing"
          :products="productListingResponse.products"
        ></ProductListing>
    </status-widget>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ProductListing from "@/screens/components/ProductListing.vue";
import { ProductStore } from "@/screens/stores/ProductStore";

@Component({
  components: {
    ProductListing,
  },
})
export default class ProductScreen extends Vue {
  keyword = "";

  get status() {
    return ProductStore.status;
  }

  get error() {
    return ProductStore.errorMessage;
  }

  get productListingResponse() {
    return ProductStore.productListingResponse;
  }

  async handleRetry() {
    await ProductStore.handleLoadProductList({
      from: this.productListingResponse.from,
      keyword: this.keyword,
      size: this.productListingResponse.size,
    });
  }

  async created() {
    console.log("ProductScreen::created");
    await ProductStore.handleLoadProductList({ from: 0, keyword: "" });
  }

  beforeDestroy() {
    console.log("ProductScreen::beforeDestroy");
    ProductStore.reset();
  }
}
</script>

<style lang="scss">
.product-screen {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  &--search{
    //height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    z-index: 4;
  }

  &--product-listing {
      flex: 1;
  }
}
</style>
