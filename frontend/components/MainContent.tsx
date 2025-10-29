import React from 'react';
import PurchaseOrder from './PurchaseOrder';
import PurchaseOrderDetail from './PurchaseOrderDetail';
import AsnRecepcion from './AsnRecepcion';

interface MainContentProps {
  activePath: string | null;
}

const MainContent: React.FC<MainContentProps> = ({ activePath }) => {

  const renderContent = () => {
    switch (activePath) {
      case '/wms/entrada/oc':
        return <PurchaseOrder />;
      case '/wms/entrada/detalle-oc':
        return <PurchaseOrderDetail />;
      case '/wms/entrada/asn':
        return <AsnRecepcion />;
      default:
        return (
          <div className="rounded-xl border shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 sm:p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Contenido principal</h2>
            <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
              Selecciona una opción del menú para ver el contenido correspondiente.
            </p>
            <div className="grid gap-4 mt-6 sm:grid-cols-2">
              <div className="p-5 rounded-lg border bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700">
                <h3 className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">Estadísticas</h3>
                <p className="m-0 text-sm text-gray-500 dark:text-gray-400">Información relevante sobre contenido principal</p>
              </div>
              <div className="p-5 rounded-lg border bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700">
                <h3 className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">Acciones rápidas</h3>
                <p className="m-0 text-sm text-gray-500 dark:text-gray-400">Acciones disponibles para esta sección</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 p-4 sm:p-6 overflow-auto bg-gray-50 dark:bg-gray-900 custom-scrollbar">
      {renderContent()}
    </main>
  );
};

export default MainContent;