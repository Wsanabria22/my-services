import mongoose, { Schema, model, models } from 'mongoose';

const AppointmentSchema = new Schema({
  user: {
    type: String, 
    required: true,
  },
  client:{
    type: mongoose.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Service",
  },
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Professional",
  },
  quantity: {
    type: Number,
    required: true,
  },
  appointmentStatus: {
    type: String,
    default: "Processing",
  },
  dateAt: {
    type: Date,
    default: Date.now,
  },
  idxStartHour: {
    type: String,
    required: true,
  },
  idxFinalHour: {
    type: String,
    required: true,
  }
},
{
  timestamps: true,
});

const Appointment = models.Appointment || model('Appointment', AppointmentSchema);
export default Appointment;