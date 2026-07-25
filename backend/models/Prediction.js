const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    month: {
      type: String,
      required: [true, 'Month identifier (e.g. YYYY-MM) is required'],
      trim: true,
    },
    predictedExpense: {
      type: Number,
      default: 0,
      min: 0,
    },
    predictedSavings: {
      type: Number,
      default: 0,
      min: 0,
    },
    healthScore: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
    aiInsights: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

predictionSchema.index({ user: 1, month: 1 }, { unique: true });

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
