"use client";

import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div className={
      `categories__item ${selected ? "categories__item--selected" : ""}`
    } onClick={() => onClick(label)}>
      <Icon size={30} />
      <div className="categories__item__text">{label}</div>
    </div>
  );
};

export default CategoryBox;
