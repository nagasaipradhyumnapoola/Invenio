import { IPaper } from '@/types'
import { SourceBadge } from './SourceBadge'
import { FileText, ExternalLink, Calendar, Quote } from 'lucide-react'

interface PaperCardProps {
  paper: IPaper
}

export function PaperCard({ paper }: PaperCardProps) {
  const authorNames = paper.authors.map((a) => a.name).join(', ')

  return (
    <div className="p-4 border rounded-lg bg-card text-card-foreground hover:border-primary/50 transition-colors shadow-sm">
      <div className="flex justify-between items-start gap-4 mb-2">
        <h3 className="text-lg font-semibold leading-tight">{paper.title}</h3>
        <SourceBadge source={paper.source} />
      </div>

      <div className="text-sm text-muted-foreground mb-3 line-clamp-1">
        {authorNames || 'Unknown Authors'}
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
        {paper.year && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {paper.year}
          </div>
        )}
        {paper.journal && (
          <div className="flex items-center gap-1 font-medium">
            {paper.journal}
          </div>
        )}
        <div className="flex items-center gap-1">
          <Quote className="w-3 h-3" />
          {paper.citation_count} citations
        </div>
      </div>

      {paper.abstract && (
        <p className="text-sm text-foreground/80 line-clamp-3 mb-4 leading-relaxed">
          {paper.abstract}
        </p>
      )}

      {paper.keywords && paper.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {paper.keywords.slice(0, 5).map((kw, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {kw}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-auto pt-2">
        {paper.url && (
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Source
          </a>
        )}
        {paper.pdf_url && (
          <a
            href={paper.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive hover:underline"
          >
            <FileText className="w-3.5 h-3.5" />
            PDF
          </a>
        )}
        {paper.doi && (
          <span className="text-xs text-muted-foreground flex items-center">
            DOI: {paper.doi}
          </span>
        )}
      </div>
    </div>
  )
}
