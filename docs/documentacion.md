-   **`index.html`**: The main HTML file and entry point. It includes the `importmap` for dependencies and Tailwind CSS configuration.
-   **`index.tsx`**: The entry point for the React application, where the `App` component is rendered into the DOM.
-   **`App.tsx`**: The root component that manages the overall layout, theme state (light/dark), and sidebar visibility.
-   **`components/`**: Contains all the React components.
-   **`constants.tsx`**: Defines SVG icons as React components and the `MENU_ITEMS` constant that builds the sidebar navigation structure.
-   **`types.ts`**: Contains all TypeScript type definitions and interfaces for the application's data models (e.g., `PurchaseOrder`, `OrdenExpedicion`).
-   **`metadata.json`**: Provides metadata about the application.

## Component Documentation

### Layout Components

-   **`Header.tsx`**: The top navigation bar. It includes the sidebar toggle, company logo, a global search bar, theme switcher, and user profile information.
-   **`Sidebar.tsx`**: The main navigation component on the left. It features a searchable, multi-level, collapsible menu system.
-   **`MainContent.tsx`**: A router-like component that dynamically renders the appropriate screen component based on the `activePath` state, which is controlled by the sidebar.

### WMS Module Components

#### Entrada (Receiving)

-   **`PurchaseOrder.tsx`**: Displays a list of purchase orders with comprehensive controls for filtering, sorting, pagination, and performing actions like creating, saving, or deleting orders.
-   **`PurchaseOrderDetail.tsx`**: Provides a line-item view of a purchase order. Features inline editing for quick modifications to order details.
-   **`AsnRecepcion.tsx`**: Manages Advanced Shipping Notices (ASNs). It includes inline editing, status badges, and a dropdown menu for advanced actions.
-   **`AsnRecepcionDetail.tsx`**: Shows the line-item details for an ASN, allowing for detailed management of expected and received quantities.
-   **`GraficosEntrada.tsx`**: A visual dashboard screen where users can select different chart types to visualize receiving data over specified periods.
-   **`ConsultaASN.tsx`**: A dedicated screen for searching for specific ASNs by item or RMA number.
-   **`VerificarCerrarEntrada.tsx`**: A UI to search for and finalize/close purchase orders or ASNs.
-   **`InversionRecepcion.tsx`**: A screen designed to manage the reversal or correction of received goods.
-   **`EntradaCC.tsx`**: A quality control module for incoming items, allowing inspectors to record inspection results, quantities, and dispositions.
-   **`ReglasMuestraCCEntrada.tsx`**: Allows for the configuration of sampling rules for quality control based on various criteria like supplier, item, or frequency.
-   **`RegistroCumplimientoProveedor.tsx`**: A log for tracking and recording supplier compliance based on predefined questions and categories.

#### Salida (Shipping)

-   **`OrdenExpedicion.tsx`**: Manages outgoing shipping orders. It features a detailed data grid with filtering, sorting, pagination, and status indicators.
-   **`DetallesExpedicion.tsx`**: The line-item detail screen for a shipping order. It provides granular control over each item being shipped, with inline editing, colored status badges, and per-column filters.