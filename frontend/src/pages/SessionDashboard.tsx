import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useSessionStore } from '../store/useSessionStore'
import { EditableBlock } from '../components/workspace/EditableBlock'
import { Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export function SessionDashboard() {
  const { query, plannerStatus, packages } = useSessionStore()
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'COMPLETED': return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'RUNNING': return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case 'FAILED': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          {query}
        </h1>
        <p className="text-xl text-muted-foreground">
          Autonomous Research Session
        </p>
      </header>

      {/* Live Agent Timeline */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Multi-Agent Execution Pipeline</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(plannerStatus).map(([agent, status]) => (
            <div key={agent} className="p-3 border rounded-lg bg-card shadow-sm flex items-center justify-between">
              <span className="text-sm font-medium">{agent.replace('Agent', '')}</span>
              {getStatusIcon(status)}
            </div>
          ))}
        </div>
      </section>

      {/* Report Package Blocks */}
      <section className="space-y-2 mt-12">
        {!packages?.reportPackage ? (
          <div className="py-12 flex flex-col items-center justify-center text-muted-foreground space-y-4">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p>Synthesizing research packages into final report...</p>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {/* Split markdown by headers or double newlines to make them distinct Editable Blocks */}
            {packages.reportPackage.markdown_content.split('\n\n').map((blockStr: string, idx: number) => (
              <EditableBlock key={idx}>
                <ReactMarkdown>{blockStr}</ReactMarkdown>
              </EditableBlock>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
