import React, { useState } from 'react';
import { 
    PlusIcon, SaveIcon, ChevronsLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsRightIcon, 
    RefreshCwIcon, DownloadIcon, HelpCircleIcon, MinusIcon, MenuIcon, PencilIcon, MoreVerticalIcon, CalendarIcon
} from '../../constants';

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

const InversionRecepcion: React.FC = () => {
    const [filters, setFilters] = useState({
        propietario: '',
        numeroAjuste: '',
        numeroAsn: '',
        fechaVigor: ''
    });

    const handleFilterChange = (field: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-6 h-full">
            {/* Top Action Bar */}
            <div className="flex items-center gap-2">
                <ActionButton icon={<PlusIcon className="w-4 h-4" />} primary>NUEVO</ActionButton>
                <ActionButton icon={<SaveIcon className="w-4 h-4" />}>GUARDAR</ActionButton>
            </div>

            {/* Navigation and Controls */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-b py-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1">
                    <button disabled className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronsLeftIcon className="w-4 h-4" /></button>
                    <button disabled className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronLeftIcon className="w-4 h-4" /></button>
                    <button disabled className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronRightIcon className="w-4 h-4" /></button>
                    <button disabled className="p-1.5 disabled:opacity-50 text-gray-600 dark:text-gray-300"><ChevronsRightIcon className="w-4 h-4" /></button>
                    <button className="p-1.5 ml-2 text-gray-600 dark:text-gray-300"><RefreshCwIcon className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-2">
                    <ActionButton icon={<DownloadIcon className="w-4 h-4" />}>EXPORTAR A EXCEL</ActionButton>
                    <button className="p-1.5"><HelpCircleIcon className="w-5 h-5 text-gray-400" /></button>
                    <button className="p-1.5 text-gray-600 dark:text-gray-300"><MinusIcon className="w-4 h-4" /></button>
                </div>
            </div>
            
            {/* Filters Panel */}
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-end gap-4">
                    <div className="flex items-center gap-2">
                         <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md">
                            <MenuIcon className="w-5 h-5" />
                         </button>
                         <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md">
                            <PencilIcon className="w-5 h-5" />
                         </button>
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                         {/* Propietario */}
                        <div>
                            <label htmlFor="propietario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Propietario</label>
                            <input
                                type="text"
                                id="propietario"
                                value={filters.propietario}
                                onChange={(e) => handleFilterChange('propietario', e.target.value)}
                                className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5"
                            />
                        </div>

                        {/* Número ajuste */}
                        <div>
                            <label htmlFor="numeroAjuste" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número ajuste</label>
                            <input
                                type="text"
                                id="numeroAjuste"
                                value={filters.numeroAjuste}
                                onChange={(e) => handleFilterChange('numeroAjuste', e.target.value)}
                                className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5"
                            />
                        </div>

                        {/* Número de ASN */}
                        <div>
                            <label htmlFor="numeroAsn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número de ASN</label>
                            <input
                                type="text"
                                id="numeroAsn"
                                value={filters.numeroAsn}
                                onChange={(e) => handleFilterChange('numeroAsn', e.target.value)}
                                className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5"
                            />
                        </div>

                        {/* Fecha de entrada vigor */}
                        <div>
                            <label htmlFor="fechaVigor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de entrada vigor</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    id="fechaVigor"
                                    value={filters.fechaVigor}
                                    onChange={(e) => handleFilterChange('fechaVigor', e.target.value)}
                                    className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5 pr-8"
                                />
                                <CalendarIcon className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                     <div className="flex items-center justify-center">
                         <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md">
                            <MoreVerticalIcon className="w-5 h-5" />
                         </button>
                    </div>
                </div>
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-auto">
                <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg min-h-[200px]">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Utilice los filtros para buscar documentos.</p>
                </div>
            </div>
        </div>
    );
};

export default InversionRecepcion;