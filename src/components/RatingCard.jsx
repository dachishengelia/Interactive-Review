import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RatingCard({ onSubmit }) {
  const [step, setStep] = useState('initial');
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [scaleMax, setScaleMax] = useState(5); 
  const [feedback, setFeedback] = useState('');

  const textareaRef = useRef(null);

  useEffect(() => {
    if (step === 'low-rating' && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [step]);

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (!rating) return;

    const threshold = scaleMax / 2;
    if (rating > threshold) {
      onSubmit(rating, scaleMax);
    } else {
      setStep('low-rating');
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating, scaleMax);
  };


  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setRating((prev) => Math.min(scaleMax, (prev || 0) + 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setRating((prev) => Math.max(1, (prev || 1) - 1));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans text-zinc-100 selection:bg-zinc-800">
      <motion.div 
        layout
        className="w-full max-w-md bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
      
          {step === 'initial' && (
            <motion.form
              key="initial"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleRatingSubmit}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium tracking-tight text-zinc-200">
                  How would you rate your experience?
                </h2>
                <button
                  type="button"
                  onClick={() => { 
                    setScaleMax(scaleMax === 5 ? 10 : 5); 
                    setRating(null); 
                  }}
                  className="text-xs px-2.5 py-1 rounded-full bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/50 transition cursor-pointer"
                >
                  Scale: 1-{scaleMax}
                </button>
              </div>

        
              <div 
                role="radiogroup" 
                aria-label="Rating selection"
                className={`grid gap-2 ${scaleMax === 5 ? 'grid-cols-5' : 'grid-cols-5 sm:grid-cols-10'}`}
              >
                {Array.from({ length: scaleMax }, (_, i) => i + 1).map((num) => {
                  const isSelected = rating === num;
                  const isHovered = hoverRating !== null && num <= hoverRating;

                  return (
                    <button
                      key={num}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`${num} out of ${scaleMax}`}
                      onClick={() => setRating(num)}
                      onMouseEnter={() => setHoverRating(num)}
                      onMouseLeave={() => setHoverRating(null)}
                      onKeyDown={handleKeyDown}
                      className={`h-11 rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-center border focus:outline-none focus:ring-2 focus:ring-zinc-400 cursor-pointer ${
                        isSelected 
                          ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-md scale-[1.02]' 
                          : isHovered
                          ? 'bg-zinc-800/80 text-zinc-200 border-zinc-700'
                          : 'bg-zinc-800/30 text-zinc-400 border-zinc-800 hover:bg-zinc-800/50 hover:text-zinc-200'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

         
              <motion.button
                type="submit"
                disabled={!rating}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                  rating 
                    ? 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200 cursor-pointer shadow-sm' 
                    : 'bg-zinc-800/40 text-zinc-600 border border-zinc-800 cursor-not-allowed'
                }`}
              >
                Continue
              </motion.button>
            </motion.form>
          )}

    
          {step === 'low-rating' && (
            <motion.form
              key="low-rating"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleFeedbackSubmit}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium tracking-tight text-zinc-200">
                  How could we improve?
                </h2>
                <button
                  type="button"
                  onClick={() => setStep('initial')}
                  className="text-xs text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
                >
                  Back
                </button>
              </div>

              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  maxLength={250}
                  rows={4}
                  placeholder="Share your thoughts..."
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none"
                />
                <span className="absolute bottom-2.5 right-3 text-[11px] text-zinc-600 font-mono">
                  {feedback.length}/250
                </span>
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-all duration-200 cursor-pointer"
              >
                Submit Feedback
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}