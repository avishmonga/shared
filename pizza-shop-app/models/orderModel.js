const mongoose = require('mongoose');

const statusEnum = ['pending', 'in-progress', 'completed'];
const sizeEnum = ['small', 'medium', 'large'];
const itemTypeEnum = ['pizza', 'soda'];

const itemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
  },
  name: { type: String, required: true },
  size: { type: String, enum: sizeEnum, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, enum: itemTypeEnum, required: true },
  price: { type: Number, required: true },
});
const orderSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  items: {
    type: [itemSchema],
    validate: [arrayLimit, 'At least one item is required'],
  },
  status: { type: String, enum: statusEnum, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
});

// Validator function to ensure at least one item in order should be present before creating
function arrayLimit(val) {
  return val.length > 0;
}

module.exports = mongoose.model('Order', orderSchema, 'orders');
