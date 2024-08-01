# My Car API

## Descripción
API REST para un sistema de autos y marcas.

## Características Principales

### Gestión de Marcas
Permite crear, listar y obtener modelos asociados a una marca.

#### Endpoints
- **GET /api/brands**
  - Lista todas las marcas.
- **POST /api/brands**
  - Crea una nueva marca. El nombre de la marca debe ser único.
- **GET /api/brands/:id/models**
  - Obtiene todos los modelos asociados a una marca específica.
- **POST /api/brands/:id/models**
  - Crea un nuevo modelo asociado a una marca específica. El nombre del modelo debe ser único dentro de la marca.

### Gestión de Modelos
Permite listar, actualizar y filtrar modelos de autos.

#### Endpoints
- **GET /api/models?grater=&lower**
  - Lista todos los modelos.
  - Si los parámetros `greater` y `lower`son incluidos, filtra los modelos por precio promedio en ese rango.
- **PUT /api/models/:id**
  - Actualiza el precio promedio de un modelo. El precio promedio debe ser mayor a 100,000.

## Configuración

### Instalación de Dependencias
npm install

### Ejecutar el Servidor
npm start

### Ejecutar en Modo Desarrollo
npm run dev

### Ejecutar Pruebas
npm test

### Lint del Código
npm run lint

### Lint y Arreglar Código
npm run lint:fix

## Pruebas

### Framework de Pruebas
Jest

### Ejecutar Pruebas Específicas
npm run test:<test-name>

#### Ejemplo
npm run test:brand


## Base de Datos

### Tipo
MySQL

### ORM
Sequelize

## Variables de Entorno

### Variables Necesarias
- **PORT**: El puerto en el que corre la aplicación.
- **DB_HOST**: La dirección del host de la base de datos.
- **DB_USER**: El usuario de la base de datos.
- **DB_PASSWORD**: La contraseña de la base de datos.
- **DB_NAME**: El nombre de la base de datos.