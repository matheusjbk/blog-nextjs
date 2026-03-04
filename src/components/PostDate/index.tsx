import { formatDate, formatRelativeDate } from "@/utils/formatDate";

type PostDateProps = {
  dateTime: string;
};

export async function PostDate({ dateTime }: PostDateProps) {
  "use cache";

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
