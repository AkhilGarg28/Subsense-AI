const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
    },
    provider: {
      type: String,
      required: [true, 'Provider name is required'],
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'Subscription price is required'],
      min: [0, 'Price cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      trim: true,
    },
    billingCycle: {
      type: String,
      enum: ['Weekly', 'Monthly', 'Quarterly', 'Yearly'],
      default: 'Monthly',
    },
    renewalDate: {
      type: Date,
      required: [true, 'Renewal date is required'],
      index: true,
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Paused', 'Cancelled'],
      default: 'Active',
      index: true,
    },
    paymentMethod: {
      type: String,
      default: 'Credit Card',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    isAutoRenew: {
      type: Boolean,
      default: true,
    },
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

// Compound indexes
subscriptionSchema.index({ user: 1, status: 1 });
subscriptionSchema.index({ user: 1, renewalDate: 1 });
subscriptionSchema.index({ user: 1, provider: 1 });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
