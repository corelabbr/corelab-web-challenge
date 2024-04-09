import { useState } from 'react';
import StarSimple from '../icons/StarSimple';
import StarFilled from '../icons/StarFilled';

interface IStar {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const Star = ({ checked, onChange }: IStar) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {isChecked ? <StarFilled /> : <StarSimple />}
    </div>
  );
};
