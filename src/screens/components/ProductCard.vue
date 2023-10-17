<template>
  <div class="product-card">
    <div class="product-card--image-box">
      <img :src="product.thumbnail" :alt="product.description" />
    </div>
    <div class="product-card--text-box">
      <h2 class="product-card--text-box--item">{{ product.title }}</h2>
      <h3 class="product-card--text-box--latest-price">
        <del>{{ product.price }}</del> ${{ latestPrice }}
      </h3>
      <p class="description">{{ product.description }}</p>
      <label>Stock:</label>
      <input
        type="text"
        name="item-1-quantity"
        id="item-1-quantity"
        :value="product.stock"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProductInfo } from "@/core/domain/product";

@Component
export default class ProductCard extends Vue {
  @Prop({ required: true })
  private product!: ProductInfo;

  get latestPrice() {
    return (
      this.product.price -
      Math.round((this.product.price * this.product.discountPercentage) / 100)
    );
  }
}
</script>

<style lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0 1px rgba($color: #d2d2d2, $alpha: 0.5);
  border-radius: 12px;
  width: calc(20% - 16px);

  &--image-box {
    width: 100%;
    overflow: hidden;
    border-radius: 2% 2% 0 0;

    img {
      height: 15em;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      border-radius: 2% 2% 0 0;
      transition: all 1s ease;
      -moz-transition: all 1s ease;
      -ms-transition: all 1s ease;
      -webkit-transition: all 1s ease;
      -o-transition: all 1s ease;
    }
  }

  &:hover &--image-box img {
    transform: scale(1.2);
    overflow: hidden;
    border-radius: 2%;
  }

  &:hover {
    box-shadow: 1.5px 1.5px 2.5px 3px rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: 1.5px 1.5px 2.5px 3px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 1.5px 1.5px 2.5px 3px rgba(0, 0, 0, 0.4);
  }
}
</style>
