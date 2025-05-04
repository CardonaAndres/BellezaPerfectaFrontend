export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
export const formatPrice = (price: string) => {
    const adjustedPrice = parseFloat(price);
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(adjustedPrice);
};
  
export const getStockStatus = (stock: number, stockMin: number) => {
    if (stock <= 0) {
      return {
        color: 'bg-red-500',
        text: 'Sin stock'
      };
    } else if (stock <= stockMin) {
      return {
        color: 'bg-amber-500',
        text: 'Stock bajo'
      };
    } else {
      return {
        color: 'bg-green-500',
        text: 'En stock'
      };
    }
};