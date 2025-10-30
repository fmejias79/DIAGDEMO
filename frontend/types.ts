import type { ReactNode } from 'react';

export interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  subItems?: MenuItem[];
}

export interface PurchaseOrder {
  id: string; // Unique ID for keys
  ordenCompra: string;
  compradorPropietario: string;
  estatus: 'Pendiente' | 'Recibido Parcialmente' | 'Completado' | 'Cancelado' | 'Nuevo';
  tipo: 'Estándar' | 'Urgente' | 'Devolución';
  fechaOrdenCompra: string; // YYYY-MM-DD
  fechaRecepcionEsperada: string; // YYYY-MM-DD
  proveedor: string;
  nOCExterna: string;
  referenciaProveedor: string;
  cantidadPendiente: number;
}

export interface PurchaseOrderDetail {
  id: string; // Unique ID for keys
  ordenCompra: string;
  compradorPropietario: string;
  linea: number;
  articulo: string;
  descripcion: string;
  paquete: string;
  udm: string;
  estatus: 'Abierto' | 'Cerrado' | 'Cancelado';
  cantidadPedida: number;
  cantidadRecibida: number;
}

export interface AsnRecepcion {
  id: string;
  asnRecepcion: string;
  propietario: string;
  referenciaAlmacen: string;
  fechaRecepcionEsperada: string; // YYYY-MM-DD
  recepcionExterna: string;
  ultimaFechaRecepcion: string; // YYYY-MM-DD
  estatusRecepcion: 'Abierto' | 'Cerrado' | 'Parcialmente Recibido';
  tipo: 'Estándar' | 'Urgente' | 'Devolución';
  fechaCierre: string; // YYYY-MM-DD
  estatusTransporte: 'En Tránsito' | 'Entregado' | 'Retrasado';
  codTransporte: string;
  creadoPor: string;
  actualizadoPor: string;
}

export interface AsnRecepcionDetail {
  id: string;
  asnRecepcion: string;
  linea: number;
  propietario: string;
  articulo: string;
  descripcion: string;
  paquete: string;
  udm: string;
  codigoBloqueo: 'Ninguno' | 'Calidad' | 'Retenido';
  lpn: string;
  ubicacion: string;
  ordenCompra: string;
  eStatus: 'Activo' | 'Inactivo' | 'Pendiente';
  cantidadEsperada: number;
  cantidadRecibida: number;
}

export interface OrdenExpedicion {
  id: string;
  numeroOrden: string;
  propietario: string;
  ordenExterna1: string;
  tipo: 'Urgente' | 'Normal' | 'Programada' | 'Express';
  nombreReceptor: string;
  estatus: 'Creada' | 'En Preparación' | 'Lista' | 'Expedida' | 'Entregada' | 'Cancelada';
  fechaRealExpedicion: string;
  fechaOrden: string;
  receptor: string;
  ruta: string;
  numeroPack: number;
  ubicacion: string;
  actualizadoPor: string;
}

export interface DetallesExpedicion {
  id: string;
  numeroOrden: string;
  numeroLinea: number;
  prioridad: 'A' | 'M' | 'B';
  articulo: string;
  descripcion: string;
  cantidadPendiente: number;
  cantidadOrden: number;
  cantidadPreparada: number;
  asignado: 'Sí' | 'No' | 'Parcial';
  preparado: 'Sí' | 'No' | 'Parcial';
  estatus: 'Pendiente' | 'Asignado' | 'En Picking' | 'Preparado' | 'Expedido';
  ordenExterna1: string;
  fechaCreacion: string;
  estrategiaAsignacion: 'FIFO' | 'LIFO' | 'Por Ubicación' | 'Por Lote';
}

export interface DetallesPreparacion {
  id: string;
  numeroOrden: number;
  numeroLinea: number;
  idEstuche: string;
  lote: string;
  ubicacion: string;
  lpn: string;
  propietario: string;
  articulo: string;
  cantidad: number;
  estatus: 'Pendiente' | 'En Proceso' | 'Preparado' | 'Verificado' | 'Completado';
  idDeposito: string;
  oleada: string;
  numeroAsignacion: number;
  fechaCreacion: string; // YYYY-MM-DD
  fechaEdicion: string; // YYYY-MM-DD
}

export interface AsignacionDemanda {
  id: string;
  propietario: string;
  articulo: string;
  numeroOrden: number;
  numeroLinea: number;
  udm: 'UN' | 'KG' | 'LT' | 'M' | 'CJ';
  cantidadAsignada: number;
  preparacionEnCurso: number;
  idContenedor: string;
  grupoEnvases: string;
  tipoEnvase: string;
  ubicacionProduccionZonaEspera: string;
}

export interface TransferenciaInstalacion {
    id: string;
    propietario: string;
    numeroOrdenTransferencia: number;
    estatus: 'Pendiente' | 'En Proceso' | 'Completada' | 'Cancelada';
    numeroReferencia: string;
    numeroRecepcion: number;
    fechaExpedicionSolicitada: string; // YYYY-MM-DD
}