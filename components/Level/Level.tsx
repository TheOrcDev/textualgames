import Button from "../ui/Button/Button";

type Props = {
  content: string;
  options: string[];
  onClick: (option: string) => void;
};

export default function Level({ content, options, onClick }: Props) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl">{content}</p>
      <div className="mt-20 flex justify-center">
        {options.map((option) => (
          <Button
            key={option}
            content={option}
            onClick={() => onClick(option)}
          />
        ))}
      </div>
    </div>
  );
}
