type PostHeadingProps = {
  children: React.ReactNode;
  as: "h1" | "h2" | "h3";
};

export function PostHeading({ children, as: Heading }: PostHeadingProps) {
  const headingClassesMap = {
    h1: "text-4xl/tight font-extrabold sm:text-6xl",
    h2: "text-2xl/tight font-extrabold sm:text-4xl",
    h3: "text-lg/tight font-bold sm:text-2xl",
  };

  return <Heading className={headingClassesMap[Heading]}>{children}</Heading>;
}
