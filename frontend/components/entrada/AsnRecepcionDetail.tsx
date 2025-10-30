import React, { useState, useMemo } from 'react';
import type { AsnRecepcionDetail as DetailType } from '../../types';
import { 
  SaveIcon, RefreshCwIcon, ChevronDownIcon,
  ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon,
  MoreVerticalIcon, ArrowUpIcon, ArrowDownIcon, PencilIcon, FileSpreadsheetIcon, MinusIcon
} from '../../constants';

const codigoBloqueoOptions: DetailType['codigoBloqueo'][] = ['Ninguno', 'Calidad', 'Retenido'];
const eStatusOptions: DetailType['eStatus'][] = ['Activo', 'Inactivo', 'Pendiente'];

type SortableKeys = keyof DetailType;

const columns: { key: SortableKeys, label: string, filterType: 'text' | 'select' | 'number', options?: string[], isEditable: boolean, hasAdvancedFilter?: boolean }[] = [
    { key: 'asnRecepcion', label: 'ASN/Recepción', filterType: 'text', isEditable: false },
    { key: 'linea', label: 'N° de línea', filterType: 'number', isEditable: false },
    { key: 'propietario', label: 'Propietario', filterType: 'text', isEditable: true },
    { key: 'articulo', label: 'Artículo', filterType: 'text', isEditable: true },
    { key: 'descripcion', label: 'Descripción', filterType: 'text', isEditable: true },
    { key: 'paquete', label: 'Paquete', filterType: 'text', isEditable: true },
    { key: 'udm', label: 'UDM', filterType: 'text', isEditable: true },
    { key: 'codigoBloqueo', label: 'Código de bloqueo', filterType: 'select', options: codigoBloqueoOptions, isEditable: true, hasAdvancedFilter: true },
    { key: 'lpn', label: 'LPN', filterType: 'text', isEditable: true },
    { key: 'ubicacion', label: 'Ubicación', filterType: 'text', isEditable: true },
    { key: 'ordenCompra', label: 'OC/Orden', filterType: 'text', isEditable: true },
    { key: 'eStatus', label: 'E-status', filterType: 'select', options: eStatusOptions, isEditable: true, hasAdvancedFilter: true },
    { key: 'cantidadEsperada', label: 'Ctd. esperada', filterType: 'number', isEditable: true, hasAdvancedFilter: true },
    { key: 'cantidadRecibida', label: 'Ctd. recibida', filterType: 'number', isEditable: true, hasAdvancedFilter: true },
];

const ActionButton: React.FC<{ icon: React.ReactNode, primary?: boolean, [key: string]: any }> = ({ icon, children, primary = false, ...props }) => (
  <button
    className={`px-3 py-1.5 text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-1.5
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

const AsnRecepcionDetail: React.FC = () => {
    const [details, setDetails] = useState<DetailType[]>([]);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<Partial<DetailType> | null>(null);

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
        setDetails(prev => prev.map(d => d.id === editingRowId ? { ...d, ...editedData } as DetailType : d));
        setEditingRowId(null);
        setEditedData(null);
        alert('Cambios guardados con éxito.');
      } else {
        alert('No hay cambios pendientes para guardar.');
      }
    };

    const handleEdit = (detail: DetailType) => {
        if(editingRowId && editingRowId !== detail.id) {
            handleSave();
        }
        setEditingRowId(detail.id);
        setEditedData({ ...detail });
    };

    const handleEditChange = (field: keyof DetailType, value: any) => {
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
                const detailValue = detail[key as keyof DetailType];
                if (detailValue === null || detailValue === undefined) return false;
                return String(detailValue).toLowerCase().includes(String(value).toLowerCase());
            });
        });
    }, [details, filters]);

    const sortedDetails = useMemo(() => {
        let sortableItems = [...filteredDetails];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
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
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b pb-4 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
                <ActionButton icon={<SaveIcon className="w-4 h-4" />} primary onClick={handleSave}>GUARDAR</ActionButton>
                <ActionButton icon={<ChevronDownIcon className="w-4 h-4" />}>ACCIONES</ActionButton>
            </div>
            <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronsLeftIcon className="w-4 h-4" /></button>
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronLeftIcon className="w-4 h-4" /></button>
                <span className="text-base px-2 text-gray-700 dark:text-gray-300">Página {currentPage} de {totalPages || 1}</span>
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
                        <th scope="col" className="w-10 px-4 py-2"><input type="checkbox" onChange={handleSelectAllOnPage} checked={isAllSelectedOnPage} className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-blue-600 focus:ring-blue-500" /></th>
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
                        <th className="p-1"></th><th className="p-1"></th>
                        {columns.map(col => (
                            <th key={`${col.key}-filter`} className="px-2 py-1 font-normal">
                                <div className="flex items-center gap-1">
                                {col.filterType === 'text' && <input type="text" onChange={e => handleFilterChange(col.key, e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />}
                                {col.filterType === 'number' && <input type="number" onChange={e => handleFilterChange(col.key, e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />}
                                {col.filterType === 'select' && (
                                    <select onChange={e => handleFilterChange(col.key, e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1">
                                        <option value="">Todos</option>
                                        {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                )}
                                {col.hasAdvancedFilter && <button className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"><ChevronDownIcon className="w-4 h-4 text-gray-500"/></button>}
                                </div>
                            </th>
                        ))}
                        <th className="p-1"></th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedDetails.map((detail) => (
                    <tr key={detail.id} className={`${editingRowId === detail.id ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                        <td className="px-4 py-2"><input type="checkbox" checked={selectedRows.has(detail.id)} onChange={() => handleSelectRow(detail.id)} className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-blue-600 focus:ring-blue-500"/></td>
                        <td className="px-4 py-2"><button onClick={() => handleEdit(detail)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><PencilIcon className="w-4 h-4"/></button></td>
                        {columns.map(col => (
                            <td key={col.key} className="px-4 py-2 whitespace-nowrap text-base text-gray-800 dark:text-gray-200">
                                {editingRowId === detail.id && col.isEditable ? (
                                    col.filterType === 'number' ? (
                                        <input type="number" value={editedData?.[col.key as keyof DetailType] as number ?? ''} onChange={e => handleEditChange(col.key as keyof DetailType, Number(e.target.value))} className="w-24 text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />
                                    ) : col.filterType === 'select' ? (
                                        <select value={editedData?.[col.key as keyof DetailType] as string ?? ''} onChange={e => handleEditChange(col.key as keyof DetailType, e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1">
                                            {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    ) : (
                                        <input type="text" value={editedData?.[col.key as keyof DetailType] as string ?? ''} onChange={e => handleEditChange(col.key as keyof DetailType, e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />
                                    )
                                ) : (
                                    detail[col.key as keyof DetailType]
                                )}
                            </td>
                        ))}
                        <td className="px-4 py-2 whitespace-nowrap text-center text-sm font-medium"><button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><MoreVerticalIcon className="w-4 h-4" /></button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="text-base text-gray-500 dark:text-gray-400 flex-shrink-0 pt-2">
            Mostrando {paginatedDetails.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} a {Math.min(currentPage * itemsPerPage, sortedDetails.length)} de {sortedDetails.length} resultados.
            {selectedRows.size > 0 && ` (${selectedRows.size} seleccionados)`}
        </div>
    </div>
  );
};

export default AsnRecepcionDetail;