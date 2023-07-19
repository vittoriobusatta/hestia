"use client";

interface CategoryBoxProps {
  customKey: string;
  icon: React.FC;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryBoxProps> = ({
  customKey,
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <button
      key={customKey}
      className={`categories__item ${
        selected ? "categories__item--selected" : ""
      }`}
      onClick={() => onClick(label)}
    >
      <Icon />
      <div className="categories__item__text">{label}</div>
    </button>
  );
};

export default CategoryInput;
