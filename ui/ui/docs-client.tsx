'use client';

import MarkdownRenderer from '@/ui/ui/markdown-renderer';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DocsPageProps {
  markdownContent: string;
  headings: Array<{ id: string; title: string; level: number }>;
}

export default function DocsPageClient({
  markdownContent,
  headings
}: DocsPageProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's most visible (highest intersection ratio)
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );
          setActiveId(mostVisible.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -35% 0px', // Trigger when heading is in the middle third of viewport
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="md:w-72 md:border-r md:border-border bg-card/50 backdrop-blur-sm md:sticky md:top-0 md:h-screen">
        <div className="p-6 border-b border-border mt-4">
          <h2 className="font-semibold text-lg text-foreground">
            Documentation
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Navigate through sections
          </p>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-6rem)]">
          {headings.map(({ id, title, level }) => {
            const isActive = activeId === id;
            return (
              <Link
                key={id}
                href={`#${id}`}
                className={`
                  block py-2 px-3 rounded-md text-sm transition-all duration-200 
                  hover:bg-accent hover:text-accent-foreground
                  focus:bg-accent focus:text-accent-foreground focus:outline-none
                  ${isActive ? 'bg-accent text-accent-foreground' : ''}
                  ${level === 1 ? 'font-semibold text-foreground border-l-2' : ''}
                  ${level === 1 && isActive ? 'border-primary' : level === 1 ? 'border-primary/40' : ''}
                  ${level === 2 ? 'font-medium text-foreground/90 ml-2' : ''}
                  ${level === 3 ? 'text-muted-foreground ml-4' : ''}
                  ${level === 4 ? 'text-muted-foreground ml-6' : ''}
                  ${level >= 5 ? 'text-muted-foreground/80 ml-8' : ''}
                `}
              >
                <span className="flex items-center gap-2">
                  {level === 1 && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive ? 'bg-primary' : 'bg-primary/40'
                      }`}
                    />
                  )}
                  {level === 2 && (
                    <div
                      className={`w-1 h-1 rounded-full transition-colors ${
                        isActive ? 'bg-primary' : 'bg-primary/60'
                      }`}
                    />
                  )}
                  {level >= 3 && (
                    <div
                      className={`w-0.5 h-0.5 rounded-full transition-colors ${
                        isActive ? 'bg-primary' : 'bg-muted-foreground'
                      }`}
                    />
                  )}
                  <span className="truncate">{title}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <article className="flex-1 p-6 md:p-12 bg-background overflow-x-auto">
        <div className="max-w-4xl mx-auto">
          <MarkdownRenderer>{markdownContent}</MarkdownRenderer>
        </div>
      </article>
    </div>
  );
}
