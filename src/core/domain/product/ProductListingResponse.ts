import { ProductInfo } from "./ProductInfo";

export class ProductListingResponse {
  static readonly DEFAULT_SIZE = 20;

  constructor(
    public products: ProductInfo[],
    public from: number,
    public size: number,
    public total: number
  ) {}

  static fromObject(obj: any): ProductListingResponse {
    return new ProductListingResponse(
      obj.products.map((item: any) => ProductInfo.fromObject(item)),
      obj.skip,
      obj.limit,
      obj.total
    );
  }

  static empty(): ProductListingResponse {
    return new ProductListingResponse([], 0, ProductListingResponse.DEFAULT_SIZE, ProductListingResponse.DEFAULT_SIZE);
  }
}
