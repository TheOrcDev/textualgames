import { Choice } from "@/db/schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChoicesSelectProps {
  choices: Choice[];
  onChoiceSelected: (choice: Choice) => void;
}

export default function ChoicesSelect({
  choices,
  onChoiceSelected,
}: ChoicesSelectProps) {
  return (
    <Select
      onValueChange={(value) => {
        const selectedChoice = choices.find((choice) => choice.text === value);

        if (selectedChoice) {
          onChoiceSelected(selectedChoice);
        }
      }}
    >
      <SelectTrigger className="rounded-bl-none">
        <SelectValue placeholder="Choices" />
      </SelectTrigger>
      <SelectContent>
        {choices.map((choice) => (
          <SelectItem key={choice.text} value={choice.text}>
            {choice.text.length > 25
              ? `${choice.text.substring(0, 30)}...`
              : choice.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
