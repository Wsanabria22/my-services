import mongoose, { Schema, model, models } from 'mongoose';

const AppointmentSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId, 
    ref: 'User',
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
  startHour: {
    type: String,
    required: true,
  },
  finalHour: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = models.Appointment || model('Date', AppointmentSchema);
export default Appointment;