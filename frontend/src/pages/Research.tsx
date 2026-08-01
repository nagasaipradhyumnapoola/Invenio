import { useState } from 'react'
import { ISearchFilters } from '@/types'
import { useResearch } from '@/hooks/useResearch'
import { SearchBar } from '@/components/research/SearchBar'
import { FilterPanel } from '@/components/research/FilterPanel'
import { PaperCard } from '@/components/research/PaperCard'
import { PaperCardSkeleton } from '@/components/research/PaperCardSkeleton'
import { EmptyState } from '@/components/research/EmptyState'
import { FlaskConical } from 'lucide-react'

export function Research() {
  const [filters, setFilters] = useState<ISearchFilters>({ query: '' })

  const { data, isLoading, error } = useResearch(filters)

  const handleSearch = (newFilters: Partial<ISearchFilters>) => {
    setFilters((prev: ISearchFilters) => ({ ...prev, ...newFilters }))
  }

  // Determine which state to show
  const showInitial = !filters.query && !isLoading && !data
  const showLoading = isLoading
  const showError = !!error
  const showEmpty = data && data.papers.length === 0
  const showResults = data && data.papers.length > 0

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <header className="px-8 py-6 border-b flex-shrink-0 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Research Discovery</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Search across OpenAlex, arXiv, and Crossref simultaneously.
            </p>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} initialQuery={filters.query} />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Filters */}
        <aside className="hidden md:block w-64 border-r bg-card/30 p-6 overflow-y-auto">
          <FilterPanel filters={filters} onFilterChange={handleSearch} />
        </aside>

        {/* Results Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-4">
            
            {showInitial && <EmptyState type="initial" />}
            
            {showError && <EmptyState type="error" message={error?.message} />}
            
            {showLoading && (
              <>
                <PaperCardSkeleton />
                <PaperCardSkeleton />
                <PaperCardSkeleton />
                <PaperCardSkeleton />
              </>
            )}
            
            {showEmpty && <EmptyState type="empty" />}
            
            {showResults && (
              <>
                <div className="text-sm text-muted-foreground mb-4">
                  Found {data.total} results
                  {filters.source && <span> for source '{filters.source}'</span>}
                </div>
                
                <div className="space-y-4">
                  {data.papers.map((paper: any) => (
                    <PaperCard key={paper.id} paper={paper} />
                  ))}
                </div>
              </>
            )}
            
          </div>
        </main>
      </div>
    </div>
  )
}
