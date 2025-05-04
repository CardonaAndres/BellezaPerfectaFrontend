import { ProductGridProps } from '../ts/types';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.product_ID} product={product} />
      ))}
    </div>
  );
};
