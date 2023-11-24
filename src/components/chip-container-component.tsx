import React, { useState, KeyboardEvent, ChangeEvent } from 'react';

type ChipInputProps = {
  chips?: string[];
};

export const ChipContainer: React.FC<ChipInputProps> = (c?: ChipInputProps) => {
  const [chips, setChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  if (c?.chips) setChips(c.chips);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      if (!chips.includes(inputValue.trim())) {
        setChips([...chips, inputValue.trim()]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      const newChips = chips.slice(0, chips.length - 1);
      setChips(newChips);
    }
  };

  const removeChip = (indexToRemove: number) => {
    const newChips = chips.filter((_, index) => index !== indexToRemove);
    setChips(newChips);
  };

  return (
    <section className="flex flex-wrap bg">
      {chips.map((chip, index) => (
        <div
          key={index}
          className="bg-blue text-white px-3 py-1 rounded-full flex items-center justify-between"
        >
          <span>{chip}</span>
          <button
            className="ml-1 focus:outline-none"
            onClick={() => removeChip(index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 1a9 9 0 0 1 9 9c0 4.963-4.037 9-9 9-4.963 0-9-4.037-9-9a9 9 0 0 1 9-9zM5.293 5.293a1 1 0 0 1 1.414-1.414L10 8.586l3.293-3.293a1 1 0 0 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 0-1.414z"
              />
            </svg>
          </button>
        </div>
      ))}
    </section>
  );
};

