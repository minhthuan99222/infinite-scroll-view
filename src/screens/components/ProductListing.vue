<template>
  <div class="product-listing">
    <h1>Product Listing</h1>
    <ProductCard />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductCard from "./ProductCard.vue";

@Component({
  components: {
    ProductCard,
  },
})
export default class ProductListing extends Vue {}
</script>

<style lang="scss">
.product-listing {
}
</style>
