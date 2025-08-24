import { Level } from "@/db/schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChoicesSelectProps {
  level?: Level;
}

export default function ChoicesSelect({ level }: ChoicesSelectProps) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Choices" />
      </SelectTrigger>
      <SelectContent>
        {level?.choices.map((choice) => (
          <SelectItem key={choice.text} value={choice.text}>
            {choice.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
