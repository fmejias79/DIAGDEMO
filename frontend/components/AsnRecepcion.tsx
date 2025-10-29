import React, { useState, useMemo } from 'react';
import type { AsnRecepcion as AsnRecepcionType } from '../types';
import { 
  SaveIcon, RefreshCwIcon, ChevronDownIcon,
  ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon,
  MoreVerticalIcon, ArrowUpIcon, ArrowDownIcon, PencilIcon, MinusIcon, PlusIcon,
  Trash2Icon, ArchiveIcon, DownloadIcon, UploadCloudIcon, HelpCircleIcon, FileTextIcon, CalendarIcon
} from '../constants';

const mockAsnData: AsnRecepcionType[] = [
    { id: '1', asnRecepcion: 'ASN-001', propietario: 'Juan Pérez', referenciaAlmacen: 'WH-REF-A1', fechaRecepcionEsperada: '2024-08-10', recepcionExterna: 'EXT-A1', ultimaFechaRecepcion: '2024-08-11', estatusRecepcion: 'Parcialmente Recibido', tipo: 'Estándar', fechaCierre: '2024-08-11', estatusTransporte: 'Entregado', codTransporte: 'TR-123', creadoPor: 'sistema', actualizadoPor: 'jperez' },
    { id: '2', asnRecepcion: 'ASN-002', propietario: 'Maria García', referenciaAlmacen: 'WH-REF-B2', fechaRecepcionEsperada: '2024-08-12', recepcionExterna: 'EXT-B2', ultimaFechaRecepcion: '', estatusRecepcion: 'Abierto', tipo: 'Urgente', fechaCierre: '', estatusTransporte: 'En Tránsito', codTransporte: 'TR-456', creadoPor: 'sistema', actualizadoPor: 'mgarcia' },
    { id: '3', asnRecepcion: 'ASN-003', propietario: 'Ana Torres', referenciaAlmacen: 'WH-REF-C3', fechaRecepcionEsperada: '2024-08-15', recepcionExterna: 'EXT-C3', ultimaFechaRecepcion: '2024-08-15', estatusRecepcion: 'Cerrado', tipo: 'Estándar', fechaCierre: '2024-08-15', estatusTransporte: 'Entregado', codTransporte: 'TR-789', creadoPor: 'sistema', actualizadoPor: 'atorres' },
    { id: '4', asnRecepcion: 'ASN-004', propietario: 'Carlos Ruiz', referenciaAlmacen: 'WH-REF-D4', fechaRecepcionEsperada: '2024-08-18', recepcionExterna: 'EXT-D4', ultimaFechaRecepcion: '', estatusRecepcion: 'Abierto', tipo: 'Devolución', fechaCierre: '', estatusTransporte: 'En Tránsito', codTransporte: 'TR-101', creadoPor: 'sistema', actualizadoPor: 'cruiz' },
    { id: '5', asnRecepcion: 'ASN-005', propietario: 'Juan Pérez', referenciaAlmacen: 'WH-REF-E5', fechaRecepcionEsperada: '2024-08-20', recepcionExterna: 'EXT-E5', ultimaFechaRecepcion: '', estatusRecepcion: 'Abierto', tipo: 'Estándar', fechaCierre: '', estatusTransporte: 'Retrasado', codTransporte: 'TR-112', creadoPor: 'sistema', actualizadoPor: 'jperez' },
    { id: '6', asnRecepcion: 'ASN-006', propietario: 'Maria García', referenciaAlmacen: 'WH-REF-F6', fechaRecepcionEsperada: '2024-08-22', recepcionExterna: 'EXT-F6', ultimaFechaRecepcion: '2024-08-21', estatusRecepcion: 'Parcialmente Recibido', tipo: 'Urgente', fechaCierre: '', estatusTransporte: 'Entregado', codTransporte: 'TR-131', creadoPor: 'sistema', actualizadoPor: 'mgarcia' },
];


const estatusRecepcionStyles: Record<AsnRecepcionType['estatusRecepcion'], string> = {
  'Abierto': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'Cerrado': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Parcialmente Recibido': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
};

const estatusTransporteStyles: Record<AsnRecepcionType['estatusTransporte'], string> = {
  'En Tránsito': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  'Entregado': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  'Retrasado': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const estatusRecepcionOptions: AsnRecepcionType['estatusRecepcion'][] = ['Abierto', 'Cerrado', 'Parcialmente Recibido'];
const tipoOptions: AsnRecepcionType['tipo'][] = ['Estándar', 'Urgente', 'Devolución'];
const estatusTransporteOptions: AsnRecepcionType['estatusTransporte'][] = ['En Tránsito', 'Entregado', 'Retrasado'];

type SortableKeys = keyof AsnRecepcionType;

const columns: { key: SortableKeys, label: string, filterType: 'text' | 'select' | 'date', options?: string[], isEditable: boolean }[] = [
    { key: 'asnRecepcion', label: 'ASN/Recepción', filterType: 'text', isEditable: false },
    { key: 'propietario', label: 'Propietario', filterType: 'text', isEditable: true },
    { key: 'referenciaAlmacen', label: 'Referencia de almacén', filterType: 'text', isEditable: true },
    { key: 'fechaRecepcionEsperada', label: 'Fecha recepción esperada', filterType: 'date', isEditable: true },
    { key: 'recepcionExterna', label: 'Recepción externa', filterType: 'text', isEditable: true },
    { key: 'ultimaFechaRecepcion', label: 'Última fecha de recepción', filterType: 'date', isEditable: true },
    { key: 'estatusRecepcion', label: 'Estatus de recepcion', filterType: 'select', options: estatusRecepcionOptions, isEditable: true },
    { key: 'tipo', label: 'Tipo', filterType: 'select', options: tipoOptions, isEditable: true },
    { key: 'fechaCierre', label: 'Fecha de cierre', filterType: 'date', isEditable: true },
    { key: 'estatusTransporte', label: 'Estatus de transp', filterType: 'select', options: estatusTransporteOptions, isEditable: true },
    { key: 'codTransporte', label: 'Cód. transp.', filterType: 'text', isEditable: true },
    { key: 'creadoPor', label: 'Creado por', filterType: 'text', isEditable: false },
    { key: 'actualizadoPor', label: 'Actualizado por', filterType: 'text', isEditable: false },
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

const AsnRecepcion: React.FC = () => {
    const [data, setData] = useState<AsnRecepcionType[]>(mockAsnData);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<Partial<AsnRecepcionType> | null>(null);

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
        setData(prev => prev.map(d => d.id === editingRowId ? { ...d, ...editedData } as AsnRecepcionType : d));
        setEditingRowId(null);
        setEditedData(null);
        alert('Cambios guardados con éxito.');
      }
    };

    const handleEdit = (detail: AsnRecepcionType) => {
        if(editingRowId && editingRowId !== detail.id) {
            handleSave();
        }
        setEditingRowId(detail.id);
        setEditedData({ ...detail });
    };
    
    const handleEditChange = (field: keyof AsnRecepcionType, value: any) => {
        if (editedData) {
            setEditedData({ ...editedData, [field]: value });
        }
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
    
    const handleSelectRow = (id: string) => {
        const newSelection = new Set(selectedRows);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedRows(newSelection);
    };

    const filteredData = useMemo(() => {
        return data.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true;
                const itemValue = item[key as keyof AsnRecepcionType];
                if (itemValue === null || itemValue === undefined) return false;
                // FIX: Ensure itemValue is a string before calling toLowerCase for type safety and to prevent errors.
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
    }, [sortedData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const isAllSelectedOnPage = paginatedData.length > 0 && paginatedData.every(o => selectedRows.has(o.id));

  return (
    <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-4 h-full">
        <div className="flex flex-wrap items-center gap-2">
            <ActionButton icon={<ArrowDownIcon className="w-4 h-4" />}>ENTRADA</ActionButton>
            <ActionButton icon={<PlusIcon className="w-4 h-4" />} primary>NUEVO</ActionButton>
            <ActionButton icon={<SaveIcon className="w-4 h-4" />} onClick={handleSave}>GUARDAR</ActionButton>
            <ActionButton icon={<Trash2Icon className="w-4 h-4" />}>ELIMINAR</ActionButton>
            <ActionButton icon={<RefreshCwIcon className="w-4 h-4" />}>ACTUALIZAR</ActionButton>
            <ActionButton icon={<ChevronDownIcon className="w-4 h-4" />}>ACCIONES</ActionButton>
            <ActionButton icon={<ChevronDownIcon className="w-4 h-4" />}>INFORMES</ActionButton>
            <ActionButton icon={<ArchiveIcon className="w-4 h-4" />}>REGISTROS ELIMINADOS</ActionButton>
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
                <ActionButton icon={<DownloadIcon className="w-4 h-4" />}>EXPORTAR</ActionButton>
                <ActionButton icon={<UploadCloudIcon className="w-4 h-4" />}>IMPORTAR</ActionButton>
                <button className="p-1.5"><HelpCircleIcon className="w-5 h-5 text-gray-400" /></button>
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
                                {col.filterType === 'text' && <input type="text" onChange={e => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1" />}
                                {col.filterType === 'date' && (
                                    <div className="relative"><input type="date" onChange={e => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1 pr-7" /><CalendarIcon className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /></div>
                                )}
                                {col.filterType === 'select' && (
                                    <select onChange={e => handleFilterChange(col.key, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1">
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
                    {paginatedData.map((item) => {
                        const isEditing = editingRowId === item.id;
                        return (
                            <tr key={item.id} className={`${isEditing ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                <td className="px-4 py-2"><input type="checkbox" checked={selectedRows.has(item.id)} onChange={() => handleSelectRow(item.id)} className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-blue-600 focus:ring-blue-500"/></td>
                                <td className="px-4 py-2"><button onClick={() => handleEdit(item)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><PencilIcon className="w-4 h-4"/></button></td>
                                {columns.map(col => (
                                    <td key={col.key} className="px-4 py-2 whitespace-nowrap text-base">
                                        {isEditing && col.isEditable ? (
                                            col.filterType === 'date' ? (
                                                <input type="date" value={editedData?.[col.key as keyof AsnRecepcionType] as string || ''} onChange={e => handleEditChange(col.key as keyof AsnRecepcionType, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1"/>
                                            ) : col.filterType === 'select' ? (
                                                <select value={editedData?.[col.key as keyof AsnRecepcionType] as string || ''} onChange={e => handleEditChange(col.key as keyof AsnRecepcionType, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1">
                                                    {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            ) : (
                                                <input type="text" value={editedData?.[col.key as keyof AsnRecepcionType] as string || ''} onChange={e => handleEditChange(col.key as keyof AsnRecepcionType, e.target.value)} className="w-full text-sm border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1"/>
                                            )
                                        ) : col.key === 'estatusRecepcion' ? (
                                            <span className={`px-2 py-0.5 inline-flex text-sm leading-5 font-semibold rounded-full ${estatusRecepcionStyles[item.estatusRecepcion]}`}>{item.estatusRecepcion}</span>
                                        ) : col.key === 'estatusTransporte' ? (
                                            <span className={`px-2 py-0.5 inline-flex text-sm leading-5 font-semibold rounded-full ${estatusTransporteStyles[item.estatusTransporte]}`}>{item.estatusTransporte}</span>
                                        ) : (
                                            <span className="text-gray-800 dark:text-gray-200">{item[col.key as keyof AsnRecepcionType]}</span>
                                        )}
                                    </td>
                                ))}
                                <td className="px-4 py-2 whitespace-nowrap text-center"><button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"><MoreVerticalIcon className="w-4 h-4" /></button></td>
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

export default AsnRecepcion;