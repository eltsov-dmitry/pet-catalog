import type { Product } from '@/shared/api/products';

/** Фикстура для тестов: полный Product с дефолтами, поля перекрываются по необходимости. */
export const makeProduct = (overrides: Partial<Product> = {}): Product => ({
    id: 1,
    title: 'Тестовый товар',
    description: 'Описание',
    category: 'beauty',
    price: 100,
    discountPercentage: 0,
    rating: 5,
    stock: 10,
    tags: [],
    sku: 'SKU-1',
    weight: 1,
    dimensions: { width: 1, height: 1, depth: 1 },
    warrantyInformation: 'нет',
    shippingInformation: 'нет',
    availabilityStatus: 'In Stock',
    reviews: [],
    returnPolicy: 'нет',
    minimumOrderQuantity: 1,
    meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
    images: ['image.jpg'],
    thumbnail: 'thumb.jpg',
    ...overrides,
});
