import React, { useState, useMemo } from 'react';
import { 
    SaveIcon, RefreshCwIcon, ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon, 
    DownloadIcon, HelpCircleIcon, MinusIcon, MoreVerticalIcon, ArrowUpIcon, ArrowDownIcon, MoreHorizontalIcon
} from '../constants';

// Types
type EstatusCC = 'Pendiente' | 'En Inspección' | 'Aprobado' | 'Rechazado';
type AjusteAutomatico = '-----' | 'Sí' | 'No';
type Disposicion = '-----' | 'Aceptar' | 'Rechazar' | 'Cuarentena' | 'Devolución';
type MotivoRechazo = '-----' | 'Dañado' | 'Incorrecto' | 'Incompleto' | 'Caducado';

interface EntradaCCItem {
  id: string;
  recepcion: string;
  linea: number;
  propietario: string;
  articulo: string;
  lpn: string;
  cantidadRecibida: number;
  cantidadAInspeccionar: number;
  cantidadInspeccionada: number;
  estatusCC: EstatusCC;
  motivoRechazo: MotivoRechazo | null;
  cantidadRechazada: number;
  lpnCuarentena: string | null;
  ajusteAutomatico: AjusteAutomatico;
  inspeccionadoPor: string | null;
  disposicion: Disposicion | null;
}

// Mock Data
const mockData: EntradaCCItem[] = [
    { id: '1', recepcion: 'ASN-001', linea: 1, propietario: 'Juan Pérez', articulo: 'ART-001', lpn: 'LPN001', cantidadRecibida: 100, cantidadAInspeccionar: 100, cantidadInspeccionada: 0, estatusCC: 'Pendiente', motivoRechazo: null, cantidadRechazada: 0, lpnCuarentena: null, ajusteAutomatico: '-----', inspeccionadoPor: null, disposicion: null },
    { id: '2', recepcion: 'ASN-001', linea: 2, propietario: 'Juan Pérez', articulo: 'ART-002', lpn: 'LPN002', cantidadRecibida: 50, cantidadAInspeccionar: 50, cantidadInspeccionada: 50, estatusCC: 'Aprobado', motivoRechazo: null, cantidadRechazada: 0, lpnCuarentena: null, ajusteAutomatico: 'Sí', inspeccionadoPor: 'admin', disposicion: 'Aceptar' },
    { id: '3', recepcion: 'ASN-002', linea: 1, propietario: 'Maria García', articulo: 'ART-003', lpn: 'LPN003', cantidadRecibida: 200, cantidadAInspeccionar: 100, cantidadInspeccionada: 100, estatusCC: 'Rechazado', motivoRechazo: 'Dañado', cantidadRechazada: 20, lpnCuarentena: 'LPN-CUAR-001', ajusteAutomatico: 'Sí', inspeccionadoPor: 'inspector01', disposicion: 'Rechazar' },
    { id: '4', recepcion: 'ASN-003', linea: 1, propietario: 'Ana Torres', articulo: 'ART-004', lpn: 'LPN004', cantidadRecibida: 75, cantidadAInspeccionar: 75, cantidadInspeccionada: 0, estatusCC: 'Pendiente', motivoRechazo: null, cantidadRechazada: 0, lpnCuarentena: null, ajusteAutomatico: '-----', inspeccionadoPor: null, disposicion: null },
    { id: '5', recepcion: 'ASN-004', linea: 1, propietario: 'Carlos Ruiz', articulo: 'ART-005', lpn: 'LPN005', cantidadRecibida: 120, cantidadAInspeccionar: 120, cantidadInspeccionada: 120, estatusCC: 'En Inspección', motivoRechazo: null, cantidadRechazada: 0, lpnCuarentena: null, ajusteAutomatico: 'No', inspeccionadoPor: 'inspector02', disposicion: 'Cuarentena' },
];

// Constants
const estatusCCOptions: EstatusCC[] = ['Pendiente', 'En Inspección', 'Aprobado', 'Rechazado'];
const motivoRechazoOptions: MotivoRechazo[] = ['-----','Dañado', 'Incorrecto', 'Incompleto', 'Caducado'];
const ajusteAutomaticoOptions: AjusteAutomatico[] = ['-----', 'Sí', 'No'];
const disposicionOptions: Disposicion[] = ['-----','Aceptar', 'Rechazar', 'Cuarentena', 'Devolución'];

type SortableKeys = keyof EntradaCCItem;

const columns: { key: SortableKeys, label: string, filterType: 'text' | 'select' | 'number', options?: any[] }[] = [
    { key: 'recepcion', label: 'Recepción', filterType: 'text' },
    { key: 'linea', label: 'N° de línea', filterType: 'number' },
    { key: 'propietario', label: 'Propietario', filterType: 'text' },
    { key: 'articulo', label: 'Artículo', filterType: 'text' },
    { key: 'lpn', label: 'LPN', filterType: 'text' },
    { key: 'cantidadRecibida', label: 'Cantidad recibida', filterType: 'number' },
    { key: 'cantidadAInspeccionar', label: 'Cantidad a inspeccionar', filterType: 'number' },
    { key: 'cantidadInspeccionada', label: 'Cantidad inspeccionada', filterType: 'number' },
    { key: 'estatusCC', label: 'Estatus CC', filterType: 'select', options: estatusCCOptions },
    { key: 'motivoRechazo', label: 'Motivo de rechazo', filterType: 'select', options: motivoRechazoOptions },
    { key: 'cantidadRechazada', label: 'Cantidad rechazada', filterType: 'number' },
    { key: 'lpnCuarentena', label: 'LPN cuarentena', filterType: 'text' },
    { key: 'ajusteAutomatico', label: 'Ajuste automático', filterType: 'select', options: ajusteAutomaticoOptions },
    { key: 'inspeccionadoPor', label: 'Inspeccionado por', filterType: 'text' },
    { key: 'disposicion', label: 'Disposición', filterType: 'select', options: disposicionOptions },
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

const EntradaCC: React.FC = () => {
    const [data, setData] = useState<EntradaCCItem[]>(mockData);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
                const itemValue = item[key as keyof EntradaCCItem];
                if (itemValue === null || itemValue === undefined) return false;
                return String(itemValue).toLowerCase().includes((value as string).toLowerCase());
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
            <ActionButton icon={<SaveIcon className="w-4 h-4" />} primary>GUARDAR</ActionButton>
            <ActionButton icon={<RefreshCwIcon className="w-4 h-4" />}>ACTUALIZAR</ActionButton>
        </div>

        {/* Navigation and Controls */}
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
                <ActionButton icon={<DownloadIcon className="w-4 h-4" />}>EXPORTAR</ActionButton>
                <button className="p-1.5"><HelpCircleIcon className="w-5 h-5 text-gray-400" /></button>
                <button className="p-1.5 text-gray-600 dark:text-gray-300"><MinusIcon className="w-4 h-4" /></button>
                 <button className="p-1.5 text-gray-600 dark:text-gray-300"><MoreVerticalIcon className="w-4 h-4" /></button>
            </div>
        </div>
      
        <div className="overflow-auto flex-1 custom-scrollbar -mx-4 sm:-mx-6 px-4 sm:px-6">
            <table className="min-w-full border-separate border-spacing-0">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
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
                         <th scope="col" className="px-4 py-2 border-b border-gray-200 dark:border-gray-600"><span className="sr-only">Acciones</span></th>
                    </tr>
                    <tr>
                        <th className="p-1 border-b border-gray-300 dark:border-gray-500"></th>
                        {columns.map(col => (
                            <th key={`${col.key}-filter`} className="px-2 py-1 font-normal border-b border-gray-300 dark:border-gray-500">
                                {col.filterType === 'text' && <input type="text" onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />}
                                {col.filterType === 'number' && <input type="number" onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />}
                                {col.filterType === 'select' && (
                                    <select onChange={(e) => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1">
                                        <option value="">-----</option>
                                        {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                )}
                            </th>
                        ))}
                        <th className="p-1 border-b border-gray-300 dark:border-gray-500"></th>
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
                                <td key={col.key} className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700">{item[col.key as keyof EntradaCCItem] ?? ''}</td>
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

export default EntradaCC;