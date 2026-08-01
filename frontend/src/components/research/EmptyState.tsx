import { FlaskConical, SearchX, AlertCircle } from 'lucide-react'

interface EmptyStateProps {
  type: 'empty' | 'error' | 'initial'
  message?: string
}

export function EmptyState({ type, message }: EmptyStateProps) {
  const config = {
    initial: {
      icon: <FlaskConical className="w-12 h-12 text-muted-foreground/50" />,
      title: 'Discover Research',
      description: 'Search across OpenAlex, arXiv, and Crossref simultaneously.',
    },
    empty: {
      icon: <SearchX className="w-12 h-12 text-muted-foreground/50" />,
      title: 'No results found',
      description: 'Try adjusting your search terms or filters.',
    },
    error: {
      icon: <AlertCircle className="w-12 h-12 text-destructive/50" />,
      title: 'Something went wrong',
      description: message || 'Failed to fetch research results. Please try again.',
    },
  }

  const { icon, title, description } = config[type]

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="bg-muted/50 p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-sm">
        {description}
      </p>
    </div>
  )
}
