import React, { useState, useMemo } from 'react';
import type { DetallesPreparacion as DetallesPreparacionType } from '../../types';
import { 
    PlusIcon, SaveIcon, Trash2Icon, ChevronDownIcon, ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon,
    ChevronsRightIcon, RefreshCwIcon, MinusIcon, MenuIcon, PencilIcon, MoreVerticalIcon,
    CalendarIcon, ArrowUpIcon, ArrowDownIcon, FileSpreadsheetIcon, HelpCircleIcon
} from '../../constants';

const estatusStyles: Record<DetallesPreparacionType['estatus'], string> = {
  'Pendiente': 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200',
  'En Proceso': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'Preparado': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  'Verificado': 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300',
  'Completado': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};

const estatusOptions: DetallesPreparacionType['estatus'][] = ['Pendiente', 'En Proceso', 'Preparado', 'Verificado', 'Completado'];

type SortableKeys = keyof DetallesPreparacionType;

const columns: { key: SortableKeys, label: string, filterType: 'text' | 'select' | 'date' | 'number', options?: string[], editable: boolean }[] = [
    { key: 'numeroOrden', label: 'N° orden', filterType: 'number', editable: true },
    { key: 'numeroLinea', label: 'N° de línea', filterType: 'number', editable: false },
    { key: 'idEstuche', label: 'ID de estuche', filterType: 'text', editable: true },
    { key: 'lote', label: 'Lote', filterType: 'text', editable: true },
    { key: 'ubicacion', label: 'Ubicación', filterType: 'text', editable: true },
    { key: 'lpn', label: 'LPN', filterType: 'text', editable: true },
    { key: 'propietario', label: 'Propietario', filterType: 'text', editable: true },
    { key: 'articulo', label: 'Artículo', filterType: 'text', editable: true },
    { key: 'cantidad', label: 'Cantidad', filterType: 'number', editable: true },
    { key: 'estatus', label: 'Estatus', filterType: 'select', options: estatusOptions, editable: true },
    { key: 'idDeposito', label: 'ID de depósito', filterType: 'text', editable: true },
    { key: 'oleada', label: 'Oleada', filterType: 'text', editable: true },
    { key: 'numeroAsignacion', label: 'N° asignación', filterType: 'number', editable: false },
    { key: 'fechaCreacion', label: 'Fecha de creación', filterType: 'date', editable: false },
    { key: 'fechaEdicion', label: 'Fecha edición', filterType: 'date', editable: false },
];

const ActionButton: React.FC<{ icon?: React.ReactNode, primary?: boolean, [key: string]: any }> = ({ icon, children, primary = false, ...props }) => (
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

const DetallesPreparacion: React.FC = () => {
    const [data, setData] = useState<DetallesPreparacionType[]>([]);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<Partial<DetallesPreparacionType> | null>(null);
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

    const handleSelectRow = (id: string) => {
        const newSelection = new Set(selectedRows);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedRows(newSelection);
    };

    const handleSelectAllOnPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSelection = new Set(selectedRows);
        if (e.target.checked) {
            paginatedData.forEach(o => newSelection.add(o.id));
        } else {
            paginatedData.forEach(o => newSelection.delete(o.id));
        }
        setSelectedRows(newSelection);
    };
    
    const handleSave = () => {
        if (editingRowId && editedData) {
            setData(prev => prev.map(row => (row.id === editingRowId ? { ...row, ...editedData } : row) as DetallesPreparacionType));
            setEditingRowId(null);
            setEditedData(null);
        }
    };

    const handleEdit = (item: DetallesPreparacionType) => {
        if (editingRowId && editingRowId !== item.id) {
            handleSave();
        }
        setEditingRowId(item.id);
        setEditedData({ ...item });
    };

    const handleEditChange = (field: keyof DetallesPreparacionType, value: any) => {
        if (editedData) {
            setEditedData(prev => ({ ...prev, [field]: value }));
        }
    };
    
    const handleDelete = () => {
        if (selectedRows.size > 0) {
            setData(prev => prev.filter(row => !selectedRows.has(row.id)));
            setSelectedRows(new Set());
        }
    }

    const filteredData = useMemo(() => data.filter(item => 
        Object.entries(filters).every(([key, value]) => 
            !value || String(item[key as keyof DetallesPreparacionType]).toLowerCase().includes(String(value).toLowerCase())
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
    const isAllSelectedOnPage = paginatedData.length > 0 && paginatedData.every(o => selectedRows.has(o.id));
    
    const inputClasses = "w-full text-sm p-1 border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500";
    
    return (
        <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-4 h-full">
            <div className="flex flex-wrap items-center gap-2">
                <ActionButton icon={<PlusIcon className="w-4 h-4" />} primary>NUEVO</ActionButton>
                <ActionButton icon={<SaveIcon className="w-4 h-4" />} primary onClick={handleSave}>GUARDAR</ActionButton>
                <ActionButton icon={<Trash2Icon className="w-4 h-4" />} primary onClick={handleDelete}>ELIMINAR</ActionButton>
                <ActionButton icon={<ChevronDownIcon className="w-4 h-4" />} primary>ACCIONES</ActionButton>
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
                    <ActionButton icon={<FileSpreadsheetIcon className="w-4 h-4" />}>EXPORTAR A EXCEL</ActionButton>
                    <button className="p-1.5"><HelpCircleIcon className="w-5 h-5 text-gray-400" /></button>
                    <button className="p-1.5"><MinusIcon className="w-5 h-5 text-gray-400" /></button>
                </div>
            </div>

            <div className="overflow-auto flex-1 custom-scrollbar -mx-4 sm:-mx-6 px-4 sm:px-6">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="w-10 px-4 py-2"><input type="checkbox" onChange={handleSelectAllOnPage} checked={isAllSelectedOnPage} className="rounded" /></th>
                            <th scope="col" className="px-2 py-2"><MenuIcon className="w-4 h-4 text-gray-500" /></th>
                            <th scope="col" className="px-2 py-2"><PencilIcon className="w-4 h-4 text-gray-500" /></th>
                            {columns.map(col => (
                                <th key={col.key} scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap" onClick={() => requestSort(col.key)}>
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        {col.label}
                                        {col.key === 'estatus' && <span className="text-red-500">*</span>}
                                        {sortConfig?.key === col.key ? (sortConfig.direction === 'ascending' ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />) : <ArrowUpIcon className="w-3 h-3 text-transparent" />}
                                    </div>
                                </th>
                            ))}
                            <th scope="col" className="px-2 py-2"><MoreVerticalIcon className="w-4 h-4 text-gray-500" /></th>
                        </tr>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="p-1" colSpan={3}></th>
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
                                    <td className="px-4 py-2 whitespace-nowrap"><input type="checkbox" checked={selectedRows.has(item.id)} onChange={() => handleSelectRow(item.id)} className="rounded" /></td>
                                    <td className="px-2 py-2 whitespace-nowrap"><MenuIcon className="w-4 h-4 text-gray-400 cursor-pointer" /></td>
                                    <td className="px-2 py-2 whitespace-nowrap"><button onClick={() => handleEdit(item)} className="p-1"><PencilIcon className="w-4 h-4 text-gray-400" /></button></td>
                                    {columns.map(col => (
                                        <td key={col.key} className="px-4 py-1 whitespace-nowrap text-base">
                                            {isEditing && col.editable ? (
                                                col.filterType === 'select' ? (
                                                    <select value={editedData?.[col.key as keyof DetallesPreparacionType] as string || ''} onChange={e => handleEditChange(col.key as keyof DetallesPreparacionType, e.target.value)} className={inputClasses}>
                                                        {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                    </select>
                                                ) : (
                                                    <input 
                                                        type={col.filterType === 'number' ? 'number' : col.filterType === 'date' ? 'date' : 'text'}
                                                        value={editedData?.[col.key as keyof DetallesPreparacionType] as any || ''}
                                                        onChange={e => handleEditChange(col.key as keyof DetallesPreparacionType, col.filterType === 'number' ? parseFloat(e.target.value) : e.target.value)}
                                                        className={inputClasses}
                                                    />
                                                )
                                            ) : col.key === 'estatus' ? (
                                                <span className={`px-2 py-0.5 inline-flex text-sm leading-5 font-semibold rounded-full ${estatusStyles[item.estatus]}`}>{item.estatus}</span>
                                            ) : (
                                                <span className="text-gray-800 dark:text-gray-200">{item[col.key as keyof DetallesPreparacionType]}</span>
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
                {selectedRows.size > 0 && ` (${selectedRows.size} seleccionados)`}
            </div>
        </div>
    );
};

export default DetallesPreparacion;
