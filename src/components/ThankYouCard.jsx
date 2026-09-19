import React from 'react';
import { motion } from 'framer-motion';

export default function ThankYouCard({ rating, scaleMax = 5 }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans text-zinc-100 selection:bg-zinc-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center py-6 gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-1">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="inline-block px-3 py-1 bg-zinc-800/60 border border-zinc-700/50 rounded-full text-xs text-zinc-300 font-medium">
          You rated us {rating} out of {scaleMax}
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-medium text-zinc-200">Thank you!</h3>
          <p className="text-sm text-zinc-400 max-w-xs">
            We appreciate your feedback. It helps us improve our platform experience.
          </p>
        </div>
      </motion.div>
    </div>
  );
}