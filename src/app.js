import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';

import { connectDB } from './config/db.js';
import productsRouter from './routes/products.js';
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import cartsRouter from './routes/carts.js';
import viewsRouter from './routes/viewsRouter.js';
import passport from "./config/passport.js"; // 👈 estrategia JWT
import sessionsRouter from './routes/sessions.js'; // 👈 nuevo router
import errorHandler from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Configuración de Handlebars
app.engine(
  'handlebars',
  engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers: {
      multiply: (a, b) => a * b
    }
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Documentación Swagger 
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Middlewares base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👇 Inicializar Passport
app.use(passport.initialize());

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// Rutas API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

// Error handler middleware
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`✅ Servidor escuchando en puerto ${PORT}`);
      console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error.message);
    process.exit(1);
  }
}

startServer();