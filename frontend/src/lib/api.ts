import { ISearchFilters, ISearchResponse } from '@/types'

// ─── OpenAlex direct search (free, no key needed) ──────────────────────────
async function searchOpenAlex(query: string, limit = 20): Promise<any[]> {
  const params = new URLSearchParams({
    search: query,
    per_page: String(Math.min(limit, 25)),
    select: 'id,title,authorships,publication_year,primary_location,open_access,cited_by_count,abstract_inverted_index',
  })
  const url = `https://api.openalex.org/works?${params}&mailto=invenio@example.com`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`OpenAlex error: ${res.status}`)
  const data = await res.json()

  return (data.results ?? []).map((w: any) => {
    // Reconstruct abstract from inverted index
    let abstract = ''
    if (w.abstract_inverted_index) {
      const positions: { word: string; pos: number }[] = []
      for (const [word, posList] of Object.entries(w.abstract_inverted_index as Record<string, number[]>)) {
        for (const pos of posList) positions.push({ word, pos })
      }
      abstract = positions.sort((a, b) => a.pos - b.pos).map(p => p.word).join(' ')
    }

    return {
      id: w.id,
      title: w.title ?? 'Untitled',
      authors: (w.authorships ?? []).slice(0, 5).map((a: any) => ({
        name: a.author?.display_name ?? 'Unknown',
      })),
      year: w.publication_year ?? null,
      abstract: abstract || 'No abstract available.',
      source: 'OpenAlex',
      url: w.primary_location?.landing_page_url ?? w.id,
      citations: w.cited_by_count ?? 0,
      openAccess: w.open_access?.is_oa ?? false,
      journal: w.primary_location?.source?.display_name ?? null,
    }
  })
}

// ─── arXiv direct search (public API) ──────────────────────────────────────
async function searchArXiv(query: string, limit = 10): Promise<any[]> {
  const params = new URLSearchParams({
    search_query: `all:${query}`,
    start: '0',
    max_results: String(Math.min(limit, 15)),
    sortBy: 'relevance',
  })
  const url = `https://export.arxiv.org/api/query?${params}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`arXiv error: ${res.status}`)
  const text = await res.text()

  const parser = new DOMParser()
  const xml = parser.parseFromString(text, 'application/xml')
  const entries = Array.from(xml.querySelectorAll('entry'))

  return entries.map((entry) => {
    const id = entry.querySelector('id')?.textContent ?? ''
    const authors = Array.from(entry.querySelectorAll('author name')).map(n => ({ name: n.textContent ?? '' }))
    const published = entry.querySelector('published')?.textContent ?? ''
    const year = published ? new Date(published).getFullYear() : null
    return {
      id,
      title: entry.querySelector('title')?.textContent?.trim() ?? 'Untitled',
      authors: authors.slice(0, 5),
      year,
      abstract: entry.querySelector('summary')?.textContent?.trim() ?? 'No abstract available.',
      source: 'arXiv',
      url: id,
      citations: 0,
      openAccess: true,
      journal: 'arXiv',
    }
  })
}

// ─── Crossref direct search ─────────────────────────────────────────────────
async function searchCrossref(query: string, limit = 10): Promise<any[]> {
  const params = new URLSearchParams({
    query,
    rows: String(Math.min(limit, 15)),
    select: 'DOI,title,author,published,abstract,is-referenced-by-count,container-title',
  })
  const url = `https://api.crossref.org/works?${params}&mailto=invenio@example.com`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Crossref error: ${res.status}`)
  const data = await res.json()

  return (data.message?.items ?? []).map((item: any) => {
    const year = item.published?.['date-parts']?.[0]?.[0] ?? null
    return {
      id: `https://doi.org/${item.DOI}`,
      title: (item.title ?? ['Untitled'])[0],
      authors: (item.author ?? []).slice(0, 5).map((a: any) => ({
        name: [a.given, a.family].filter(Boolean).join(' ') || 'Unknown',
      })),
      year,
      abstract: item.abstract?.replace(/<[^>]+>/g, '') ?? 'No abstract available.',
      source: 'Crossref',
      url: `https://doi.org/${item.DOI}`,
      citations: item['is-referenced-by-count'] ?? 0,
      openAccess: false,
      journal: (item['container-title'] ?? [])[0] ?? null,
    }
  })
}

// ─── Federated search: OpenAlex + arXiv + Crossref in parallel ─────────────
export async function searchPapers(filters: ISearchFilters): Promise<ISearchResponse> {
  const { query, source, limit = 30 } = filters
  const perSource = Math.ceil(limit / 3)

  let results: any[] = []

  if (!source || source === 'openalex') {
    const openalex = await searchOpenAlex(query, source ? limit : perSource).catch(() => [])
    results.push(...openalex)
  }

  if (!source || source === 'arxiv') {
    const arxiv = await searchArXiv(query, source ? limit : perSource).catch(() => [])
    results.push(...arxiv)
  }

  if (!source || source === 'crossref') {
    const crossref = await searchCrossref(query, source ? limit : perSource).catch(() => [])
    results.push(...crossref)
  }

  // Deduplicate by title similarity
  const seen = new Set<string>()
  results = results.filter(p => {
    const key = (p.title ?? '').toLowerCase().slice(0, 60)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return {
    papers: results,
    total: results.length,
    query,
  }
}

// ─── Backend stubs — no-ops since backend is not running ────────────────────
export async function fetchCorrelationGraph(_query: string): Promise<any> {
  return { nodes: [], edges: [] }
}

export async function startWorkflow(_query: string): Promise<{ run_id: string }> {
  return { run_id: '' }
}

export async function getWorkflowStatus(_runId: string): Promise<any> {
  return null
}

export async function generateWorkspace(_runId: string): Promise<{ workspace_id: string }> {
  return { workspace_id: '' }
}

export async function getWorkspace(_workspaceId: string): Promise<any> {
  return null
}

export async function exportWorkspace(_workspaceId: string, _format: string): Promise<{ content: string }> {
  return { content: '' }
}
