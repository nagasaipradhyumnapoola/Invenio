import React from 'react'
import { PagePlaceholder } from '../components/ui/PagePlaceholder'
import { Database } from 'lucide-react'

export function SessionDashboard() {
  return (
    <PagePlaceholder
      title="Session Dashboard"
      description="Holistic overview of your research session, capturing metrics across all intelligent agents."
      icon={<Database />}
      phaseBadge="Phase 3"
      modules={[
        {
          label: 'Session Metrics',
          description: 'High-level statistics on papers parsed, hypotheses generated, and claims verified.',
          phase: 'Phase 3'
        },
        {
          label: 'Agent Diagnostics',
          description: 'Performance charts and latency metrics for each NitroStack agent (Search, Critique, etc).',
          phase: 'Phase 3'
        },
        {
          label: 'Export Hub',
          description: 'Compile the entire session into a structured markdown report, PDF, or JSON data package.',
          phase: 'Phase 3'
        }
      ]}
    />
  )
}
