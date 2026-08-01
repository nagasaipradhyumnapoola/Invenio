interface SourceBadgeProps {
  source: 'openalex' | 'arxiv' | 'crossref'
}

export function SourceBadge({ source }: SourceBadgeProps) {
  const config = {
    openalex: { label: 'OpenAlex', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    arxiv: { label: 'arXiv', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    crossref: { label: 'Crossref', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  }

  const { label, color } = config[source] || { label: source, color: 'bg-muted text-muted-foreground' }

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${color}`}>
      {label}
    </span>
  )
}
