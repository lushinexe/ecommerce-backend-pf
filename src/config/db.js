import mongoose from 'mongoose';

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri, {
      // Opcionales: mongoose maneja internamente opciones modernas
    });
    console.log('✅ MongoDB conectado');
  } catch (err) {
    console.error('❌ Error de conexión MongoDB:', err.message);
    // No permitimos que el proceso caiga sin mensaje
    process.exit(1);
  }
}
