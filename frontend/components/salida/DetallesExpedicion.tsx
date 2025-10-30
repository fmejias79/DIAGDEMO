import React, { useState, useMemo } from 'react';
import type { DetallesExpedicion as DetallesExpedicionType } from '../../types';
import { 
    SaveIcon, ChevronDownIcon, ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon,
    ChevronsRightIcon, RefreshCwIcon, MinusIcon, MenuIcon, PencilIcon, MoreVerticalIcon,
    CalendarIcon, ArrowUpIcon, ArrowDownIcon, FileSpreadsheetIcon
} from '../../constants';

const estatusStyles: Record<DetallesExpedicionType['estatus'], string> = {
  'Pendiente': 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200',
  'Asignado': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'En Picking': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'Preparado': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  'Expedido': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};

const asignadoOptions: DetallesExpedicionType['asignado'][] = ['Sí', 'No', 'Parcial'];
const preparadoOptions: DetallesExpedicionType['preparado'][] = ['Sí', 'No', 'Parcial'];
const estatusOptions: DetallesExpedicionType['estatus'][] = ['Pendiente', 'Asignado', 'En Picking', 'Preparado', 'Expedido'];
const estrategiaOptions: DetallesExpedicionType['estrategiaAsignacion'][] = ['FIFO', 'LIFO', 'Por Ubicación', 'Por Lote'];
type SortableKeys = keyof DetallesExpedicionType;

const columns: { key: SortableKeys, label: string, filterType: 'text' | 'select' | 'date' | 'number', options?: string[], editable: boolean }[] = [
    { key: 'numeroOrden', label: 'N° orden', filterType: 'number', editable: true },
    { key: 'numeroLinea', label: 'N° de línea', filterType: 'number', editable: false },
    { key: 'prioridad', label: 'P...', filterType: 'text', editable: true },
    { key: 'articulo', label: 'Artículo', filterType: 'text', editable: true },
    { key: 'descripcion', label: 'D...', filterType: 'text', editable: false },
    { key: 'cantidadPendiente', label: 'Cantidad pendiente', filterType: 'number', editable: false },
    { key: 'cantidadOrden', label: 'Cantidad de orden', filterType: 'number', editable: true },
    { key: 'asignado', label: 'Asignado', filterType: 'select', options: asignadoOptions, editable: true },
    { key: 'preparado', label: 'Preparado', filterType: 'select', options: preparadoOptions, editable: true },
    { key: 'estatus', label: 'Estatus', filterType: 'select', options: estatusOptions, editable: true },
    { key: 'ordenExterna1', label: 'Orden externa N°1', filterType: 'text', editable: true },
    { key: 'fechaCreacion', label: 'Fecha de creación', filterType: 'date', editable: false },
    { key: 'estrategiaAsignacion', label: 'Estrategia de asignación', filterType: 'select', options: estrategiaOptions, editable: true },
];

const ActionButton: React.FC<{ icon?: React.ReactNode, variant?: 'primary' | 'secondary', [key: string]: any }> = ({ icon, children, variant = 'primary', ...props }) => {
    const baseClasses = "px-3 py-1.5 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-1.5";
    const variants = {
        primary: 'text-white bg-blue-600 border border-transparent hover:bg-blue-700',
        secondary: 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600',
    };
    return (
        <button className={`${baseClasses} ${variants[variant]}`} {...props}>
            {icon}
            {children}
        </button>
    );
};

const DetallesExpedicion: React.FC = () => {
    const [data, setData] = useState<DetallesExpedicionType[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<Partial<DetallesExpedicionType> | null>(null);
    const itemsPerPage = 10;

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
            setData(prev => prev.map(row => {
                if (row.id === editingRowId) {
                    const updatedRow = { ...row, ...editedData };
                    const cantidadOrden = updatedRow.cantidadOrden;
                    const cantidadPreparada = updatedRow.cantidadPreparada;
                    updatedRow.cantidadPendiente = Math.max(0, cantidadOrden - cantidadPreparada);
                    return updatedRow;
                }
                return row;
            }));
            setEditingRowId(null);
            setEditedData(null);
        }
    };

    const handleEdit = (item: DetallesExpedicionType) => {
        if (editingRowId && editingRowId !== item.id) {
            handleSave();
        }
        setEditingRowId(item.id);
        setEditedData({ ...item });
    };

    const handleEditChange = (field: keyof DetallesExpedicionType, value: any) => {
        if (editedData) {
            setEditedData(prev => ({ ...prev, [field]: value }));
        }
    };

    const filteredData = useMemo(() => data.filter(item => 
        Object.entries(filters).every(([key, value]) => 
            !value || String(item[key as keyof DetallesExpedicionType]).toLowerCase().includes(String(value).toLowerCase())
        )
    ), [data, filters]);

    const sortedData = useMemo(() => {
        let sortableItems = [...filteredData];
        if (sortConfig) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [filteredData, sortConfig]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    
    const inputClasses = "w-full text-sm p-1 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500";
    
    return (
        <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-4 h-full">
            <div className="flex flex-wrap items-center gap-2">
                <ActionButton icon={<SaveIcon className="w-4 h-4" />} onClick={handleSave}>GUARDAR</ActionButton>
                <ActionButton icon={<ChevronDownIcon className="w-4 h-4" />}>ACCIONES</ActionButton>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-b py-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1">
                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronsLeftIcon className="w-4 h-4" /></button>
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronLeftIcon className="w-4 h-4" /></button>
                    <span className="text-sm px-2 text-gray-700 dark:text-gray-300">Página {currentPage} de {totalPages || 1}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronRightIcon className="w-4 h-4" /></button>
                    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage >= totalPages} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronsRightIcon className="w-4 h-4" /></button>
                    <button className="p-1.5 ml-2 text-gray-600 dark:text-gray-300"><RefreshCwIcon className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-2">
                    <ActionButton variant="secondary" icon={<FileSpreadsheetIcon className="w-4 h-4" />}>EXPORTAR A EXCEL</ActionButton>
                    <button className="p-1.5"><MinusIcon className="w-5 h-5 text-gray-400" /></button>
                </div>
            </div>

            <div className="overflow-auto flex-1 custom-scrollbar -mx-4 sm:-mx-6 px-4 sm:px-6">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="px-2 py-2"><MenuIcon className="w-4 h-4 text-gray-500" /></th>
                            <th scope="col" className="px-2 py-2"><PencilIcon className="w-4 h-4 text-gray-500" /></th>
                            {columns.map(col => (
                                <th key={col.key} scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap" onClick={() => requestSort(col.key)}>
                                    <div className="flex items-center gap-2 cursor-pointer">{col.label} {sortConfig?.key === col.key ? (sortConfig.direction === 'ascending' ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />) : <ArrowUpIcon className="w-3 h-3 text-transparent" />}</div>
                                </th>
                            ))}
                            <th scope="col" className="px-2 py-2"><MoreVerticalIcon className="w-4 h-4 text-gray-500" /></th>
                        </tr>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="p-1" colSpan={2}></th>
                            {columns.map(col => (
                                <th key={`${col.key}-filter`} className="px-2 py-1 font-normal">
                                    {col.filterType === 'text' && <input type="text" onChange={(e) => handleFilterChange(col.key, e.target.value)} className={inputClasses} />}
                                    {col.filterType === 'number' && <input type="number" onChange={(e) => handleFilterChange(col.key, e.target.value)} className={inputClasses} />}
                                    {col.filterType === 'date' && <div className="relative"><input type="date" onChange={(e) => handleFilterChange(col.key, e.target.value)} className={`${inputClasses} pr-7`} /><CalendarIcon className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /></div>}
                                    {col.filterType === 'select' && <select onChange={(e) => handleFilterChange(col.key, e.target.value)} className={inputClasses}><option value="">Todos</option>{col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>}
                                </th>
                            ))}
                             <th className="p-1"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {paginatedData.map(item => {
                            const isEditing = editingRowId === item.id;
                            return(
                                <tr key={item.id} className={`${isEditing ? 'bg-blue-50/50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                    <td className="px-2 py-2 whitespace-nowrap"><MenuIcon className="w-4 h-4 text-gray-400 cursor-pointer" /></td>
                                    <td className="px-2 py-2 whitespace-nowrap"><button onClick={() => handleEdit(item)} className="p-1"><PencilIcon className="w-4 h-4 text-gray-400" /></button></td>
                                    {columns.map(col => (
                                        <td key={col.key} className={`px-4 py-1 whitespace-nowrap text-base ${col.key === 'numeroOrden' && 'bg-blue-100 dark:bg-blue-900/30'}`}>
                                            {isEditing && col.editable ? (
                                                col.filterType === 'select' ? (
                                                    <select value={editedData?.[col.key as keyof DetallesExpedicionType] as string || ''} onChange={e => handleEditChange(col.key as keyof DetallesExpedicionType, e.target.value)} className={inputClasses}>
                                                        {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                    </select>
                                                ) : (
                                                    <input 
                                                        type={col.filterType === 'number' ? 'number' : 'text'}
                                                        value={editedData?.[col.key as keyof DetallesExpedicionType] as any || ''}
                                                        onChange={e => handleEditChange(col.key as keyof DetallesExpedicionType, col.filterType === 'number' ? parseFloat(e.target.value) : e.target.value)}
                                                        className={`${inputClasses} ${col.key === 'numeroOrden' && 'bg-transparent dark:bg-transparent'}`}
                                                    />
                                                )
                                            ) : col.key === 'estatus' ? (
                                                <span className={`px-2 py-0.5 inline-flex text-sm leading-5 font-semibold rounded-full ${estatusStyles[item.estatus]}`}>{item.estatus}</span>
                                            ) : (
                                                <span className="text-gray-800 dark:text-gray-200">{item[col.key as keyof DetallesExpedicionType]}</span>
                                            )}
                                        </td>
                                    ))}
                                    <td className="px-2 py-2 whitespace-nowrap text-center"><MoreVerticalIcon className="w-4 h-4 text-gray-400 cursor-pointer" /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 pt-2">
                Mostrando {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} a {Math.min(currentPage * itemsPerPage, sortedData.length)} de {sortedData.length} resultados.
            </div>
        </div>
    );
};

export default DetallesExpedicion;