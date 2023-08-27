import React from 'react';
import { Rating } from '@mui/material';

const StarRating = ({ score, onScoreChange }) => {
  const handleRatingChange = (newValue) => {
    if (newValue >= 1) {
      onScoreChange(newValue);
    }
  };

  return (
    <div>
      <Rating
        name="score"
        value={score}
        onChange={(event, newValue) => {
          handleRatingChange(newValue);
        }}
        precision={1}
        max={5}
      />
    </div>
  );
};

export default StarRating;