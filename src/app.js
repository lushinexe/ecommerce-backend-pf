import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';

import { connectDB } from './config/db.js';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import viewsRouter from './routes/viewsRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Configuración de Handlebars (solo una vez)
app.engine(
  'handlebars',
  engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers: {
      multiply: (a, b) => a * b // 👈 helper para subtotales
    }
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, '../public')));

// Middlewares base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// Rutas API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Rutas de vistas
app.use('/', viewsRouter);

// Manejo de errores (último)
app.use(errorHandler);

// Iniciar
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI;

if (!URI) {
  console.error('❌ Falta MONGO_URI en .env');
  process.exit(1);
}

connectDB(URI).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
});
