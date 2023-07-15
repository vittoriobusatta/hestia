"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="rent__counter">
      <div className="rent__counter__head">
        <div className="rent__counter__title">{title}</div>
        <div className="rent__counter__subtitle">{subtitle}</div>
      </div>
      <div className="rent__counter__actions">
        <button className="rent__counter__button" onClick={onReduce}>
          <AiOutlineMinus />
        </button>
        <p className="rent__counter__value">{value}</p>
        <button className="rent__counter__button" onClick={onAdd}>
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
