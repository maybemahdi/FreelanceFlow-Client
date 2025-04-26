
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { cn } from '../../../lib/utils';

interface ButtonProps {
  text: string;
  isRounded?: boolean;
  arrow?: boolean;
  isFullWidth?: boolean;
  isReversed?: boolean;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  text,
  isRounded,
  arrow,
  isFullWidth,
  isReversed,
  handleClick,
}: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={cn(
        'text-white bg-primary px-[25px] text-base py-2 flex items-center justify-center gap-2 transition-all duration-300 box-border border border-primary',
        {
          'rounded-[40px]': isRounded,
          'rounded-[8px]': !isRounded,
          'w-full': isFullWidth,
          'bg-white text-primary': isReversed,
        }
      )}
    >
      {text}
      {arrow && <ArrowRight className="ml-2 h-4 w-4" />}
    </button>
  );
}