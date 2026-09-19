import React from 'react';
import { motion } from 'framer-motion';

export default function ThankYouCard({ rating, scaleMax = 5, theme = 'dark' }) {
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'} flex items-center justify-center p-4 font-sans selection:bg-zinc-800`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-md ${isDark ? 'bg-zinc-900/80 border border-zinc-800/80' : 'bg-white border border-zinc-200'} rounded-2xl p-6 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center py-6 gap-4`}
      >
        <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-emerald-100 border border-emerald-200 text-emerald-600'} flex items-center justify-center mb-1`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className={`inline-block px-3 py-1 ${isDark ? 'bg-zinc-800/60 border border-zinc-700/50 text-zinc-300' : 'bg-zinc-100 border border-zinc-200 text-zinc-600'} rounded-full text-xs font-medium`}>
          You rated us {rating} out of {scaleMax}
        </div>

        <div className="space-y-1">
          <h3 className={`text-lg font-medium ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Thank you!</h3>
          <p className={`text-sm max-w-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            We appreciate your feedback. It helps us improve our platform experience.
          </p>
        </div>
      </motion.div>
    </div>
  );
}