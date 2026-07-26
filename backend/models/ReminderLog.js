const mongoose = require('mongoose');

const reminderLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    targetType: {
      type: String,
      enum: ['Bill', 'Subscription', 'Custom'],
      default: 'Bill',
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    reminderType: {
      type: String,
      enum: ['UpcomingDue', 'OverdueAlert', 'RenewalAlert', 'CustomReminder'],
      default: 'UpcomingDue',
    },
    channel: {
      type: String,
      enum: ['InApp', 'Email', 'Socket'],
      default: 'InApp',
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Sent', 'Failed', 'Pending'],
      default: 'Sent',
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reminderLogSchema.index({ user: 1, sentAt: -1 });

const ReminderLog = mongoose.model('ReminderLog', reminderLogSchema);

module.exports = ReminderLog;
