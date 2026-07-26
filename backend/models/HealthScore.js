const mongoose = require('mongoose');

const healthScoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    grade: {
      type: String,
      default: 'A',
    },
    status: {
      type: String,
      default: 'Excellent',
    },
    explanation: {
      type: String,
      default: '',
    },
    metrics: {
      totalBills: { type: Number, default: 0 },
      paidCount: { type: Number, default: 0 },
      pendingCount: { type: Number, default: 0 },
      overdueCount: { type: Number, default: 0 },
      activeSubscriptionsCount: { type: Number, default: 0 },
      paidRatioPercentage: { type: Number, default: 100 },
    },
    suggestions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

healthScoreSchema.index({ user: 1, createdAt: -1 });

const HealthScore = mongoose.model('HealthScore', healthScoreSchema);

module.exports = HealthScore;
