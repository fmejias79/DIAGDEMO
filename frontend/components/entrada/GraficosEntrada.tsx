import React, { useState, useCallback } from 'react';
import { RefreshCwIcon, CalendarIcon, PencilIcon } from '../../constants';

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

const GraficosEntrada: React.FC = () => {
  const [chartType1, setChartType1] = useState('');
  const [chartType2, setChartType2] = useState('');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [numDays, setNumDays] = useState(1);
  const [includeClosed, setIncludeClosed] = useState(false);
  const [chartData, setChartData] = useState<any | null>(null);
  const [showNoDataMessage, setShowNoDataMessage] = useState(true);

  const handleUpdate = useCallback(() => {
    // In a real app, you would fetch and process data here based on the filters.
    // For now, we'll show chart placeholders if any chart type is selected.
    if (chartType1 && chartType1 !== '-----' || chartType2 && chartType2 !== '-----') {
        setShowNoDataMessage(false);
        // Set an empty structure for the chart placeholder, data would be fetched from an API.
        setChartData({
            labels: [],
            datasets: [{
                label: 'Recepciones',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        });
    } else {
        setShowNoDataMessage(true);
        setChartData(null);
    }
  }, [chartType1, chartType2]);

  // A placeholder component to visually represent a chart without a real charting library
  const ChartPlaceholder: React.FC<{ type: string; data: any }> = ({ type, data }) => {
    if (!type || type === '-----' || !data) {
      return (
        <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4">
           <p className="text-gray-500 dark:text-gray-400 text-center">Seleccione un tipo de gráfico y presione "Actualizar".</p>
        </div>
      );
    }
    return (
       <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg h-full min-h-[300px] w-full">
          <h3 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">{type}</h3>
          <div className="flex items-end justify-around h-64 bg-gray-50 dark:bg-gray-900/50 p-2 rounded items-center">
            {data.datasets[0].data.length > 0 ? (
                data.datasets[0].data.map((val: number, index: number) => (
              <div key={index} className="flex flex-col items-center justify-end w-1/5 h-full">
                 <div title={`${data.labels[index]}: ${val}`} className="w-full bg-blue-500 hover:bg-blue-400 transition-colors" style={{ height: `${val * 10}px` }}></div>
                 <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">{data.labels[index]}</span>
              </div>
            ))
            ) : (
                <p className="text-gray-500 dark:text-gray-400">Sin datos para mostrar en el gráfico.</p>
            )}
          </div>
       </div>
    );
  };
  
  return (
    <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-6 h-full">
      {/* Top Action Bar */}
      <div>
         <ActionButton icon={<RefreshCwIcon className="w-4 h-4" />} onClick={handleUpdate}>
           ACTUALIZAR
         </ActionButton>
      </div>

      {/* Controls Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 border-t border-b py-6 border-gray-200 dark:border-gray-700">
         {/* Left Section */}
         <div className="flex flex-col gap-4">
           <div>
             <label htmlFor="chartType1" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de gráfico:</label>
             <select id="chartType1" value={chartType1} onChange={e => setChartType1(e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5">
               {chartTypes.map(type => <option key={type} value={type === '-----' ? '' : type}>{type}</option>)}
             </select>
           </div>
           <div>
             <label htmlFor="endDate" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Última fecha recepción prevista que incluir:</label>
             <div className="relative">
               <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5 pr-8" />
               <CalendarIcon className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
             </div>
           </div>
           <div>
             <label htmlFor="numDays" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Número de días que incluir:</label>
             <input type="number" id="numDays" value={numDays} onChange={e => setNumDays(parseInt(e.target.value, 10) || 1)} min="1" className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5" />
           </div>
         </div>

         {/* Right Section */}
         <div className="flex flex-col gap-4">
           <div>
             <label htmlFor="chartType2" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de gráfico:</label>
             <select id="chartType2" value={chartType2} onChange={e => setChartType2(e.target.value)} className="w-full text-base border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5">
               {chartTypes.map(type => <option key={type} value={type === '-----' ? '' : type}>{type}</option>)}
             </select>
           </div>
           <div>
             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
               ¿Incluir estatus Cerrado?
             </label>
             <div className="flex items-center gap-2 mt-2">
                 <input 
                     type="checkbox" 
                     id="includeClosed"
                     checked={includeClosed}
                     onChange={e => setIncludeClosed(e.target.checked)}
                     className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-blue-600 focus:ring-blue-500" 
                 />
                 <PencilIcon className="w-4 h-4 text-gray-400" />
             </div>
           </div>
         </div>
      </div>

      {/* Chart Display Area */}
      <div className="flex-1 overflow-auto">
        { showNoDataMessage ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700/50 rounded-lg min-h-[300px]">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No se encontraron datos de ASN/Recepción</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartPlaceholder type={chartType1} data={chartData} />
            <ChartPlaceholder type={chartType2} data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GraficosEntrada;