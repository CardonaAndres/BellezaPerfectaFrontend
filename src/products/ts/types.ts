export type Product = {
    product_ID: string | null;
    name: string;
    description: string;
    price: string;
    stock: number;
    stock_min: number;
    iva: string;
    unit_measure: string;
    created_at?: string;
};
  
export type ProductGridProps = {
    products: Product[];
    onEdit?: (product: Product) => void;
    onDelete?: (productId: string) => void;
    onViewDetails?: (product: Product) => void;
};