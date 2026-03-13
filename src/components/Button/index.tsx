type ButtonColors = "default" | "ghost" | "danger";
type ButtonSizes = "sm" | "md" | "lg";

type ButtonProps = {
  color: ButtonColors;
  size: ButtonSizes;
} & React.ComponentProps<"button">;

export function Button({ color, size, ...props }: ButtonProps) {
  const buttonColors: Record<ButtonColors, string> = {
    default: "bg-blue-500 text-blue-50 hover:bg-blue-600 rounded-md transition",
    ghost:
      "bg-slate-300 text-slate-950 hover:bg-slate-400 rounded-md transition",
    danger: "bg-red-500 text-red-50 hover:bg-red-600 rounded-md transition",
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: "",
    md: "",
    lg: "",
  };

  const buttonClasses = `${buttonColors[color]} ${buttonSizes[size]}`;

  return (
    <button
      className={buttonClasses}
      {...props}
    />
  );
}
