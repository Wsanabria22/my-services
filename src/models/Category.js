import { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
  name: { 
    type: String,
    required: [true, 'El nombre es requerido'],
    unique: [true, 'La categoria ya existe'],
  },
  description: {
    type: String,
    required: [true, 'La descripcion es requerida']
  },
},
{
  timestamps: true
}
);

const Category = models.Category || model('Category', CategorySchema);
export default Category;
