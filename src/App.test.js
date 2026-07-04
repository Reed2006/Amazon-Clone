import { formatCny, localizeProduct } from './utils/locale';

test('localizes product copy and formats prices for China storefront', () => {
  const product = {
    id: 1,
    title: 'Apple iPhone 15 Pro Max, 256GB, Natural Titanium',
    description: 'Original English copy',
    price: 1199.99
  };

  expect(localizeProduct(product).title).toBe('Apple iPhone 15 Pro Max 256GB 原色钛金属');
  expect(formatCny(product.price)).toBe('¥8,640');
});
