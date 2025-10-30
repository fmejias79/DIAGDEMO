import React, { useState, useMemo } from 'react';
import { 
    FileSpreadsheetIcon, PlusIcon, SaveIcon, Trash2Icon, ChevronsLeftIcon, ChevronLeftIcon, 
    ChevronRightIcon, ChevronsRightIcon, RefreshCwIcon, HelpCircleIcon, MinusIcon, MoreVerticalIcon, 
    ArrowUpIcon, ArrowDownIcon, CalendarIcon
} from '../../constants';

// Types
type CategoriaCumplimiento = 'Calidad' | 'Entrega' | 'Documentación' | 'Certificaciones';

interface CumplimientoProveedor {
  id: string;
  expedidor: string;
  numeroASN: string;
  secuencia: number;
  categoria: CategoriaCumplimiento;
  preguntaCumplimiento: string;
  respuestaContestacion: string;
  fecha: string; // YYYY-MM-DD
  contestadoPor: string;
}

// Constants for filters
const categoriaOptions: CategoriaCumplimiento[] = ['Calidad', 'Entrega', 'Documentación', 'Certificaciones'];

type SortableKeys = keyof CumplimientoProveedor;

const columns: { key: SortableKeys, label: string, filterType: 'text' | 'select' | 'number' | 'date', options?: any[] }[] = [
    { key: 'expedidor', label: 'Expedidor', filterType: 'text' },
    { key: 'numeroASN', label: 'Número de ASN', filterType: 'text' },
    { key: 'secuencia', label: 'Secuencia', filterType: 'number' },
    { key: 'categoria', label: 'Categoría', filterType: 'select', options: categoriaOptions },
    { key: 'preguntaCumplimiento', label: 'Pregunta de cumplimiento del proveedor', filterType: 'text' },
    { key: 'respuestaContestacion', label: 'Respuesta/Contestación', filterType: 'text' },
    { key: 'fecha', label: 'Fecha', filterType: 'date' },
    { key: 'contestadoPor', label: 'Contestado por', filterType: 'text' },
];

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

const RegistroCumplimientoProveedor: React.FC = () => {
    const [data, setData] = useState<CumplimientoProveedor[]>([]);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
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
        if (newSelection.has(id)) newSelection.delete(id);
        else newSelection.add(id);
        setSelectedRows(newSelection);
    };

    const filteredData = useMemo(() => {
        return data.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value || value === '-----') return true;
                const itemValue = item[key as keyof CumplimientoProveedor];
                if (itemValue === null || itemValue === undefined) return false;
                return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
            });
        });
    }, [data, filters]);

    const sortedData = useMemo(() => {
        let sortableItems = [...filteredData];
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
    }, [filteredData, sortConfig]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const isAllSelectedOnPage = paginatedData.length > 0 && paginatedData.every(o => selectedRows.has(o.id));

    const handleSelectAllOnPage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSelection = new Set(selectedRows);
      if (e.target.checked) paginatedData.forEach(o => newSelection.add(o.id));
      else paginatedData.forEach(o => newSelection.delete(o.id));
      setSelectedRows(newSelection);
    };

  return (
    <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-4 h-full">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center gap-2">
            <ActionButton icon={<FileSpreadsheetIcon className="w-4 h-4" />} primary>EXPORTAR A EXCEL</ActionButton>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
            <ActionButton icon={<PlusIcon className="w-4 h-4" />}>NUEVO</ActionButton>
            <ActionButton icon={<SaveIcon className="w-4 h-4" />}>GUARDAR</ActionButton>
            <ActionButton icon={<Trash2Icon className="w-4 h-4" />}>ELIMINAR</ActionButton>
        </div>

        {/* Navigation and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-b py-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronsLeftIcon className="w-4 h-4" /></button>
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronLeftIcon className="w-4 h-4" /></button>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronRightIcon className="w-4 h-4" /></button>
                <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage >= totalPages} className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronsRightIcon className="w-4 h-4" /></button>
                <button className="p-1.5 ml-2 text-gray-600 dark:text-gray-300"><RefreshCwIcon className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
                    {Math.min(currentPage * itemsPerPage, sortedData.length)} de {sortedData.length}
                </span>
                <button className="p-1.5"><HelpCircleIcon className="w-5 h-5 text-gray-400" /></button>
                <button className="p-1.5 text-gray-600 dark:text-gray-300"><MinusIcon className="w-4 h-4" /></button>
                 <button className="p-1.5 text-gray-600 dark:text-gray-300"><MoreVerticalIcon className="w-4 h-4" /></button>
            </div>
        </div>
      
        <div className="overflow-auto flex-1 custom-scrollbar -mx-4 sm:-mx-6 px-4 sm:px-6">
            <table className="min-w-full border-separate border-spacing-0">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <input type="checkbox" onChange={handleSelectAllOnPage} checked={isAllSelectedOnPage} className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-blue-600 focus:ring-blue-500" />
                        </th>
                        {columns.map(col => (
                            <th key={col.key} scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider select-none border-b border-gray-200 dark:border-gray-600 whitespace-nowrap">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => requestSort(col.key)}>
                                    {col.label}
                                    <span className="opacity-50">
                                      {sortConfig?.key === col.key ? (sortConfig.direction === 'ascending' ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />) : <ArrowUpIcon className="w-3 h-3 text-gray-300 dark:text-gray-600" />}
                                    </span>
                                </div>
                            </th>
                        ))}
                         <th scope="col" className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"><span className="sr-only">Acciones</span></th>
                    </tr>
                    <tr>
                        <th className="p-1 bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-500"></th>
                        {columns.map(col => (
                            <th key={`${col.key}-filter`} className="px-2 py-1 font-normal border-b border-gray-300 dark:border-gray-500">
                                {col.filterType === 'text' && <input type="text" onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />}
                                {col.filterType === 'number' && <input type="number" onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />}
                                {col.filterType === 'date' && (
                                    <div className="relative">
                                        <input type="date" onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1 pr-7" />
                                        <CalendarIcon className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                )}
                                {col.filterType === 'select' && (
                                    <select onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1">
                                        <option value="">-----</option>
                                        {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                )}
                            </th>
                        ))}
                        <th className="p-1 bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-500"></th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                    {paginatedData.map((item, index) => {
                        const rowBg = index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700';
                        const hoverBg = 'hover:bg-gray-100 dark:hover:bg-gray-600';
                        
                        return (
                            <tr key={item.id} className={`${rowBg} ${hoverBg}`}>
                                <td className="px-4 py-2 whitespace-nowrap border-t border-gray-200 dark:border-gray-700">
                                    <input type="checkbox" checked={selectedRows.has(item.id)} onChange={() => handleSelectRow(item.id)} className="rounded border-gray-300 dark:border-gray-600 bg-transparent text-blue-600 focus:ring-blue-500"/>
                                </td>
                                {columns.map(col => (
                                <td key={col.key} className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700">{item[col.key as keyof CumplimientoProveedor]}</td>
                                ))}
                                <td className="px-4 py-2 whitespace-nowrap text-center text-sm font-medium border-t border-gray-200 dark:border-gray-700">
                                    <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-500 dark:text-gray-400">
                                        <MoreVerticalIcon className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        );
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

export default RegistroCumplimientoProveedor;