import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type SafeMarkdownProps = {
  markdown: string;
};

export function SafeMarkdown({ markdown }: SafeMarkdownProps) {
  return (
    <div className="prose prose-slate w-full max-w-none prose-img:mx-auto prose-a:transition prose-a:text-blue-500 prose-a:no-underline prose-a:hover:text-blue-700 prose-a:hover:underline overflow-hidden lg:prose-lg">
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return "";

            return (
              <div className="overflow-x-auto">
                <table
                  className="w-full min-w-xl"
                  {...props}
                />
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
