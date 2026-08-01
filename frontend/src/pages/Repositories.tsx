/**
 * Repositories — Code Repository Browser
 *
 * Phase 1: Professional placeholder layout.
 *
 * Phase 2+ Responsibilities:
 * - Browse and search code repositories
 * - Sources: GitHub, GitLab, Hugging Face Spaces, Papers with Code
 * - Filter by language, stars, topic, license, and last commit
 * - Repository detail: README preview, dependency analysis, linked papers
 * - Link repositories to datasets and papers in the knowledge graph
 *
 * @see docs/AGENTS.md — "Repositories Agent" specification
 */

import { GitBranch } from 'lucide-react'
import { PagePlaceholder } from '@/components/ui/PagePlaceholder'

export function Repositories() {
  return (
    <PagePlaceholder
      title="Repositories"
      description="Discover code implementations and engineering resources connected to research."
      icon={<GitBranch className="w-5 h-5" />}
      phaseBadge="Phase 2"
      modules={[
        {
          label: 'Repo Browser',
          description: 'Grid of indexed repositories with language, stars, forks, and topics.',
          phase: 'Phase 2',
        },
        {
          label: 'Search & Filter',
          description: 'Filter by programming language, star count, license, topic, and activity.',
          phase: 'Phase 2',
        },
        {
          label: 'Repo Detail',
          description: 'README preview, dependency tree, linked papers, and dataset associations.',
          phase: 'Phase 2',
        },
        {
          label: 'Papers with Code',
          description: 'Direct integration with Papers with Code to surface implementations.',
          phase: 'Phase 2',
        },
        {
          label: 'Dependency Analysis',
          description: 'Analyze package dependencies to discover shared technical foundations.',
          phase: 'Phase 4',
        },
        {
          label: 'Graph Link',
          description: 'Connect any repository to papers, datasets, and concepts in the knowledge graph.',
          phase: 'Phase 3',
        },
      ]}
    />
  )
}
