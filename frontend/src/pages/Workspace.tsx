import React from 'react'
import { PagePlaceholder } from '../components/ui/PagePlaceholder'
import { LayoutDashboard } from 'lucide-react'

export function Workspace() {
  return (
    <PagePlaceholder
      title="Active Workspace"
      description="The central command center for your current research project. Organize sources, papers, and intelligent workflows in one unified view."
      icon={<LayoutDashboard />}
      phaseBadge="Phase 2"
      modules={[
        {
          label: 'Data Source Manager',
          description: 'Upload local PDFs, connect to Zotero libraries, or link specific OpenAlex queries to bound your workspace context.',
          phase: 'Phase 2'
        },
        {
          label: 'Active Pipelines',
          description: 'Monitor currently running agent workflows. Watch the Planner coordinate tasks between the Researcher, Critiquer, and Synthesizer.',
          phase: 'Phase 2'
        },
        {
          label: 'Workspace Configuration',
          description: 'Set system prompts, configure max agent iterations, and define the specific goals for this research workspace.',
          phase: 'Phase 2'
        }
      ]}
    />
  )
}
