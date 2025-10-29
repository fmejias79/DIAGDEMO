import React, { useState, useMemo } from 'react';
import type { PurchaseOrderDetail as PurchaseOrderDetailType } from '../types';
import { 
  SaveIcon, RefreshCwIcon, ChevronDownIcon,
  ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon,
  MoreVerticalIcon, ArrowUpIcon, ArrowDownIcon, PencilIcon, FileSpreadsheetIcon, MinusIcon
} from '../constants';

const mockPurchaseOrderDetails: PurchaseOrderDetailType[] = [
    { id: '1', ordenCompra: 'OC-2024-001', compradorPropietario: 'Juan Pérez', linea: 1, articulo: 'ART-001', descripcion: 'Laptop Pro 15"', paquete: 'UNIDAD', udm: 'PZA', estatus: 'Abierto', cantidadPedida: 10, cantidadRecibida: 5 },
    { id: '2', ordenCompra: 'OC-2024-001', compradorPropietario: 'Juan Pérez', linea: 2, articulo: 'ART-002', descripcion: 'Mouse Inalámbrico', paquete: 'CAJA_10', udm: 'PZA', estatus: 'Abierto', cantidadPedida: 20, cantidadRecibida: 20 },
    { id: '3', ordenCompra: 'OC-2024-002', compradorPropietario: 'Maria García', linea: 1, articulo: 'ART-003', descripcion: 'Teclado Mecánico', paquete: 'UNIDAD', udm: 'PZA', estatus: 'Cerrado', cantidadPedida: 15, cantidadRecibida: 15 },
    { id: '4', ordenCompra: 'OC-2024-003', compradorPropietario: 'Juan Pérez', linea: 1, articulo: 'ART-004', descripcion: 'Monitor 27" 4K', paquete: 'UNIDAD', udm: 'PZA', estatus: 'Abierto', cantidadPedida: 5, cantidadRecibida: 0 },
    { id: '5', ordenCompra: 'OC-2024-003', compradorPropietario: 'Juan Pérez', linea: 2, articulo: 'ART-005', descripcion: 'Webcam HD', paquete: 'UNIDAD', udm: 'PZA', estatus: 'Abierto', cantidadPedida: 10, cantidadRecibida: 0 },
    { id: '6', ordenCompra: 'OC-2024-004', compradorPropietario: 'Ana Torres', linea: 1, articulo: 'ART-006', descripcion: 'Docking Station USB-C', paquete: 'UNIDAD', udm: 'PZA', estatus: 'Cancelado', cantidadPedida: 8, cantidadRecibida: 0 },
    { id: '7', ordenCompra: 'OC-2024-005', compradorPropietario: 'Carlos Ruiz', linea: 1, articulo: 'ART-007', descripcion: 'Silla Ergonómica', paquete: 'UNIDAD', udm: 'PZA', estatus: 'Cerrado', cantidadPedida: 12, cantidadRecibida: 12 },
    { id: '8', ordenCompra: 'OC-2024-005', compradorPropietario: 'Carlos Ruiz', linea: 2, articulo: 'ART-008', descripcion: 'Escritorio Eléctrico', paquete: 'UNIDAD', udm: 'PZA', estatus: 'Cerrado', cantidadPedida: 12, cantidadRecibida: 12 },
    { id: '9', ordenCompra: 'OC-2024-006', compradorPropietario: 'Maria García', linea: 1, articulo: 'ART-009', descripcion: 'Filtro de Privacidad', paquete: 'PAQUETE_5', udm: 'PZA', estatus: 'Abierto', cantidadPedida: 50, cantidadRecibida: 25 },
    { id: '10', ordenCompra: 'OC-2024-007', compradorPropietario: 'Juan Pérez', linea: 1, articulo: 'ART-010', descripcion: 'Disco Duro SSD 1TB', paquete: 'UNIDAD', udm: 'PZA', estatus: 'Abierto', cantidadPedida: 30, cantidadRecibida: 0 },
];


const estatusOptions: PurchaseOrderDetailType['estatus'][] = ['Abierto', 'Cerrado', 'Cancelado'];

type SortableKeys = keyof PurchaseOrderDetailType;

const columns: { key: SortableKeys, label: string, filterType: 'text' | 'select' | 'number', options?: string[], isEditable: boolean }[] = [
    { key: 'ordenCompra', label: 'Orden compra', filterType: 'text', isEditable: false },
    { key: 'compradorPropietario', label: 'Comprador/Propietario', filterType: 'text', isEditable: false },
    { key: 'linea', label: 'N° de línea', filterType: 'number', isEditable: false },
    { key: 'articulo', label: 'Artículo', filterType: 'text', isEditable: true },
    { key: 'descripcion', label: 'Descripción', filterType: 'text', isEditable: true },
    { key: 'paquete', label: 'Paquete', filterType: 'text', isEditable: true },
    { key: 'udm', label: 'UDM', filterType: 'text', isEditable: true },
    { key: 'estatus', label: 'Estatus', filterType: 'select', options: estatusOptions, isEditable: true },
    { key: 'cantidadPedida', label: 'Cantidad pedida', filterType: 'number', isEditable: true },
    { key: 'cantidadRecibida', label: 'Ctd. recibida', filterType: 'number', isEditable: true },
];

// FIX: Changed to React.FC to fix children prop issue
const ActionButton: React.FC<{ icon: React.ReactNode, primary?: boolean, [key: string]: any }> = ({ icon, children, primary = false, ...props }) => (
  <button
    className={`px-3 py-1.5 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-1.5
      ${primary 
        ? 'text-white bg-blue-600 border border-transparent hover:bg-blue-700' 
        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600'
      }`}
    {...props}
  >
    {icon}
    {children}
  </button>
);

const PurchaseOrderDetail: React.FC = () => {
    const [details, setDetails] = useState<PurchaseOrderDetailType[]>(mockPurchaseOrderDetails);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<Partial<PurchaseOrderDetailType> | null>(null);

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const requestSort = (key: SortableKeys) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    
    const handleSave = () => {
      if (editingRowId && editedData) {
        setDetails(prev => prev.map(d => d.id === editingRowId ? { ...d, ...editedData } as PurchaseOrderDetailType : d));
        setEditingRowId(null);
        setEditedData(null);
        alert('Cambios guardados con éxito.');
      } else {
        alert('No hay cambios para guardar.');
      }
    };

    const handleEdit = (detail: PurchaseOrderDetailType) => {
        if(editingRowId) {
            handleSave();
        }
        setEditingRowId(detail.id);
        setEditedData({ ...detail });
    };

    const handleEditChange = (field: keyof PurchaseOrderDetailType, value: any) => {
        if (editedData) {
            setEditedData({ ...editedData, [field]: value });
        }
    };

    const handleSelectAllOnPage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSelection = new Set(selectedRows);
      if (e.target.checked) {
        paginatedDetails.forEach(o => newSelection.add(o.id));
      } else {
        paginatedDetails.forEach(o => newSelection.delete(o.id));
      }
      setSelectedRows(newSelection);
    };
    
    const handleSelectRow = (id: string) => {
        const newSelection = new Set(selectedRows);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedRows(newSelection);
    };

    const filteredDetails = useMemo(() => {
        return details.filter(detail => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                const detailValue = detail[key as keyof PurchaseOrderDetailType];
                if (detailValue === null || detailValue === undefined) {
                    return false;
                }
                // FIX: The detailValue can be a number, which does not have a `toLowerCase` method. Convert to string to ensure filter works correctly for all data types.
                return String(detailValue).toLowerCase().includes(value.toLowerCase());
            });
        });
    }, [details, filters]);

    const sortedDetails = useMemo(() => {
        let sortableItems = [...filteredDetails];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredDetails, sortConfig]);

    const paginatedDetails = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedDetails.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedDetails, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedDetails.length / itemsPerPage);
    const isAllSelectedOnPage = paginatedDetails.length > 0 && paginatedDetails.every(o => selectedRows.has(o.id));

  return (
    <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-4 h-full">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b pb-4 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
                <ActionButton icon={<SaveIcon className="w-4 h-4" />} primary onClick={handleSave}>GUARDAR</ActionButton>
            </div>
            <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronsLeftIcon className="w-4 h-4" /></button>
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronLeftIcon className="w-4 h-4" /></button>
                <span className="text-sm px-2 text-gray-700 dark:text-gray-300">Página {currentPage} de {totalPages || 1}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronRightIcon className="w-4 h-4" /></button>
                <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage >= totalPages} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronsRightIcon className="w-4 h-4" /></button>
                <button className="p-1.5 ml-2 text-gray-600 dark:text-gray-300"><RefreshCwIcon className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2">
                <ActionButton icon={<FileSpreadsheetIcon className="w-4 h-4" />}>EXPORTAR A EXCEL</ActionButton>
                <button className="p-1.5 text-gray-600 dark:text-gray-300"><MinusIcon className="w-4 h-4" /></button>
            </div>
        </div>
      
        <div className="overflow-auto flex-1 custom-scrollbar -mx-4 sm:-mx-6 px-4 sm:px-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse">
                <thead className="bg-gray-50 dark:bg-gray-700/50 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="w-10 px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                            <input type="checkbox" onChange={handleSelectAllOnPage} checked={isAllSelectedOnPage} className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-blue-600 focus:ring-blue-500" />
                        </th>
                        <th scope="col" className="w-10 px-4 py-2"><span className="sr-only">Editar</span></th>
                        {columns.map(col => (
                            <th key={col.key} scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider select-none">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => requestSort(col.key as SortableKeys)}>
                                    {col.label}
                                    <span className="opacity-50">
                                      {sortConfig?.key === col.key ? (sortConfig.direction === 'ascending' ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />) : <ArrowUpIcon className="w-3 h-3 text-gray-300 dark:text-gray-600" />}
                                    </span>
                                </div>
                            </th>
                        ))}
                        <th scope="col" className="relative px-4 py-2"><span className="sr-only">Acciones</span></th>
                    </tr>
                    <tr>
                        <th className="p-1"></th>
                        <th className="p-1"></th>
                        {columns.map(col => (
                            <th key={`${col.key}-filter`} className="px-2 py-1 font-normal">
                                {col.filterType === 'text' && <input type="text" onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />}
                                {col.filterType === 'number' && (
                                    <div className="flex items-center gap-1">
                                        <input type="number" onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />
                                        {(col.key === 'cantidadPedida' || col.key === 'cantidadRecibida') && <button className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"><ChevronDownIcon className="w-3 h-3 text-gray-500"/></button>}
                                    </div>
                                )}
                                {col.filterType === 'select' && (
                                    <select onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1">
                                        <option value="">Todos</option>
                                        {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                )}
                            </th>
                        ))}
                        <th className="p-1"></th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedDetails.map((detail) => (
                    <tr key={detail.id} className={`${editingRowId === detail.id ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                        <td className="px-4 py-2 whitespace-nowrap"><input type="checkbox" checked={selectedRows.has(detail.id)} onChange={() => handleSelectRow(detail.id)} className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-blue-600 focus:ring-blue-500"/></td>
                        <td className="px-4 py-2 whitespace-nowrap"><button onClick={() => handleEdit(detail)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><PencilIcon className="w-4 h-4"/></button></td>
                        {columns.map(col => (
                            <td key={col.key} className="px-4 py-2 whitespace-nowrap text-base text-gray-800 dark:text-gray-200">
                                {editingRowId === detail.id && col.isEditable ? (
                                    col.filterType === 'number' ? (
                                        <input type="number" value={editedData?.[col.key as keyof PurchaseOrderDetailType] as number || ''} onChange={e => handleEditChange(col.key as keyof PurchaseOrderDetailType, Number(e.target.value))} className="w-24 text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />
                                    ) : col.filterType === 'select' ? (
                                        <select value={editedData?.[col.key as keyof PurchaseOrderDetailType] as string || ''} onChange={e => handleEditChange(col.key as keyof PurchaseOrderDetailType, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1">
                                            {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    ) : (
                                        <input type="text" value={editedData?.[col.key as keyof PurchaseOrderDetailType] as string || ''} onChange={e => handleEditChange(col.key as keyof PurchaseOrderDetailType, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />
                                    )
                                ) : (
                                    detail[col.key as keyof PurchaseOrderDetailType]
                                )}
                            </td>
                        ))}
                        <td className="px-4 py-2 whitespace-nowrap text-center text-sm font-medium"><button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><MoreVerticalIcon className="w-4 h-4" /></button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 pt-2">
            Mostrando {paginatedDetails.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} a {Math.min(currentPage * itemsPerPage, sortedDetails.length)} de {sortedDetails.length} resultados.
            {selectedRows.size > 0 && ` (${selectedRows.size} seleccionados)`}
        </div>
    </div>
  );
};

export default PurchaseOrderDetail;