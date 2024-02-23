import mongoose, { Schema, model, models } from 'mongoose';

const JournalSchema = new Schema({
  professional: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Professional",
  },
  journalDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  indexHour: {
    type: Number,
    required: true,
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Appointment",
  },
  journalStatus: {
    type: String,
    default: "free",
    required: true,
  }
},
{
  timestamps: true,
});

const Journal = models.Journal || model('Journal', JournalSchema);
export default Journal;
