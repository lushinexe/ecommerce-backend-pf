# 📦 Carrito Backend API

## 🚀 Descripción
API RESTful para la gestión de carritos de compras en una aplicación e‑commerce.  
Incluye autenticación con JWT, autorización por roles (**admin/user**), validación de datos, documentación con Swagger y conexión a MongoDB.  
Proyecto desarrollado como parte de **Backend 3**.

## 🛠️ Tecnologías
- ⚡ Node.js + Express  
- 🗄️ MongoDB + Mongoose  
- 🔐 Passport JWT  
- ✅ Express Validator  
- 📖 Swagger/OpenAPI  
- 🐳 Docker Compose  

---

## 🔑 Autenticación
La mayoría de los endpoints requieren Bearer Token JWT.  
Roles disponibles: **admin** y **user**. 

---

## 👥 Roles y permisos

| Acción                                | 👤 User | 🛠️ Admin |
|---------------------------------------|:-------:|:--------:|
| Registrar usuario                     |   ✅    |    ✅    |
| Iniciar sesión                        |   ✅    |    ✅    |
| Listar productos                      |   ✅    |    ✅    |
| Crear producto                        |   ❌    |    ✅    |
| Editar producto                       |   ❌    |    ✅    |
| Eliminar producto                     |   ❌    |    ✅    |
| Crear carrito                         |   ✅    |    ❌    |
| Agregar producto al carrito           |   ✅    |    ❌    |
| Eliminar producto del carrito         |   ✅    |    ❌    |
| Vaciar carrito                        |   ✅    |    ❌    |
| Finalizar compra (generar ticket)     |   ✅    |    ❌    |
| Listar todos los carritos             |   ❌    |    ✅    |
| Eliminar carrito                      |   ❌    |    ✅    |

---

## 🔄 Flujo de roles

Admin
 └──► Gestiona productos
       ├── Crear producto
       ├── Editar producto
       └── Eliminar producto
       └── Listar todos los carritos

User
 └──► Gestiona carrito personal
       ├── Crear carrito
       ├── Agregar productos
       ├── Eliminar productos
       ├── Vaciar carrito
       └── Finalizar compra → Generar ticket



Ejemplo de header:
Authorization: Bearer <token>

---

## 📌 Endpoints principales

### 🛒 Carritos
- `GET /api/carts` → Listar todos los carritos (**admin**)  
- `POST /api/carts` → Crear carrito (**user**)  
- `GET /api/carts/{id}` → Obtener carrito por ID (**user**)  
- `DELETE /api/carts/{id}` → Eliminar carrito (**admin**)  
- `POST /api/carts/{cid}/products/{pid}` → Agregar producto (**user**)  
- `DELETE /api/carts/{cid}/products/{pid}` → Eliminar producto específico (**user**)  
- `DELETE /api/carts/{cid}/products` → Vaciar carrito (**user**)  
- `POST /api/carts/{cid}/purchase` → Finalizar compra y generar ticket (**user**)  

### 📦 Productos
- `GET /api/products` → Listar productos  
- `POST /api/products` → Crear producto (**admin**)  
- `PUT /api/products/{id}` → Actualizar producto (**admin**)  
- `DELETE /api/products/{id}` → Eliminar producto (**admin**)  

### 🔐 Sesiones
- `POST /api/sessions/register` → Registrar usuario  
- `POST /api/sessions/login` → Iniciar sesión y obtener JWT  
- `GET /api/sessions/current` → Obtener usuario autenticado  

---

## 📖 Documentación Swagger
Disponible en:  
👉 `http://localhost:8080/api-docs`

---

## 🐳 Docker
### 1. Variables de entorno
Crea un archivo `.env` en la raíz:
```env
MONGO_URI=mongodb://db:27017/backend3
JWT_SECRET=claveSecreta
PORT=8080

Levantar con Docker Compose
docker-compose up --build
El backend quedará disponible en:
👉 http://localhost:8080

✅ Flujo rápido de prueba
Registrar un usuario con rol user: crear un usuario normal que será el encargado de manejar carritos y compras.

Iniciar sesión con ese usuario: obtener el token JWT que se usará en las operaciones de carrito.

Registrar un usuario con rol admin: este usuario será el encargado de crear, editar y eliminar productos.

Iniciar sesión con el admin: obtener el token JWT de administrador.

Crear un producto con el admin: usar el token de admin para dar de alta un producto en la base de datos.

Crear un carrito con el user: usar el token de usuario para generar un carrito vacío.

Agregar un producto al carrito: con el token de usuario, añadir un producto existente al carrito indicando la cantidad.

Finalizar la compra: con el token de usuario, cerrar el carrito y generar el ticket de compra.