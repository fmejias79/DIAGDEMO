import React, { useState, useMemo } from 'react';
import type { TransferenciaInstalacion as TransferenciaType } from '../../types';
import { 
    PlusIcon, SaveIcon, Trash2Icon, RefreshCwIcon, ChevronDownIcon,
    ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon,
    HelpCircleIcon, MoreVerticalIcon, CalendarIcon, ArrowUpIcon, ArrowDownIcon,
    FileSpreadsheetIcon, MoreHorizontalIcon
} from '../../constants';

const estatusStyles: Record<TransferenciaType['estatus'], string> = {
  'Pendiente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'En Proceso': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'Completada': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Cancelada': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const estatusOptions: TransferenciaType['estatus'][] = ['Pendiente', 'En Proceso', 'Completada', 'Cancelada'];

type SortableKeys = keyof TransferenciaType;

const columns: { key: SortableKeys, label: string, filterType: 'text' | 'select' | 'date' | 'number', options?: string[] }[] = [
  { key: 'propietario', label: 'Propietario', filterType: 'text' },
  { key: 'numeroOrdenTransferencia', label: 'Número orden transferencia', filterType: 'number' },
  { key: 'estatus', label: 'Estatus', filterType: 'select', options: estatusOptions },
  { key: 'numeroReferencia', label: 'Número de referencia', filterType: 'text' },
  { key: 'numeroRecepcion', label: 'Número recepción', filterType: 'number' },
  { key: 'fechaExpedicionSolicitada', label: 'Fecha de expedición solicitada', filterType: 'date' },
];

const ActionButton: React.FC<{ icon?: React.ReactNode, primary?: boolean, disabled?: boolean, [key: string]: any }> = ({ icon, children, primary = false, disabled = false, ...props }) => (
  <button
    className={`px-3 py-1.5 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-1.5
      ${disabled
        ? 'text-gray-500 bg-gray-200 border border-transparent dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
        : primary 
        ? 'text-white bg-blue-600 border border-transparent hover:bg-blue-700' 
        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600'
      }`}
    {...props}
    disabled={disabled}
  >
    {icon}
    {children}
  </button>
);

const TransferenciaInstalacion: React.FC = () => {
    const [data, setData] = useState<TransferenciaType[]>([]);
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

    const handleSelectAllOnPage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSelection = new Set(selectedRows);
      if (e.target.checked) paginatedData.forEach(o => newSelection.add(o.id));
      else paginatedData.forEach(o => newSelection.delete(o.id));
      setSelectedRows(newSelection);
    };

    const filteredData = useMemo(() => data.filter(item => 
        Object.entries(filters).every(([key, value]) => 
            !value || String(item[key as keyof TransferenciaType]).toLowerCase().includes(String(value).toLowerCase())
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

  return (
    <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-4 h-full">
        <div className="flex flex-wrap items-center gap-2">
            <ActionButton icon={<PlusIcon className="w-4 h-4" />}>NUEVO</ActionButton>
            <ActionButton icon={<SaveIcon className="w-4 h-4" />} disabled>GUARDAR</ActionButton>
            <ActionButton icon={<Trash2Icon className="w-4 h-4" />}>ELIMINAR</ActionButton>
            <ActionButton icon={<RefreshCwIcon className="w-4 h-4" />}>ACTUALIZAR</ActionButton>
            <ActionButton icon={<ChevronDownIcon className="w-4 h-4" />}>ACCIONES</ActionButton>
            <ActionButton icon={<ChevronDownIcon className="w-4 h-4" />}>INFORMES</ActionButton>
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
                <ActionButton icon={<MoreHorizontalIcon className="w-4 h-4" />}>MÁS CAMPOS</ActionButton>
                <ActionButton icon={<FileSpreadsheetIcon className="w-4 h-4" />}>EXPORTAR A EXCEL</ActionButton>
                <button className="p-1.5"><HelpCircleIcon className="w-5 h-5 text-gray-400" /></button>
            </div>
        </div>

        <div className="overflow-auto flex-1 custom-scrollbar -mx-4 sm:-mx-6 px-4 sm:px-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse">
                <thead className="bg-gray-50 dark:bg-gray-700/50 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                            <input type="checkbox" onChange={handleSelectAllOnPage} checked={isAllSelectedOnPage} className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-blue-600 focus:ring-blue-500" />
                        </th>
                        {columns.map(col => (
                            <th key={col.key} scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider select-none">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => requestSort(col.key)}>
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
                        {columns.map(col => (
                            <th key={`${col.key}-filter`} className="px-2 py-1 font-normal">
                                {col.filterType === 'text' && <input type="text" placeholder={`Filtrar por ${col.label.toLowerCase()}...`} onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />}
                                {col.filterType === 'number' && <input type="number" placeholder="Filtrar..." onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />}
                                {col.filterType === 'date' && (
                                    <div className="relative">
                                        <input type="date" onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1 pr-7" />
                                        <CalendarIcon className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
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
                    {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 py-2 whitespace-nowrap">
                            <input type="checkbox" checked={selectedRows.has(item.id)} onChange={() => handleSelectRow(item.id)} className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-blue-600 focus:ring-blue-500"/>
                        </td>
                        {columns.map(col => (
                             <td key={col.key} className="px-4 py-2 whitespace-nowrap text-base">
                                {col.key === 'estatus' ? (
                                    <span className={`px-2 py-0.5 inline-flex text-sm leading-5 font-semibold rounded-full ${estatusStyles[item.estatus]}`}>{item.estatus}</span>
                                ) : (
                                    <span className="text-gray-800 dark:text-gray-200">{item[col.key as keyof TransferenciaType]}</span>
                                )}
                            </td>
                        ))}
                        <td className="px-4 py-2 whitespace-nowrap text-center text-base font-medium">
                            <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                                <MoreVerticalIcon className="w-4 h-4" />
                            </button>
                        </td>
                    </tr>
                    ))}
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

export default TransferenciaInstalacion;
