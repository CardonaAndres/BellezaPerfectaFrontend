import { ArrowDown, Calendar, Database, FileText, Package, RefreshCw } from "lucide-react"
import { formatDate } from "../../products/ts/styles"
import { RecordType } from "../ts/types"

type Props = {
    record : RecordType
}

const getOperationIcon = (type: string) => {
    if (type.includes("Registrar") || type.includes("Creación"))
        return <Database className="text-green-500" size={20} />;

    if (type.includes("Factura"))
        return <ArrowDown className="text-red-500" size={20} />;

    if (type.includes("Actualización") || type.includes("Modificar"))
        return <RefreshCw className="text-blue-500" size={20} />;

    return <Package className="text-amber-500" size={20} />;
};

export const RecordCard = ({ record } : Props) => {
  return (
    <div className="p-4 hover:bg-gray-900 transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-start mb-3 md:mb-0">
                <div className="p-2 rounded-full bg-gray-800 mr-4">
                {getOperationIcon(record.type)}
                </div>
                <div>
                <h4 className="text-white font-medium">{record.type}</h4>
                <div className="flex flex-wrap items-center text-sm text-gray-400 mt-1">
                    <div className="flex items-center mr-4 mb-1 md:mb-0">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(record.created_at)}</span>
                    </div>
                </div>
                </div>
            </div>
        
            <div className="flex flex-col md:items-end">
                <div className={`font-semibold ${record.quantity >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {record.quantity} unidades
                </div>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                <FileText size={14} className="mr-1" />
                <span>{record.reason}</span>
                </div>
            </div>
        </div>
    </div>
  )
}
