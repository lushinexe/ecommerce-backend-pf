📌 README.md – Carrito Backend API
🚀 Descripción
API RESTful para la gestión de carritos de compras en una aplicación e‑commerce.
Incluye autenticación con JWT, autorización por roles (admin/user), validación de datos, documentación con Swagger y conexión a MongoDB.

🛠️ Tecnologías
Node.js + Express

MongoDB + Mongoose

Passport JWT

Express Validator

Swagger/OpenAPI

🔑 Autenticación
Se requiere Bearer Token JWT en la mayoría de los endpoints.

Roles disponibles: admin y user.

Ejemplo de header: Authorization: Bearer <token>

📌 Endpoints principales
Carritos
GET /api/carts → Listar todos los carritos (admin).

POST /api/carts → Crear carrito (user).

GET /api/carts/{id} → Obtener carrito por ID (user).

DELETE /api/carts/{id} → Eliminar carrito (admin).

Productos en carrito
POST /api/carts/{cid}/products/{pid} → Agregar producto al carrito (user).

DELETE /api/carts/{cid}/products/{pid} → Eliminar producto específico del carrito (user).

DELETE /api/carts/{cid}/products → Vaciar carrito completo (user).

📖 Documentación Swagger
Una vez levantado el servidor, accede a: http://localhost:4000/api-docs