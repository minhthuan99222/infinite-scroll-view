import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import { ProductRepository } from "@/core/repository/ProductRepository";
import { ProductListingResponse } from "@/core/domain/product";
import store from "@/common/stores/index";

@Module({ name: "ProductStore", store: store, dynamic: true, namespaced: true })
class ProductModule extends VuexModule {
  private readonly productRepository = new ProductRepository();
  productListingResponse: ProductListingResponse =
    ProductListingResponse.empty();

  @Action
  async handleLoadProductList(payload: {
    keyword: string;
    from: number;
    size?: number;
  }): Promise<ProductListingResponse> {
      const { from, size, keyword } = payload;
      if(from < this.productListingResponse.total){
        const response = await this.productRepository.list(
          keyword,
          from,
          size ?? ProductListingResponse.DEFAULT_SIZE
        );
        return response;
      } else  {
        return ProductListingResponse.empty();
      }
  }

  @Mutation
  appendProductList(response: ProductListingResponse) {
    this.productListingResponse.products = this.productListingResponse.products.concat(response.products);
    this.productListingResponse.total = response.total;
    this.productListingResponse.from = response.from;
    this.productListingResponse.size = response.size;
  }

  @Mutation
  setProductList(response: ProductListingResponse) {
    this.productListingResponse = response;
  }


  @Mutation
  reset() {
    this.productListingResponse = ProductListingResponse.empty();
  }
}
export const ProductStore: ProductModule = getModule(ProductModule);
