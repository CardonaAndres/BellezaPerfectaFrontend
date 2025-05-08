export type Product = {
    product_ID: string;
    name: string;
    description: string;
    price: string;
    stock: number;
    stock_min: number;
    iva: string;
    unit_measure: string;
    created_at: string;
};
  
export type InvoiceDetail = {
    detail_ID: number;
    quantity: string;
    total: string;
    price: string;
    product_ID: Product;
};
  
export type Client = {
    client_ID: string;
    document_type: string;
    name: string;
    city: string;
    zone: string;
    neighborhood: string;
    address: string;
    cellphone: string;
};
  
export type User = {
    user_ID: string;
    name: string;
    email: string;
    cellphone: string;
    address: string;
};
  
export type Invoice = {
    invoice_ID: number | null;
    city: string;
    zone: string;
    neighborhood: string;
    address: string;
    cellphone: string;
    date_invoice: string;
    date_end: string;
    type_payment: string;
    subtotal: string;
    IVA: string;
    retefuente: string;
    reteiva: string;
    total: string;
    client_ID: Client;
    user_ID: User;
    details: InvoiceDetail[];
};

type ProductItem = {
    product_ID: string;
    quantity: number;
    price: number;
};
  
export type InvoiceFormData = {
    invoice_ID: number | null;
    date_end: string;
    type_payment: string;
    client_ID: string;
    city: string;
    zone: string;
    neighborhood: string;
    address: string;
    cellphone: string;
    productsList: ProductItem[];
};

export type dailySaleType = {
    date: string,
    invoiceCount: number,
    total: number
}