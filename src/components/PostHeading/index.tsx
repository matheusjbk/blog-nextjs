import Link from "next/link";

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as: "h1" | "h2" | "h3";
};

export function PostHeading({ children, url, as: Heading }: PostHeadingProps) {
  const headingClassesMap = {
    h1: "text-4xl/tight font-extrabold sm:text-6xl",
    h2: "text-2xl/tight font-bold sm:text-4xl",
    h3: "text-lg/tight font-bold sm:text-xl",
  };

  return (
    <Heading className={headingClassesMap[Heading]}>
      <Link
        className="hover:text-slate-600 transition"
        href={url}
      >
        {children}
      </Link>
    </Heading>
  );
}
