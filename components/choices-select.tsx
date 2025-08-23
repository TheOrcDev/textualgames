import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChoicesSelect() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Choices" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="choice1">Choice 1</SelectItem>
        <SelectItem value="choice2">Choice 2</SelectItem>
        <SelectItem value="choice3">Choice 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
