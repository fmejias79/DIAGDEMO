import React, { useState, useCallback } from 'react';
import { RefreshCwIcon, CalendarIcon } from '../../constants';

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

const chartTypes = [
    "-----",
    "Gráfico de barras",
    "Gráfico de líneas",
    "Gráfico de pastel/circular",
    "Gráfico de área",
    "Gráfico de barras apiladas",
    "Histograma",
];

// A placeholder component to visually represent a chart
const ChartPlaceholder: React.FC<{ type: string; data: any; noDataMessage: string }> = ({ type, data, noDataMessage }) => {
    if (!type || type === '-----') {
      return (
        <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4">
           <p className="text-gray-500 dark:text-gray-400 text-center">Seleccione un tipo de gráfico y presione "Actualizar".</p>
        </div>
      );
    }
    if (!data) {
        return (
            <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4">
               <p className="text-gray-500 dark:text-gray-400 text-center">{noDataMessage}</p>
            </div>
        )
    }
    return (
       <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg h-full min-h-[300px] w-full">
          <h3 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">{type}</h3>
          <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900/50 p-2 rounded">
             <p className="text-gray-500 dark:text-gray-400">[Visualización del gráfico aquí]</p>
          </div>
       </div>
    );
};

const GraficosSalida: React.FC = () => {
    const defaultDate = new Date().toISOString().split('T')[0];
    
    const [filters1, setFilters1] = useState({ type: '', endDate: defaultDate, days: 1 });
    const [filters2, setFilters2] = useState({ type: '', endDate: defaultDate, days: 1 });
    
    const [chartData1, setChartData1] = useState<any | null>(null);
    const [chartData2, setChartData2] = useState<any | null>(null);
    
    const [showInitialMessage, setShowInitialMessage] = useState(true);

    const handleFilterChange = (panel: 'panel1' | 'panel2', field: string, value: string | number) => {
        const setter = panel === 'panel1' ? setFilters1 : setFilters2;
        setter(prev => ({ ...prev, [field]: value }));
    };

    const handleUpdate = useCallback(() => {
        setShowInitialMessage(false);
        // In a real app, you would fetch data here based on filters.
        // We'll simulate by setting chart data to null to trigger the "no data" message if a chart type is selected.
        if (filters1.type && filters1.type !== '-----') {
            setChartData1(null);
        } else {
            setChartData1(null); // Reset if no type is selected
        }

        if (filters2.type && filters2.type !== '-----') {
            setChartData2(null);
        } else {
            setChartData2(null); // Reset if no type is selected
        }
    }, [filters1, filters2]);

  return (
    <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-6 h-full">
      {/* Top Action Bar */}
      <div>
         <ActionButton icon={<RefreshCwIcon className="w-4 h-4" />} onClick={handleUpdate} primary>
           ACTUALIZAR
         </ActionButton>
      </div>

      {/* Controls Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-t border-b py-6 border-gray-200 dark:border-gray-700">
         {/* Left Column */}
         <div className="flex flex-col gap-4">
           <div>
             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de gráfico:</label>
             <select value={filters1.type} onChange={e => handleFilterChange('panel1', 'type', e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5">
               {chartTypes.map(type => <option key={`p1-${type}`} value={type === '-----' ? '' : type}>{type}</option>)}
             </select>
           </div>
           <div>
             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Última fecha que incluir:</label>
             <div className="relative">
               <input type="date" value={filters1.endDate} onChange={e => handleFilterChange('panel1', 'endDate', e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5 pr-8" />
               <CalendarIcon className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
             </div>
           </div>
           <div>
             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Número de días que incluir:</label>
             <input type="number" value={filters1.days} onChange={e => handleFilterChange('panel1', 'days', parseInt(e.target.value, 10) || 1)} min="1" className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5" />
           </div>
         </div>

         {/* Right Column */}
         <div className="flex flex-col gap-4">
           <div>
             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de gráfico:</label>
             <select value={filters2.type} onChange={e => handleFilterChange('panel2', 'type', e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5">
                {chartTypes.map(type => <option key={`p2-${type}`} value={type === '-----' ? '' : type}>{type}</option>)}
             </select>
           </div>
           <div>
             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Última fecha que incluir:</label>
             <div className="relative">
               <input type="date" value={filters2.endDate} onChange={e => handleFilterChange('panel2', 'endDate', e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5 pr-8" />
               <CalendarIcon className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
             </div>
           </div>
           <div>
             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Número de días que incluir:</label>
             <input type="number" value={filters2.days} onChange={e => handleFilterChange('panel2', 'days', parseInt(e.target.value, 10) || 1)} min="1" className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5" />
           </div>
         </div>
      </div>

      {/* Chart Display Area */}
      <div className="flex-1 overflow-auto">
        { showInitialMessage ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-lg min-h-[300px]">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Presione ACTUALIZAR para cargar datos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartPlaceholder type={filters1.type} data={chartData1} noDataMessage="No se encontraron datos de la orden de expedición" />
            <ChartPlaceholder type={filters2.type} data={chartData2} noDataMessage="No existen datos de líneas de órdenes" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GraficosSalida;
