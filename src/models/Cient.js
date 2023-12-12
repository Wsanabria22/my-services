import { Schema, model, models } from 'mongoose';

const ClientSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'El aplellido es requerido'],
    trim: true,
  },
  idNumber:{
    type: String,
    required: false,
    trim: true,
  },
  celPhone: {
    type: String,
    required: [true, 'El Numero de celular es requerido']
  },
  address: {
    type: String,
    required: false,
  },
  email: {
    type:String,
    required: false,
    trim: true,
  },
},
{
  timestamps: true,
}) 