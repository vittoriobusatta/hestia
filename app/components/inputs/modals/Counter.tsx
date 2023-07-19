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
    <div className="modal__counter">
      <div className="modal__counter__head">
        <h2 className="modal__counter__title">{title}</h2>
        <h5 className="modal__counter__subtitle">{subtitle}</h5>
      </div>
      <div className="modal__counter__actions">
        <button className="modal__counter__button" onClick={onReduce}>
          <AiOutlineMinus />
        </button>
        <p className="modal__counter__value">{value}</p>
        <button className="modal__counter__button" onClick={onAdd}>
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
