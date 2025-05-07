import { useState } from 'react';
import { Invoice } from '../ts/types';
import { 
    Calendar, 
    MapPin,
    Phone, 
    User, 
    CreditCard, 
    FileText, 
    Package, 
    ChevronDown, 
    ChevronUp, 
    Printer, 
    Edit,
    Trash2
} from 'lucide-react';
import { InvoiceUpdateFormModal } from './InvoiceUpdateFormModal';
import { usePanelHook } from '../hooks/usePanelHook';

type Props = {
    invoice : Invoice
}

const formatCurrency = (value: string) => {
    const adjustedPrice = parseFloat(value);
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(adjustedPrice);
};  
  
  // Formatear fecha
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
};

export const InvoiceCard = ({ invoice } : Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { loading, deleteInvoice, downloadInvoiceAsPDF } = usePanelHook();
    const [ modal, setModal ] = useState(false);
    
    const onDownloadInvoiceAsPDF = async () => await downloadInvoiceAsPDF(invoice);
    const handleModal = () => setModal(!modal);
    const onDelete = async () => await deleteInvoice(false, (invoice.invoice_ID || 0));

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:border-amber-500">
          {/* Cabecera de la factura */}
          <div className="bg-black p-4 border-b border-amber-500">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FileText size={20} className="text-amber-500 mr-2" />
                <h3 className="text-amber-500 font-bold">Factura #{invoice.invoice_ID}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  {invoice.type_payment}
                </span>
                <button disabled={loading}
                  className="bg-gray-800 hover:bg-gray-700 p-1 rounded-full transition-colors"
                  onClick={onDownloadInvoiceAsPDF}
                >
                  <Printer size={16} className="text-amber-500" />
                </button>
                <button onClick={handleModal} disabled={loading} className="bg-gray-800 hover:bg-gray-700 p-1 rounded-full transition-colors">
                  <Edit size={16} className="text-amber-500" />
                </button>
                <button onClick={onDelete} disabled={loading} className="bg-gray-800 hover:bg-gray-700 p-1 rounded-full transition-colors"
                  >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
              
            </div>
          </div>
      
          {/* Información principal */}
          <div className="p-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Columna izquierda: Cliente e Información */}
              <div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <User size={16} className="text-amber-500 mr-2" />
                    <span className="text-gray-400 text-sm">Cliente:</span>
                  </div>
                  <h4 className="text-white font-medium ml-6">{invoice.client_ID.name}</h4>
                  <p className="text-gray-400 text-sm ml-6">{invoice.client_ID.document_type}: {invoice.client_ID.client_ID}</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <MapPin size={16} className="text-amber-500 mr-2" />
                    <span className="text-gray-400 text-sm">Dirección:</span>
                  </div>
                  <p className="text-white text-sm ml-6">{invoice.address}</p>
                  <p className="text-gray-400 text-sm ml-6">{invoice.city}, {invoice.zone} - {invoice.neighborhood}</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <Phone size={16} className="text-amber-500 mr-2" />
                    <span className="text-gray-400 text-sm">Teléfono:</span>
                  </div>
                  <p className="text-white text-sm ml-6">{invoice.cellphone}</p>
                </div>
              </div>
              
              {/* Columna derecha: Fechas y Totales */}
              <div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Calendar size={16} className="text-amber-500 mr-2" />
                    <span className="text-gray-400 text-sm">Fecha emisión:</span>
                  </div>
                  <p className="text-white text-sm ml-6">{formatDate(invoice.date_invoice)}</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Calendar size={16} className="text-amber-500 mr-2" />
                    <span className="text-gray-400 text-sm">Fecha vencimiento:</span>
                  </div>
                  <p className="text-white text-sm ml-6">{formatDate(invoice.date_end)}</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <CreditCard size={16} className="text-amber-500 mr-2" />
                    <span className="text-gray-400 text-sm">Total:</span>
                  </div>
                  <p className="text-amber-500 font-bold text-lg ml-6">{formatCurrency(invoice.total)}</p>
                </div>
              </div>
            </div>
            
            {/* Botón para expandir/colapsar detalles */}
            <div className="mt-4 text-center">
              <button 
                className="flex items-center mx-auto text-amber-500 hover:text-amber-400 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    <span className="mr-1">Ocultar detalles</span>
                    <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    <span className="mr-1">Ver detalles</span>
                    <ChevronDown size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
      
        {/* Detalles expandibles */}
        {isExpanded && (
          <div className="px-4 pb-4">
            <div className="border-t border-gray-800 pt-4 mt-2">
              <h4 className="text-white font-semibold mb-3 flex items-center">
                <Package size={16} className="text-amber-500 mr-2" />
                Productos y Servicios
              </h4>
              
              {/* Lista de productos */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 text-xs font-medium text-gray-400 p-2 border-b border-gray-700">
                  <div className="col-span-5">Producto</div>
                  <div className="col-span-2 text-center">Cantidad</div>
                  <div className="col-span-2 text-right">Precio</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>
                
                {invoice.details.map((detail) => (
                  <div 
                    key={detail.detail_ID} 
                    className="grid grid-cols-12 p-2 border-b border-gray-700 last:border-b-0 text-sm hover:bg-gray-700"
                  >
                    <div className="col-span-5 text-white">{detail.product_ID.name}</div>
                    <div className="col-span-2 text-center text-gray-300">{parseFloat(detail.quantity)}</div>
                    <div className="col-span-2 text-right text-gray-300">{formatCurrency(detail.price)}</div>
                    <div className="col-span-3 text-right text-amber-500 font-medium">{formatCurrency(detail.total)}</div>
                  </div>
                ))}
              </div>
              
              {/* Resumen de la factura */}
              <div className="mt-4 grid grid-cols-2">
                <div></div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-white">{formatCurrency(invoice.subtotal)}</span>
                  </div>
                  
                  {parseFloat(invoice.IVA) > 0 && (
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">IVA:</span>
                      <span className="text-white">{formatCurrency(invoice.IVA)}</span>
                    </div>
                  )}
                  
                  {parseFloat(invoice.retefuente) > 0 && (
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Retefuente:</span>
                      <span className="text-white">{formatCurrency(invoice.retefuente)}</span>
                    </div>
                  )}
                  
                  {parseFloat(invoice.reteiva) > 0 && (
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">ReteIVA:</span>
                      <span className="text-white">{formatCurrency(invoice.reteiva)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-700">
                    <span className="text-gray-300">Total:</span>
                    <span className="text-amber-500">{formatCurrency(invoice.total)}</span>
                  </div>
                </div>
              </div>
              
              {/* Información del vendedor */}
              <div className="mt-4 text-sm text-gray-400">
                <p className="flex items-center">
                  <User size={14} className="text-amber-500 mr-2" />
                  Emitido por: <span className="text-white ml-1">{invoice.user_ID.name}</span>
                </p>
                <p className="ml-6">{invoice.user_ID.email} • {invoice.user_ID.cellphone}</p>
              </div>
            </div>
          </div>
        )}

        <InvoiceUpdateFormModal open={modal} onClose={handleModal} invoice={invoice} />
    </div>
    )
}