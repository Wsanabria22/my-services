import { Schema, model, models } from 'mongoose';

const ProfessionalSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true,
  },
  idNumber: {
    type: String,
    required: [true, 'La identificacion es requedida'],
    trim: true,
  },
  title: {
    type: String
  },
},
{
  timestamps: true,
});

const Professional = models.Professional || model('Professional', ProfessionalSchema);
export default Professional;
