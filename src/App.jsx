import RatingCard from './components/RatingCard';
import ThankYouCard from './components/ThankYouCard';
import { useState } from 'react';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [maxScale, setMaxScale] = useState(5); 

  const handleRatingSubmit = (rating, scaleMax) => {
    setSelectedRating(rating);
    setMaxScale(scaleMax);
    setIsSubmitted(true);
  };

  return (
    <div className="App">
      {!isSubmitted ? (
        <RatingCard onSubmit={handleRatingSubmit} />
      ) : (
        <ThankYouCard rating={selectedRating} scaleMax={maxScale} />
      )}
    </div>
  );
}

export default App;