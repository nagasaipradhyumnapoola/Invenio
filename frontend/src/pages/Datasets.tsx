/**
 * Datasets — Research Dataset Browser
 *
 * Phase 1: Professional placeholder layout.
 *
 * Phase 2+ Responsibilities:
 * - Browse and search research datasets
 * - Sources: Kaggle, HuggingFace, Zenodo, UCI ML Repository, domain-specific repos
 * - Filter by domain, format, size, license, and last update
 * - Dataset preview: schema, sample rows, statistics
 * - Link datasets to related papers and repositories in the knowledge graph
 *
 * @see docs/AGENTS.md — "Datasets Agent" specification
 */

import { Database } from 'lucide-react'
import { PagePlaceholder } from '@/components/ui/PagePlaceholder'

export function Datasets() {
  return (
    <PagePlaceholder
      title="Datasets"
      description="Discover, preview, and connect research datasets across scientific domains."
      icon={<Database className="w-5 h-5" />}
      phaseBadge="Phase 2"
      modules={[
        {
          label: 'Dataset Browser',
          description: 'Paginated grid of indexed datasets with source, format, size, and license.',
          phase: 'Phase 2',
        },
        {
          label: 'Search & Filter',
          description: 'Filter by domain, file format, size range, license type, and update date.',
          phase: 'Phase 2',
        },
        {
          label: 'Dataset Preview',
          description: 'Schema explorer, sample data table, and statistical summary.',
          phase: 'Phase 2',
        },
        {
          label: 'Graph Link',
          description: 'Connect this dataset to papers, repos, and concepts in the knowledge graph.',
          phase: 'Phase 3',
        },
        {
          label: 'Source Integrations',
          description: 'Kaggle, HuggingFace, Zenodo, UCI ML Repo — indexed by the Datasets Nitro agent.',
          phase: 'Phase 2',
        },
        {
          label: 'Download & Cite',
          description: 'Download instructions and auto-generated citation for any dataset.',
          phase: 'Phase 2',
        },
      ]}
    />
  )
}
