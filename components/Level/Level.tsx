import Button from "../ui/Button/Button";

type Props = {
  content: string;
  options: string[];
  onClick: (option: string) => void;
};

const Level: React.FC<Props> = ({ content, options, onClick }) => {
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
};

export default Level;
