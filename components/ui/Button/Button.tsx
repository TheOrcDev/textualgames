type Props = {
  onKeyDown?: () => KeyboardEvent;
  onClick?: () => void;
  content: string;
  color?: string;
};

export const Button: React.FC<Props> = ({
  content,
  color,
  onClick,
  onKeyDown,
}) => {
  // remove "a" or "an" from the beginning of the string
  if (content.startsWith("a ")) {
    content = content.slice(2);
  } else if (content.startsWith("an ")) {
    content = content.slice(3);
  }

  return (
    <button
      className={`
      transition ease-in-out hover:-translate-y-1 p-3 hover:shadow-lg rounded-xl
      flex text-center w-full shadow-md items-center justify-center min-h-28 ${
        color ? color : "bg-yellow-400"
      } text-xs md:text-base shadow-yellow-700
      hover:scale-110 duration-300 text-black
      ${content.length > 20 && "h-32"}
      `}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {content}
    </button>
  );
};

export default Button;
