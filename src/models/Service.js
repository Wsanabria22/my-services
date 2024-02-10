import mongoose, { Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombres es requerido'],
    unique: [true, 'Servicio ya existe'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La descripcion es requerida'],
  },
  duration: {
    type: Number,
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido']
  },
  category: {
    type: mongoose.Types.ObjectId, ref: 'Category'
  },
  picturePath: {
    type: String
  },
}, {
  timestamps: true,
}
);

const Service = models.Service || model('Service', ServiceSchema);
export default Service;
