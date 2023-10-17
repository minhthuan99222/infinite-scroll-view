<template>
  <div class="product-listing">
    <template v-for="product in products">
      <ProductCard :key="product.id" :product="product" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductCard from "@/screens/components/ProductCard.vue";
import { ProductInfo } from "@/core/domain/product";

@Component({
  components: {
    ProductCard,
  },
})
export default class ProductListing extends Vue {
  @Prop({ required: true })
  products!: ProductInfo[];
}
</script>

<style lang="scss">
.product-listing {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
