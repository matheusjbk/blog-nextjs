import { formatDate, formatRelativeDate } from "@/utils/formatDate";

type PostDateProps = {
  dateTime: string;
};

export function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      dateTime={dateTime}
      className="text-slate-600 text-sm/tight dark:text-stone-500"
      title={formatRelativeDate(dateTime)}
    >
      {formatDate(dateTime)}
    </time>
  );
}
