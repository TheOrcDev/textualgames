type Props = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export default function Input({ placeholder, value, onChange }: Props) {
  return (
    <input
      className={`
        mb-2 h-10 w-3/4 rounded-lg border px-3 text-center
        text-base text-gray-700 placeholder:text-gray-600 md:w-2/3 lg:w-2/4
      `}
      placeholder={`${placeholder ? placeholder : "Type here..."}`}
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) =>
        (e.target.placeholder = `${placeholder ? placeholder : "Type here..."}`)
      }
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
}
