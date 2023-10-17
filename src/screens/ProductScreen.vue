<template>
  <div  class="product-screen">
    <div class="product-screen--search">
      <input v-model="keyword">
    </div>
    <status-widget :status="status" :error="error" @retry="handleRetry">
        <ProductListing
          class="product-screen--product-listing"
          :products="productListingResponse.products"
          @loadMore="handleLoadMore"
        ></ProductListing>
    </status-widget>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Ref } from "vue-property-decorator";
import ProductListing from "@/screens/components/ProductListing.vue";
import { ProductStore } from "@/screens/stores/ProductStore";
import { Debounce } from "@/core/decorator/debounce";
import { Status } from "@/common/enums/Status";

@Component({
  components: {
    ProductListing,
  },
})
export default class ProductScreen extends Vue {
  keyword = "";
  status = Status.Loaded;
  error = "";

  @Ref()
  private scroller?: HTMLDivElement;


  get productListingResponse() {
    return ProductStore.productListingResponse;
  }

  showError(message: string) {
    this.status = Status.Error;
    this.error = message;
  }

  async handleRetry() {
    try {
      const result = await ProductStore.handleLoadProductList({
        from: this.productListingResponse.from,
        keyword: this.keyword,
        size: this.productListingResponse.size,
      });
      ProductStore.setProductList(result);
    } catch (e) {
      this.showError(e.message)
      console.error("ProductScreen::handleRetry::error", e);

    }

  }
  @Debounce(300)
  @Watch('keyword')
  async onKeywordChanged() {
    console.log("ProductScreen::onKeywordChanged::", this.keyword);

    try {
      const result = await ProductStore.handleLoadProductList({ from: 0, keyword: this.keyword });
      ProductStore.setProductList(result);
    } catch (e) {
      this.showError(e.message) ;
      console.error("ProductScreen::onKeywordChanged::error", e);
    }
  }

  async handleLoadMore(){
    try {
      const result = await ProductStore.handleLoadProductList({
        from: this.productListingResponse.from + this.productListingResponse.size,
        keyword: this.keyword,
        size: this.productListingResponse.size,
      });
      ProductStore.appendProductList(result);
    } catch (e) {
      this.showError(e.message) ;
      console.error("ProductScreen::handleLoadMore::error", e);
    }
  }


  async created() {
    console.log("ProductScreen::created");
    try {
      this.status = Status.Loading;
      const result = await ProductStore.handleLoadProductList({ from: 0, keyword: "" });
      ProductStore.setProductList(result);
      this.status = Status.Loaded;
    } catch (e) {
      this.showError(e.message) ;
      console.error("ProductScreen::created::error", e);
    }
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
