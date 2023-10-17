import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import { ProductRepository } from "@/core/repository/ProductRepository";
import { ProductListingResponse } from "@/core/domain/product";
import { Status } from "@/common/enums/Status";
import store from "@/common/stores/index";

@Module({ name: "ProductStore", store: store, dynamic: true, namespaced: true })
class ProductModule extends VuexModule {
  private readonly DefaultLoadSize = 20;
  private readonly productRepository = new ProductRepository();
  productListingResponse: ProductListingResponse =
    ProductListingResponse.empty();
  status: Status = Status.Loaded;
  errorMessages = "";

  @Action
  async handleLoadProductList(payload: {
    keyword: string;
    from: number;
    size?: number;
  }): Promise<void> {
    try {
      const { from, size, keyword } = payload;
      this.setStatus(Status.Loading);
      const response = await this.productRepository.list(
        keyword,
        from,
        size ?? this.DefaultLoadSize
      );
      this.setProductList(response);
      this.setStatus(Status.Loaded);
    } catch (e: any) {
      console.error("ProductStore::handleLoadProductList::error::", e);
      this.setStatus(Status.Error);
      this.setErrorMessages(e.message);
    }
  }

  @Mutation
  setStatus(status: Status) {
    this.status = status;
  }

  @Mutation
  setProductList(response: ProductListingResponse) {
    this.productListingResponse = response;
  }

  @Mutation
  setErrorMessages(errorMessages: string) {
    this.errorMessages = errorMessages;
  }

  @Mutation
  reset() {
    this.productListingResponse = ProductListingResponse.empty();
    this.status = Status.Loaded;
    this.errorMessages = "";
  }
}
export const ProductStore: ProductModule = getModule(ProductModule);
