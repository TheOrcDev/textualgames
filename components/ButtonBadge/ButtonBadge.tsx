export interface ButtonBadgeProps {
  content: string;
  onClick: () => void;
  color?: string;
}

export const ButtonBadge: React.FC<ButtonBadgeProps> = ({
  content,
  color,
  onClick,
}) => {
  return (
    <button
      style={{ backgroundColor: color }}
      className="
      transition ease-in-out delay-150 hover:-translate-y-1 p-3 hover:shadow-2xl h-28
      m-2 flex text-center w-full rounded shadow-md bg-teal-600 text-xs md:text-base
      hover:scale-110 duration-300 items-center justify-center text-white shadow-gray-700
      "
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default ButtonBadge;
