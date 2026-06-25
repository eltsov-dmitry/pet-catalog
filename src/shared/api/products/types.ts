// Габариты товара
interface ProductDimensions {
    width: number;
    height: number;
    depth: number;
}

// Отзыв на товар
interface ProductReview {
    rating: number;
    comment: string;
    date: string; // ISO-строка даты
    reviewerName: string;
    reviewerEmail: string;
}

// Служебные мета-поля товара
interface ProductMeta {
    createdAt: string; // ISO-строка даты
    updatedAt: string; // ISO-строка даты
    barcode: string;
    qrCode: string;
}

// Товар
export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand?: string; // отсутствует у части товаров (например, категория groceries)
    sku: string;
    weight: number;
    dimensions: ProductDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: ProductReview[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: ProductMeta;
    images: string[];
    thumbnail: string;
}

// Ответ списка товаров (с пагинацией)
export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
