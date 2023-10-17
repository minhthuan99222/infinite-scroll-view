export class ProductInfo {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: number,
    public discountPercentage: number,
    public rating: number,
    public stock: number,
    public brand: string,
    public category: string,
    public thumbnail: string,
    public images: string[]
  ) {}

  static fromObject(obj: any): ProductInfo {
    return new ProductInfo(
      obj.id,
      obj.title,
      obj.description,
      obj.price,
      obj.discountPercentage,
      obj.rating,
      obj.stock,
      obj.brand,
      obj.category,
      obj.thumbnail,
      obj.images
    );
  }
}
