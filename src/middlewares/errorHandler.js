export default function errorHandler(err, req, res, next) {
  console.error('💥 Error:', err.message);

  // Errores de Mongoose de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Error de validación', details: err.errors });
  }

  // CastError: IDs mal formateados
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // Por defecto
  res.status(500).json({ error: 'Error interno del servidor' });
}
