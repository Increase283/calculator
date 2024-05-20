"use client";
import { MemoizedReactMarkdown } from "./markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export const Solution = ({ answer }: { answer: string | null | undefined }) => {
  return (
    <div>
      <div className="flex-1 space-y-2 overflow-hidden rounded-lg bg-muted p-6">
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            code({ className, children: propsChildren, ...props }) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
              const children = propsChildren as unknown as any;

              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              if (children?.length) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                }

                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              // const match = /language-(\w+)/.exec(className ?? "");

              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );

              return (
                <div>{String(children).replace(/\n$/, "")}</div>
                // <CodeBlock
                //   key={Math.random()}
                //   language={(match?.[1]) || ''}
                //   value={String(children).replace(/\n$/, '')}
                //   {...props}
                // />
              );
            },
          }}
        >
          {answer}
        </MemoizedReactMarkdown>
        {/* <ChatMessageActions message={message} /> */}
      </div>
    </div>
  );
};
