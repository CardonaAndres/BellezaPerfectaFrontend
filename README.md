# Belleza Perfecta - Frontend

**Belleza Perfecta** es el sistema administrativo para la gestión integral de la empresa del mismo nombre. Este repositorio contiene el **frontend** del sistema, desarrollado con **React + Vite**, **TypeScript** y **Tailwind CSS**. Se conecta con un backend en nestJS disponible [aquí](https://github.com/CardonaAndres/BellezaPerfectaServer).

## 🚀 Tecnologías principales

- ⚛️ React
- ⚡ Vite
- 🧠 TypeScript
- 🎨 Tailwind CSS

## 🎯 Funcionalidades del sistema

- 📄 **Facturación interna** con numeración secuencial automática.
- 🧾 **Generación de facturas** con productos, cantidades, precios y notas personalizadas.
- 🧍 **Asociación de facturas** a clientes registrados y usuarios emisores.
- 📂 **Descarga de facturas en PDF** con los datos comerciales de la empresa.
- 📦 **Control de inventario** automatizado y centralizado (resta de stock al facturar).
- 👥 **Gestión de clientes**: creación, edición y eliminación.
- 👨‍💼 **Gestión de usuarios** con roles: administrador y vendedor.
- 🔒 **Autenticación segura** mediante JWT y protección de rutas privadas.
- 📈 **Reportes dinámicos** filtrables por cliente, fecha, producto o usuario.
- 📤 **Exportación de reportes** en formatos PDF y Excel.
- 🕵️ **Registro de actividades**: historial de acciones por usuario.

## 🛠️ Instalación y ejecución local

1. **Clona este repositorio:**

```bash
git clone https://github.com/CardonaAndres/BellezaPerfectaFrontend.git
cd BellezaPerfectaFrontend
````

2. **Instala las dependencias:**

```bash
npm install
```

> Asegúrate de que la URL coincida con la del backend: [BellezaPerfectaServer](https://github.com/CardonaAndres/BellezaPerfectaServer)

4. **Ejecuta el proyecto:**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.


## ✅ TODOs y mejoras futuras

* [ ] Integración con notificaciones (toast)
* [ ] Control de stock más granular por local
* [ ] Sistema de auditoría visual de acciones

## 📦 Backend relacionado

🔗 Repositorio del backend: [BellezaPerfectaServer](https://github.com/CardonaAndres/BellezaPerfectaServer)

