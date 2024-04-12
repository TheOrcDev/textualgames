type Props = {
  onKeyDown?: () => KeyboardEvent;
  onClick?: () => void;
  content: string;
  color?: string;
};

export default function Button({ content, color, onClick, onKeyDown }: Props) {
  // remove "a" or "an" from the beginning of the string
  if (content.startsWith("a ")) {
    content = content.slice(2);
  } else if (content.startsWith("an ")) {
    content = content.slice(3);
  }

  return (
    <button
      className={`
      flex min-h-28 w-full items-center justify-center rounded-xl
      p-3 text-center shadow-md transition ease-in-out hover:-translate-y-1 hover:shadow-lg ${
        color ? color : "bg-yellow-400"
      } text-xs text-black shadow-yellow-700
      duration-300 hover:scale-110 md:text-base
      ${content.length > 20 && "h-32"}
      `}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {content}
    </button>
  );
}
