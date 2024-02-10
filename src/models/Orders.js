import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
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
  orderItems: [
    {
      service: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Service",
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    taxPaid: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
  },
  orderStatus: {
    type: String,
    default: "Processing",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = models.Order || model('Order', OrderSchema);
export default Order;
