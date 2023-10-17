import { ProductInfo, ProductListingResponse } from "../domain/product";

export class ProductRepository {
  async list(
    keyword: string,
    from: number,
    size: number
  ): Promise<ProductListingResponse> {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${keyword}&limit=${size}&skip=${from}`
    );
    const jsonResponse: any = await response.json();
    return ProductListingResponse.fromObject(jsonResponse);
  }

  async get(id: number): Promise<ProductInfo> {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const jsonResponse: any = await response.json();
    return ProductInfo.fromObject(jsonResponse);
  }
}
