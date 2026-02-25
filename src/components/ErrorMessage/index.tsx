type ErrorMessageProps = {
  pageTitle: string;
  contentTitle: string;
  content: React.ReactNode;
};

export function ErrorMessage({
  pageTitle,
  contentTitle,
  content,
}: ErrorMessageProps) {
  return (
    <>
      <title>{pageTitle}</title>
      <div className="flex items-center justify-center text-center min-h-80 bg-slate-900 text-slate-100 rounded-xl mb-16 p-8 dark:bg-slate-100 dark:text-stone-950">
        <div>
          <h1 className="text-8xl font-extrabold mb-4">{contentTitle}</h1>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
}
