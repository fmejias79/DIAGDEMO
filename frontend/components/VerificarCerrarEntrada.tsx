import React, { useState } from 'react';
import { MenuIcon, PencilIcon, SearchIcon, CalendarIcon, MoreVerticalIcon } from '../constants';

const VerificarCerrarEntrada: React.FC = () => {
    const [filters, setFilters] = useState({
        propietario: '',
        numeroDocumento: '',
        tipo: '-----',
        fechaRegistro: '',
        fechaCierre: ''
    });

    const handleFilterChange = (field: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-4">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verificar y cerrar OC/ASN</h2>
                 <div className="flex items-center gap-4">
                     <button className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <MenuIcon className="w-5 h-5" />
                     </button>
                     <button className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <PencilIcon className="w-5 h-5" />
                     </button>
                 </div>
            </div>

            {/* Filters Panel */}
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-[1fr,1fr,1fr,1fr,1fr,auto] items-end gap-4">
                    {/* Propietario */}
                    <div className="flex flex-col">
                        <label htmlFor="propietario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Propietario</label>
                        <div className="relative">
                           <SearchIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                           <input
                                type="text"
                                id="propietario"
                                value={filters.propietario}
                                onChange={(e) => handleFilterChange('propietario', e.target.value)}
                                className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5 pl-8"
                            />
                        </div>
                    </div>

                    {/* Número documento */}
                    <div className="flex flex-col">
                        <label htmlFor="numeroDocumento" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número documento</label>
                        <input
                            type="text"
                            id="numeroDocumento"
                            value={filters.numeroDocumento}
                            onChange={(e) => handleFilterChange('numeroDocumento', e.target.value)}
                            className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5"
                        />
                    </div>

                    {/* Tipo */}
                    <div className="flex flex-col">
                        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo</label>
                        <select
                            id="tipo"
                            value={filters.tipo}
                            onChange={(e) => handleFilterChange('tipo', e.target.value)}
                            className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5"
                        >
                            <option>-----</option>
                            <option>Orden de Compra</option>
                            <option>ASN</option>
                        </select>
                    </div>

                    {/* Fecha de registro */}
                    <div className="flex flex-col">
                        <label htmlFor="fechaRegistro" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de registro</label>
                        <div className="relative">
                            <input
                                type="date"
                                id="fechaRegistro"
                                value={filters.fechaRegistro}
                                onChange={(e) => handleFilterChange('fechaRegistro', e.target.value)}
                                className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5 pr-8"
                            />
                             <CalendarIcon className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Fecha de cierre */}
                    <div className="flex flex-col">
                        <label htmlFor="fechaCierre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de cierre</label>
                        <div className="relative">
                            <input
                                type="date"
                                id="fechaCierre"
                                value={filters.fechaCierre}
                                onChange={(e) => handleFilterChange('fechaCierre', e.target.value)}
                                className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5 pr-8"
                            />
                            <CalendarIcon className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    
                    {/* Actions Menu */}
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

export default VerificarCerrarEntrada;
