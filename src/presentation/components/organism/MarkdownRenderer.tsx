import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownRendererProps = {
  content: string
  className?: string
  emptyMessage?: string
}

const markdownComponents = {
  h1: ({ children, ...props }: React.ComponentProps<'h1'>) => (
    <h1 className="mb-4 text-3xl font-bold" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.ComponentProps<'h2'>) => (
    <h2 className="mb-3 text-2xl font-semibold" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.ComponentProps<'h3'>) => (
    <h3 className="mb-3 text-xl font-semibold" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.ComponentProps<'p'>) => (
    <p className="mb-4 leading-7 text-foreground/90 last:mb-0" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.ComponentProps<'ul'>) => (
    <ul className="mb-4 list-disc space-y-2 pl-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.ComponentProps<'ol'>) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.ComponentProps<'li'>) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="mb-4 border-l-4 border-primary/60 pl-4 italic text-foreground/75"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ children, ...props }: React.ComponentProps<'a'>) => (
    <a
      className="text-primary underline underline-offset-4 hover:opacity-80"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  code: ({ children, className, ...props }: React.ComponentProps<'code'>) => (
    <code
      className={`rounded bg-muted px-1.5 py-0.5 font-mono text-sm ${className ?? ''}`}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.ComponentProps<'pre'>) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm leading-6"
      {...props}
    >
      {children}
    </pre>
  ),
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
  emptyMessage = 'Ainda não há conteúdo em Markdown para exibir.',
}) => {
  if (!content.trim()) {
    return <p className="text-sm text-foreground/50">{emptyMessage}</p>
  }

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}