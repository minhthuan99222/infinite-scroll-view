<template>
  <div ref="scroller" class="product-listing" @scroll="handleScroll">
    <template v-for="product in products">
      <ProductCard :key="product.id" :product="product" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import ProductCard from "@/screens/components/ProductCard.vue";
import { ProductInfo } from "@/core/domain/product";

@Component({
  components: {
    ProductCard,
  },
})
export default class ProductListing extends Vue {
  private readonly VIEW_LIMIT = 0.6;
  @Prop({ required: true })
  products!: ProductInfo[];

  @Ref()
  private readonly scroller!: HTMLDivElement;

  mounted(): void {
    this.scroller.addEventListener("scroll", this.handleScroll);
  }

  beforeDestroy(): void {
    this.scroller.removeEventListener("scroll", this.handleScroll);
  }

  private handleScroll(): void {
    console.log("ProductListing::handleScroll::")
    const currentScroller = this.scroller
    const viewPerScroller: number = (currentScroller.scrollHeight - currentScroller.scrollTop) / currentScroller.clientHeight;
    if (viewPerScroller > this.VIEW_LIMIT) {
      this.$emit("loadMore");
    }
  }
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
