import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = ''
}: PaginationProps) => {
  
  // No permitir páginas menores que 1 o mayores que el total
  const goToPage = (page: number) => {
    const safePage = Math.max(1, Math.min(page, totalPages));
    if (safePage !== currentPage) {
      onPageChange(safePage);
    }
  };

  // Determinar qué números de página mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas alrededor de la actual
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      // Ajustar si estamos cerca del final
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Agregar primera página y puntos suspensivos si es necesario
      if (startPage > 1) {
        pages.unshift(-1); // Puntos suspensivos
        pages.unshift(1);
      }
      
      // Agregar última página y puntos suspensivos si es necesario
      if (endPage < totalPages) {
        pages.push(-2); // Puntos suspensivos
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Si no hay páginas, no mostrar nada
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center bg-gray-900 rounded-lg shadow-lg border border-gray-800">
        {/* Botón primera página */}
        <button 
          onClick={() => goToPage(1)} 
          disabled={currentPage === 1}
          className={`flex items-center justify-center px-2 py-2 border-r border-gray-800 ${
            currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-800 hover:text-amber-500'
          }`}
          aria-label="Primera página"
        >
          <ChevronsLeft size={16} />
        </button>
        
        {/* Botón página anterior */}
        <button 
          onClick={() => goToPage(currentPage - 1)} 
          disabled={currentPage === 1}
          className={`flex items-center justify-center px-2 py-2 border-r border-gray-800 ${
            currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-800 hover:text-amber-500'
          }`}
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
        </button>
        
        {/* Números de página */}
        {pageNumbers.map((pageNumber, index) => {
          // Para los puntos suspensivos
          if (pageNumber < 0) {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 border-r border-gray-800 text-gray-400">
                ...
              </span>
            );
          }
          
          // Para los números de página
          return (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`px-3 py-2 border-r border-gray-800 ${
                currentPage === pageNumber 
                  ? 'bg-amber-500 text-black font-medium' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-amber-500'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        
        {/* Botón página siguiente */}
        <button 
          onClick={() => goToPage(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center px-2 py-2 border-r border-gray-800 ${
            currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-800 hover:text-amber-500'
          }`}
          aria-label="Página siguiente"
        >
          <ChevronRight size={16} />
        </button>
        
        {/* Botón última página */}
        <button 
          onClick={() => goToPage(totalPages)} 
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center px-2 py-2 ${
            currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:bg-gray-800 hover:text-amber-500'
          }`}
          aria-label="Última página"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};