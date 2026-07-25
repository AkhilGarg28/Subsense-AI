import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCheck,
  HiOutlineCloudUpload,
  HiOutlineDocumentSearch,
  HiOutlineSparkles,
  HiOutlineRefresh,
  HiOutlineLightBulb,
  HiOutlinePlay,
  HiOutlinePause,
} from 'react-icons/hi';
import { FiLoader, FiCheckCircle, FiClock, FiRotateCcw } from 'react-icons/fi';

/**
 * 5-Step Processing Timeline for SubSense AI Receipt Analysis
 */
const DEFAULT_STEPS = [
  {
    id: 1,
    title: 'File Uploaded',
    subtitle: 'Receipt document received & validated',
    icon: HiOutlineCloudUpload,
    detail: 'PDF/Image integrity verified (2.4 MB) • Encrypted upload completed',
    time: 'Step 1 of 5'
  },
  {
    id: 2,
    title: 'OCR Processing',
    subtitle: 'Extracting raw text & line items',
    icon: HiOutlineDocumentSearch,
    detail: 'Optical Character Recognition extracted 14 text blocks & merchant header',
    time: 'Step 2 of 5'
  },
  {
    id: 3,
    title: 'AI Understanding',
    subtitle: 'Categorizing merchant & invoice items',
    icon: HiOutlineSparkles,
    detail: 'Identified vendor: Amazon Web Services Inc. • Tax: $12.40 • Total: $142.30',
    time: 'Step 3 of 5'
  },
  {
    id: 4,
    title: 'Subscription Detection',
    subtitle: 'Matching recurring billing patterns',
    icon: HiOutlineRefresh,
    detail: 'Matched monthly cloud recurring frequency • Renewal cycle: 28th of every month',
    time: 'Step 4 of 5'
  },
  {
    id: 5,
    title: 'Recommendation Generated',
    subtitle: 'Calculating cost optimization tips',
    icon: HiOutlineLightBulb,
    detail: 'AI suggested switching to AWS Savings Plans to save up to $34.50/month',
    time: 'Step 5 of 5'
  }
];

/**
 * ProcessingTimeline Component
 *
 * Displays an animated 5-step processing timeline with vertical progress line,
 * glowing step active indicators, complete checkmarks, and detail view.
 *
 * @param {Object} props
 * @param {number} [props.currentStep=3] - Current active step (1-5)
 * @param {boolean} [props.isProcessing=true] - Whether processing is currently active
 * @param {Array} [props.steps] - Custom steps array
 * @param {Function} [props.onStepChange] - Step click / change callback
 * @param {Function} [props.onComplete] - Callback when step reaches step 5
 */
const ProcessingTimeline = ({
  currentStep: propStep = 3,
  isProcessing: _isProcessing = true,
  steps = DEFAULT_STEPS,
  onStepChange,
  onComplete
}) => {
  const [activeStep, setActiveStep] = useState(propStep);
  const [isSimulating, setIsSimulating] = useState(false);

  // Calculate percentage height for vertical progress line fill
  const totalSteps = steps.length;
  const progressPercentage = Math.min(
    100,
    Math.max(0, ((activeStep - 1) / (totalSteps - 1)) * 100)
  );

  // Step click handler
  const handleStepClick = (stepId) => {
    setActiveStep(stepId);
    if (onStepChange) onStepChange(stepId);
  };

  // Simulate timeline progression
  const toggleSimulation = () => {
    if (isSimulating) {
      setIsSimulating(false);
      return;
    }

    setIsSimulating(true);
    let nextStep = 1;
    setActiveStep(1);

    const interval = setInterval(() => {
      nextStep += 1;
      if (nextStep <= totalSteps) {
        setActiveStep(nextStep);
        if (onStepChange) onStepChange(nextStep);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        if (onComplete) onComplete();
      }
    }, 1500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Timeline Card Container */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400 shadow-md">
              <HiOutlineSparkles className="w-6 h-6 animate-pulse text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  AI Receipt Processing Engine
                </h3>
                <span
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                    activeStep === totalSteps
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 animate-pulse'
                  }`}
                >
                  {activeStep === totalSteps ? '✔ Analysis Complete' : '⚡ Processing Live'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time 5-stage deep receipt understanding and subscription parsing
              </p>
            </div>
          </div>

          {/* Action Simulation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSimulation}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 shadow-lg ${
                isSimulating
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-500/50 hover:brightness-110 shadow-blue-500/20'
              }`}
            >
              {isSimulating ? (
                <>
                  <HiOutlinePause className="w-4 h-4" /> Pause Demo
                </>
              ) : (
                <>
                  <HiOutlinePlay className="w-4 h-4" /> Replay Timeline
                </>
              )}
            </button>

            <button
              onClick={() => setActiveStep(1)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="Reset to Step 1"
            >
              <FiRotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Vertical Timeline Body */}
        <div className="relative pt-6 pb-2 pl-4 sm:pl-8 pr-2 z-10">
          {/* Background vertical line */}
          <div className="absolute left-[31px] sm:left-[47px] top-10 bottom-10 w-1 bg-slate-800 rounded-full" />

          {/* Framer Motion Animated Filled Vertical Line */}
          <motion.div
            className="absolute left-[31px] sm:left-[47px] top-10 w-1 bg-gradient-to-b from-emerald-400 via-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50Origin-top"
            initial={{ height: 0 }}
            animate={{ height: `${progressPercentage}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />

          {/* Timeline Steps List */}
          <div className="space-y-8 relative">
            {steps.map((step) => {
              const isCompleted = step.id < activeStep;
              const isActive = step.id === activeStep;
              const isPending = step.id > activeStep;
              const IconComponent = step.icon;

              return (
                <motion.div
                  key={step.id}
                  layout
                  onClick={() => handleStepClick(step.id)}
                  className={`group relative flex items-start gap-4 sm:gap-6 cursor-pointer transition-all duration-300 ${
                    isActive ? 'scale-[1.01]' : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  {/* Step Node Circle (Left Icon) */}
                  <div className="relative flex items-center justify-center flex-shrink-0 z-20">
                    {/* Pulsing Aura Ring for Active Step */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-cyan-400/30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}

                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center border text-sm sm:text-base font-bold transition-all duration-300 shadow-xl ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-emerald-500/20'
                          : isActive
                          ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-cyan-500/40 ring-4 ring-cyan-500/20'
                          : 'bg-slate-900 text-slate-500 border-slate-700/80 group-hover:border-slate-600'
                      }`}
                    >
                      {isCompleted ? (
                        <HiCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                      ) : isActive ? (
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                      ) : (
                        <span className="text-xs sm:text-sm font-semibold">{step.id}</span>
                      )}
                    </div>
                  </div>

                  {/* Step Details Content Card */}
                  <div
                    className={`flex-1 p-4 rounded-xl border transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-800/90 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                        : isCompleted
                        ? 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-900/40 border-slate-800/60 opacity-60 hover:opacity-80'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-2">
                        <h4
                          className={`text-sm sm:text-base font-bold transition-colors ${
                            isActive
                              ? 'text-cyan-300'
                              : isCompleted
                              ? 'text-emerald-400'
                              : 'text-slate-300'
                          }`}
                        >
                          Step {step.id}: {step.title}
                        </h4>
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <FiCheckCircle className="w-3 h-3" /> Completed
                          </span>
                        )}
                        {isActive && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30 animate-pulse">
                            <FiLoader className="w-3 h-3 animate-spin" /> In Progress
                          </span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                            Queued
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] font-mono text-slate-400">
                        {step.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-medium">{step.subtitle}</p>

                    {/* Active/Completed Extracted Snippet Detail Box */}
                    <AnimatePresence>
                      {(isActive || isCompleted) && step.detail && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 pt-2 border-t border-slate-700/50 text-[11px] text-slate-300 font-mono flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800"
                        >
                          <span className="text-cyan-400 font-bold">❯</span>
                          <span className="leading-tight">{step.detail}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Summary Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div className="flex items-center gap-2">
            <FiClock className="w-4 h-4 text-blue-400" />
            <span>
              Overall Engine Latency: <strong className="text-slate-200">1.2s</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Completed: {activeStep - 1}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Active: {activeStep <= totalSteps ? 1 : 0}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              Remaining: {Math.max(0, totalSteps - activeStep)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingTimeline;
