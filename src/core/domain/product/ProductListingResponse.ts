import { ProductInfo } from "./ProductInfo";

export class ProductListingResponse {
  constructor(
    public products: ProductInfo[],
    public from: number,
    public size: number,
    public total: number
  ) {}

  static fromObject(obj: any): ProductListingResponse {
    return new ProductListingResponse(
      obj.products.map((item: any) => ProductInfo.fromObject(item)),
      obj.from,
      obj.size,
      obj.total
    );
  }

  static empty(): ProductListingResponse {
    return new ProductListingResponse([], 0, 0, 0);
  }
}
