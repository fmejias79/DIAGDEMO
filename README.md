# GIAD Warehouse Management System (WMS) Dashboard

## 1. Overview

This project is a modern, responsive dashboard for a Warehouse Management System (WMS) named GIAD. It's built using React, TypeScript, and Tailwind CSS, focusing on a clean, intuitive, and highly functional user interface for complex warehouse operations. The application features a modular design, a comprehensive set of UI components, and a themeable (light/dark) interface.

## 2. Key Features

-   **Responsive Design**: Adapts seamlessly to various screen sizes, from mobile devices to large desktop monitors.
-   **Light/Dark Mode**: User-selectable theme to suit different lighting conditions and user preferences.
-   **Collapsible Sidebar**: A feature-rich, multi-level navigation menu that is searchable and collapsible to maximize content visibility.
-   **Dynamic Content Area**: The main section of the app that renders different WMS modules based on user navigation.
-   **Interactive Data Tables**: All data-heavy screens feature tables with advanced functionalities like per-column filtering, sorting, pagination, row selection, and inline editing.
-   **Modular Component Architecture**: Built with reusable React components for consistency and maintainability.
-   **Type Safety**: Leverages TypeScript for robust and error-free code.
-   **Modern UI/UX**: Aesthetically pleasing design with custom-styled scrollbars and smooth transitions for an enhanced user experience.

## 3. Getting Started

### Prerequisites

You need a local web server to run this project. If you have Node.js installed, you can use the `serve` package.

### Installation & Running

The project is designed to run directly in the browser without a complex build setup, thanks to `importmap` for dependency management.

1.  **Clone or download the project files.**

2.  **Navigate to the project's root directory** in your terminal.

3.  **Start a local web server.** A simple way is to use the `serve` package:
    ```bash
    # Install serve globally if you haven't already
    yarn install

    # Run the server
    yarn dev
    ```
    Alternatively, if you have Python 3, you can use its built-in server:
    ```bash
    python -m http.server
    ```

4.  **Open your web browser** and navigate to the local address provided by the server (e.g., `http://localhost:3000` or `http://localhost:8000`).