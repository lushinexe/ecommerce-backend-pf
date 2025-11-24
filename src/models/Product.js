import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  title: String,
  category: String,
  price: Number,
  available: Boolean,
  stock: Number
});

productSchema.plugin(mongoosePaginate);

export default mongoose.models.Product || mongoose.model('Product', productSchema);
