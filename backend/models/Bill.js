const mongoose = require('mongoose');

const billSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Bill title is required'],
      trim: true,
    },
    merchant: {
      type: String,
      required: [true, 'Merchant name is required'],
      trim: true,
      index: true,
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
      index: true,
    },
    amount: {
      type: Number,
      required: [true, 'Bill amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      trim: true,
    },
    billDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
      index: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Overdue', 'Cancelled'],
      default: 'Pending',
      index: true,
    },
    paymentMethod: {
      type: String,
      default: 'Credit Card',
      trim: true,
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurringFrequency: {
      type: String,
      default: 'Monthly',
      trim: true,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
    billImage: {
      type: String,
      default: '',
    },
    ocrText: {
      type: String,
      default: '',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for optimal user-scoped querying & filtering
billSchema.index({ user: 1, dueDate: 1 });
billSchema.index({ user: 1, status: 1 });
billSchema.index({ user: 1, category: 1 });
billSchema.index({ user: 1, merchant: 1 });

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
