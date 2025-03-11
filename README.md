# PriceSmart API Integration

## Descripción

Este proyecto implementa una integración con la API de PriceSmart para la gestión y consulta de precios y productos. La solución permite automatizar la obtención de información actualizada de productos y precios desde PriceSmart, facilitando la sincronización de datos y la toma de decisiones comerciales.

## Características Principales

- Consulta automatizada de precios de productos
- Integración con la API oficial de PriceSmart
- Sistema de autenticación seguro
- Manejo eficiente de datos y respuestas
- Documentación detallada de endpoints

## Tecnologías Utilizadas

### Backend

- Node.js - Entorno de ejecución
- Express.js - Framework web
- MongoDB - Base de datos NoSQL
- Mongoose - ODM para MongoDB

### Seguridad y Autenticación

- JSON Web Tokens (JWT) - Autenticación y autorización
- bcryptjs - Encriptación de contraseñas

### Herramientas de Desarrollo

- dotenv - Manejo de variables de entorno
- ESM (ECMAScript Modules) - Sistema de módulos moderno

### Versiones Principales

- Node.js: 18.x o superior
- Express: ^4.18.3
- MongoDB: ^6.5.0
- Mongoose: ^8.2.1

## Requisitos Previos

- Node.js (versión recomendada: 18.x o superior)
- Acceso a la API de PriceSmart (credenciales necesarias)
- Variables de entorno configuradas

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/API_PriceSmart.git
cd API_PriceSmart
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PRICESMART_API_KEY=tu_api_key
PRICESMART_API_URL=url_base_api
```

## Uso

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Estructura del Proyecto

```
API_PriceSmart/
├── app.js              # Archivo principal de la aplicación
├── routes/            # Rutas de la API
│   ├── index.js
│   ├── products.js
│   └── users.js
├── controllers/       # Controladores de la aplicación
├── models/           # Modelos de datos
├── schemas/          # Esquemas de validación
├── helpers/          # Funciones auxiliares
├── config/           # Configuraciones
├── node_modules/     # Dependencias
└── .env              # Variables de entorno
```

## Endpoints Principales

### Productos

- `GET /api/products`: Obtiene la lista de productos
- `GET /api/products/:id`: Obtiene un producto específico por ID
- `POST /api/products`: Crea un nuevo producto
- `PUT /api/products/:id`: Actualiza un producto existente
- `DELETE /api/products/:id`: Elimina un producto

### Usuarios

- `GET /api/users`: Obtiene la lista de usuarios
- `POST /api/users`: Crea un nuevo usuario

## Contribución

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Soporte

Para soporte o consultas, por favor abrir un issue en el repositorio de GitHub.

## Estado del Proyecto

🚧 En desarrollo activo
