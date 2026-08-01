import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { ISearchFilters } from '@/types'

interface SearchBarProps {
  onSearch: (filters: Partial<ISearchFilters>) => void
  initialQuery?: string
}

export function SearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== initialQuery) {
        onSearch({ query })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query, onSearch, initialQuery])

  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="search"
        className="block w-full p-4 pl-10 text-sm border rounded-lg bg-background border-input focus:ring-primary focus:border-primary placeholder:text-muted-foreground"
        placeholder="Search for papers, e.g., 'protein folding' or 'transformer models'..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
