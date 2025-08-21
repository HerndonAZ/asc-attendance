'use client';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/ui/ui/accordion';
import { ScrollArea, ScrollBar } from '@/ui/ui/scroll-area';
import { LogsIcon } from 'lucide-react';
import type { JSX } from 'react';
import React, { Suspense } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  children: string;
}

export function MarkdownRenderer({ children }: MarkdownRendererProps) {
  return (
    <div className="space-y-3">
      <Markdown remarkPlugins={[remarkGfm]} components={COMPONENTS}>
        {children}
      </Markdown>
    </div>
  );
}

interface HighlightedPreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: string;
  language: string;
}

const HighlightedPre = React.memo(
  ({ children, language, ...props }: HighlightedPreProps) => {
    const [tokens, setTokens] = React.useState<any[] | null>(null);

    React.useEffect(() => {
      let mounted = true;

      const loadTokens = async () => {
        try {
          const { getSingletonHighlighter: getHighlighter, bundledLanguages } =
            await import('shiki');

          // Check if language is supported
          if (!language || !(language in bundledLanguages)) {
            console.warn(`Language "${language}" is not supported by Shiki`);
            return;
          }

          const highlighter = await getHighlighter({
            themes: ['min-dark'],
            langs: [language as keyof typeof bundledLanguages]
          });

          const result = await highlighter.codeToTokens(children, {
            lang: language as keyof typeof bundledLanguages,
            themes: {
              light: 'min-dark',
              dark: 'min-dark'
            }
          });

          if (mounted) {
            setTokens(result.tokens);
          }
        } catch (error) {
          console.error('Failed to load syntax highlighting:', error);
        }
      };

      loadTokens();

      return () => {
        mounted = false;
      };
    }, [children, language]);

    if (!tokens) {
      return <pre {...props}>{children}</pre>;
    }

    return (
      <pre {...props}>
        <code>
          {tokens.map((line, lineIndex) => (
            <React.Fragment key={`line-${lineIndex}`}>
              <span>
                {line.map((token: any, tokenIndex: number) => {
                  const style =
                    typeof token.htmlStyle === 'string'
                      ? undefined
                      : token.htmlStyle;

                  return (
                    <span
                      key={`token-${lineIndex}-${tokenIndex}`}
                      className="text-shiki-light bg-shiki-light-bg dark:text-shiki-dark dark:bg-shiki-dark-bg"
                      style={style}
                    >
                      {token.content}
                    </span>
                  );
                })}
              </span>
              {lineIndex !== tokens.length - 1 && '\n'}
            </React.Fragment>
          ))}
        </code>
      </pre>
    );
  }
);
HighlightedPre.displayName = 'HighlightedCode';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
  className?: string;
  language: string;
}

const CodeBlock = ({
  children,
  className,
  language,
  ...rest
}: CodeBlockProps) => {
  const code = typeof children === 'string' ? children : String(children);

  return (
    <div className="relative w-full group/code">
      <Suspense fallback={<pre className={className}>{code}</pre>}>
        <ScrollArea>
          <pre className={cn('overflow-x-auto', className)}>
            <HighlightedPre language={language} className="rounded-md">
              {code}
            </HighlightedPre>
          </pre>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Suspense>
    </div>
  );
};

function childrenTakeAllStringContents(element: any): string {
  if (typeof element === 'string') {
    return element;
  }

  if (element?.props?.children) {
    const children = element.props.children;

    if (Array.isArray(children)) {
      return children
        .map((child) => childrenTakeAllStringContents(child))
        .join('');
    }
    return childrenTakeAllStringContents(children);
  }

  return '';
}

const COMPONENTS = {
  h1: withClass(
    'h1',
    'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mb-6 mt-8 first:mt-0',
    { slug: true }
  ),
  h2: withClass(
    'h2',
    'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-4 mt-8 first:mt-0',
    { slug: true }
  ),
  h3: withClass(
    'h3',
    'scroll-m-20 text-2xl font-semibold tracking-tight mb-3 mt-6',
    { slug: true }
  ),
  h4: withClass(
    'h4',
    'scroll-m-20 text-xl font-semibold tracking-tight mb-2 mt-4',
    { slug: true }
  ),
  h5: withClass(
    'h5',
    'scroll-m-20 text-lg font-medium tracking-tight mb-2 mt-3',
    { slug: true }
  ),
  h6: withClass(
    'h6',
    'scroll-m-20 text-base font-medium tracking-tight mb-2 mt-3',
    { slug: true }
  ),
  strong: withClass('strong', 'font-semibold'),
  em: withClass('em', 'italic'),
  a: withClass(
    'a',
    'font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors'
  ),
  blockquote: withClass(
    'blockquote',
    'mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground'
  ),
  code: ({ children, className, node, ...rest }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1].toLowerCase() : undefined;

    if (language === 'json' && children.includes('segments')) {
      return (
        <Accordion
          type="single"
          collapsible
          className="w-full border rounded-lg my-4"
        >
          <AccordionItem value="schema" className="border-none">
            <AccordionTrigger className="flex text-sm items-center gap-2 py-3 px-4 hover:no-underline">
              <div className="flex items-center gap-2">
                <LogsIcon className="w-4 h-4" />
                <span className="font-medium">Schema content</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 px-4">
              <CodeBlock className={className} language={language} {...rest}>
                {children}
              </CodeBlock>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }

    return language ? (
      <div className="my-4">
        <CodeBlock className={className} language={language} {...rest}>
          {children}
        </CodeBlock>
      </div>
    ) : (
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
        )}
        {...rest}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }: any) => children,
  ol: withClass('ol', 'my-6 ml-6 list-decimal [&>li]:mt-2'),
  ul: withClass('ul', 'my-6 ml-6 list-disc [&>li]:mt-2'),
  li: withClass('li', 'leading-7'),
  table: withClass(
    'table',
    'my-6 w-full overflow-y-auto rounded-md border border-border'
  ),
  th: withClass(
    'th',
    'border border-border px-4 py-2 text-left font-bold bg-muted/50 [&[align=center]]:text-center [&[align=right]]:text-right'
  ),
  td: withClass(
    'td',
    'border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'
  ),
  tr: withClass('tr', 'm-0 border-t border-border p-0 even:bg-muted/50'),
  p: withClass('p', 'leading-7 [&:not(:first-child)]:mt-6'),
  hr: withClass('hr', 'my-8 border-border'),
  img: withClass('img', 'rounded-lg border my-4')
};

function withClass(
  Tag: keyof JSX.IntrinsicElements,
  classes: string,
  options: { slug?: boolean } = {}
) {
  const Component = ({ node, ...props }: any) => {
    let id: string | undefined;
    if (options.slug) {
      const text = childrenTakeAllStringContents(props.children)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      id = text || undefined;
    }

    return <Tag id={id} className={classes} {...props} />;
  };
  Component.displayName = Tag;
  return Component;
}

export default MarkdownRenderer;
