type ButtonColors = "default" | "ghost" | "danger";
type ButtonSizes = "sm" | "md" | "lg";

type ButtonProps = {
  color: ButtonColors;
  size: ButtonSizes;
} & React.ComponentProps<"button">;

export function Button({ color, size, ...props }: ButtonProps) {
  const buttonColors: Record<ButtonColors, string> = {
    default: "bg-blue-500 text-blue-50 hover:bg-blue-600 ",
    ghost: "bg-slate-300 text-slate-950 hover:bg-slate-400 ",
    danger: "bg-red-500 text-red-50 hover:bg-red-600 ",
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: "text-xs/tight py-1 px-2 rounded-sm [&_svg]:w-3 [&_svg]:h-3 gap-1",
    md: "text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2",
    lg: "text-lg/tight py-3 px-6 rounded-lg [&_svg]:w-5 [&_svg]:h-5 gap-3",
  };

  const buttonClasses = `${buttonColors[color]} ${buttonSizes[size]} flex items-center justify-center transition cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed ${props.className}`;

  return (
    <button
      {...props}
      className={buttonClasses}
    />
  );
}
