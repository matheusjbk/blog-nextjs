import { useId } from "react";

type InputCheckboxProps = {
  labelText?: string;
  type?: "checkbox";
} & React.ComponentProps<"input">;

export function InputCheckbox({
  labelText = "",
  type = "checkbox",
  ...props
}: InputCheckboxProps) {
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        {...props}
        className={`w-4 h-4 outline-0 focus:ring-2 focus:ring-blue-600 ${props.className}`}
        type={type}
      />
      {labelText && (
        <label
          className="text-sm"
          htmlFor={id}
        >
          {labelText}
        </label>
      )}
    </div>
  );
}
