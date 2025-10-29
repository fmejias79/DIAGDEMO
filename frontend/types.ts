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
