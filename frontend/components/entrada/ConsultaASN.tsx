import React, { useState } from 'react';
import { MenuIcon, PencilIcon, SearchIcon, XIcon } from '../../constants';

const ActionButton: React.FC<{ icon: React.ReactNode, [key: string]: any }> = ({ icon, children, ...props }) => (
  <button
    className={`px-3 py-1.5 text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-1.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600`}
    {...props}
  >
    {icon}
    {children}
  </button>
);

const ConsultaASN: React.FC = () => {
    const [articulo, setArticulo] = useState('');
    const [rma, setRma] = useState('');
    const [results, setResults] = useState<any[] | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = () => {
        setSearched(true);
        if (articulo.trim() || rma.trim()) {
            // NOTE: In a real application, you would fetch data from an API here.
            // For demonstration, we'll return an empty array to show the "no results" message.
            setResults([]); 
        } else {
            // If both fields are empty, don't show "no results", just reset.
            setResults(null);
            setSearched(false);
        }
    };

    const handleClear = () => {
        setArticulo('');
        setRma('');
        setResults(null);
        setSearched(false);
    };

    return (
        <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-6 h-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Consulta de ASN</h2>

            {/* Search Panel */}
            <div className="border-y border-gray-200 dark:border-gray-700 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {/* Left Column */}
                    <div>
                        <label htmlFor="articulo" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Artículo</label>
                        <input
                            type="text"
                            id="articulo"
                            value={articulo}
                            onChange={(e) => setArticulo(e.target.value)}
                            className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5"
                        />
                    </div>

                    {/* Right Column */}
                    <div>
                        <label htmlFor="rma" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">RMA</label>
                        <input
                            type="text"
                            id="rma"
                            value={rma}
                            onChange={(e) => setRma(e.target.value)}
                            className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                    <ActionButton icon={<SearchIcon className="w-4 h-4" />} onClick={handleSearch}>Buscar</ActionButton>
                    <ActionButton icon={<XIcon className="w-4 h-4" />} onClick={handleClear}>Limpiar</ActionButton>
                </div>
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-auto">
                {searched && results?.length === 0 && (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-lg min-h-[200px]">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No se encontraron ASN con los criterios especificados.</p>
                    </div>
                )}
                 {searched && results && results.length > 0 && (
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Resultados de la búsqueda:</p>
                        {/* A results table or list would be rendered here */}
                    </div>
                 )}
                 {!searched && (
                     <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-lg min-h-[200px]">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Ingrese criterios de búsqueda para ver los resultados.</p>
                    </div>
                 )}
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">
                 <div className="flex items-center gap-4">
                     <button className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <MenuIcon className="w-5 h-5" />
                     </button>
                     <button className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <PencilIcon className="w-5 h-5" />
                     </button>
                 </div>
            </div>
        </div>
    );
};

export default ConsultaASN;