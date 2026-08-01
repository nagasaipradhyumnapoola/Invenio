import { ISearchFilters } from '@/types'

interface FilterPanelProps {
  filters: Partial<ISearchFilters>
  onFilterChange: (filters: Partial<ISearchFilters>) => void
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const sources = [
    { id: 'all', label: 'All Sources' },
    { id: 'openalex', label: 'OpenAlex' },
    { id: 'arxiv', label: 'arXiv' },
    { id: 'crossref', label: 'Crossref' },
  ]

  return (
    <div className="w-full md:w-64 space-y-6">
      <div>
        <h4 className="font-semibold mb-3 text-sm tracking-tight">Source</h4>
        <div className="space-y-2">
          {sources.map((source) => (
            <label key={source.id} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
              <input
                type="radio"
                name="source"
                value={source.id}
                checked={(filters.source || 'all') === source.id}
                onChange={(e) => {
                  const val = e.target.value === 'all' ? undefined : (e.target.value as any)
                  onFilterChange({ source: val })
                }}
                className="w-4 h-4 text-primary border-input bg-background focus:ring-primary"
              />
              <span>{source.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Note: This is the Phase 2 Discovery Engine. Year and citation filters will be added in Phase 3 along with advanced Knowledge Graph filtering.
        </p>
      </div>
    </div>
  )
}
