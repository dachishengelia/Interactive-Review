import RatingCard from './components/RatingCard';
import ThankYouCard from './components/ThankYouCard';
import { useEffect, useState } from 'react';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [maxScale, setMaxScale] = useState(5);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('review-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('review-theme', theme);
  }, [theme]);

  const handleRatingSubmit = (rating, scaleMax) => {
    setSelectedRating(rating);
    setMaxScale(scaleMax);
    setIsSubmitted(true);
  };

  const isDark = theme === 'dark';

  const sunIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.5 5.5l-1.4 1.4M7 17l-1.4 1.4M18.5 18.5l-1.4-1.4M7 7 5.6 5.6" strokeLinecap="round" />
    </svg>
  );

  const moonIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4a7.8 7.8 0 1 0 10.5 10.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className={`App min-h-screen ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>
      <button
        type="button"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
        className={`fixed right-4 top-4 z-50 flex h-9 w-9 items-center justify-center border-0 bg-transparent p-0 shadow-none rounded-none ${
          isDark ? 'text-zinc-100' : 'text-zinc-800'
        }`}
      >
        {isDark ? sunIcon : moonIcon}
      </button>

      {!isSubmitted ? (
        <RatingCard onSubmit={handleRatingSubmit} theme={theme} />
      ) : (
        <ThankYouCard rating={selectedRating} scaleMax={maxScale} theme={theme} />
      )}
    </div>
  );
}

export default App;