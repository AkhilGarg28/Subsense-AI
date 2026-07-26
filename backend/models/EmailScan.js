const mongoose = require('mongoose');

const emailScanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    emailSubject: {
      type: String,
      default: 'Gmail Invoice Auto-Sync',
      trim: true,
    },
    sender: {
      type: String,
      default: 'system@gmail.com',
      trim: true,
    },
    scanDate: {
      type: Date,
      default: Date.now,
    },
    importedBillsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    importedSubscriptionsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Success', 'Failed', 'Partial'],
      default: 'Success',
    },
    message: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

emailScanSchema.index({ user: 1, createdAt: -1 });

const EmailScan = mongoose.model('EmailScan', emailScanSchema);

module.exports = EmailScan;
