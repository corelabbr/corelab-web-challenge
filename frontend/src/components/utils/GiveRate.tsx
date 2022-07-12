import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

interface IGiveRateProps {
  count?: number;
  rating: number;
  color?: {
    filled: string;
    unfilled: string;
  };
  onRating: (value: number) => void;
}

export const GiveRate = ({
  count = 5,
  rating = 0,
  color = { filled: '#f5eb3b', unfilled: '#dcdcdc' },
  onRating,
}: IGiveRateProps) => {
  const [hoverRating, sethoverRating] = useState(0);
  const getColor = (index: number) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, index) => index + 1)
      .map((index) => (
        <BsStarFill
          key={index}
          style={{ color: getColor(index) }}
          onClick={() => onRating(index)}
          onMouseEnter={() => sethoverRating(index)}
          onMouseOver={() => sethoverRating(index)}
          onMouseLeave={() => sethoverRating(0)}
        />
      ));
  }, [count, rating, hoverRating]);

  return <div>{starRating}</div>;
};
