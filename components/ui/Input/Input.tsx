type Props = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export default function Input({ placeholder, value, onChange }: Props) {
  return (
    <input
      className={`
          h-10 px-3 mb-2 text-base text-gray-700 w-3/4 md:w-2/3 lg:w-2/4
        placeholder-gray-600 border rounded-lg focus:shadow-outline text-center
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
