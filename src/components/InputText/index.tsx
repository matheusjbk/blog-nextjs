import { useId } from "react";

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<"input">;

export function InputText({ labelText = "", ...props }: InputTextProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      {labelText && (
        <label
          className="text-sm"
          htmlFor={id}
        >
          {labelText}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={`bg-white outline-0 text-base/tight ring-2 ring-slate-500 focus:ring-blue-600 rounded p-2 transition placeholder-slate-400 disabled:bg-slate-300 disabled:placeholder-slate-500 disabled:text-slate-500 read-only:bg-slate-200 ${props.className}`}
      />
    </div>
  );
}
