"use client";

interface CategoryBoxProps {
  key: string;
  icon: React.FC;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryBoxProps> = ({
  key,
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
    key={key}
      className={`categories__item ${
        selected ? "categories__item--selected" : ""
      }`}
      onClick={() => onClick(label)}
    >
      <Icon />
      <div className="categories__item__text">{label}</div>
    </div>
  );
};

export default CategoryInput;
