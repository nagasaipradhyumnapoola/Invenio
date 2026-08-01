import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSessionStore } from '../store/useSessionStore'
import { useWorkflow } from '../hooks/useWorkflow'
import { EditableBlock } from '../components/workspace/EditableBlock'
import { Loader2, CheckCircle2, Clock, AlertCircle, Play, Sparkles } from 'lucide-react'

export function SessionDashboard() {
  const { query, activeSessionId, plannerStatus, packages, loadSession } = useSessionStore()
  const [inputQuery, setInputQuery] = useState(query)
  
  const { data: statusData } = useWorkflow(activeSessionId)
  const run = statusData?.run

  // Auto-run on first load if query exists and no packages
  useEffect(() => {
    if (query && !packages) {
      loadSession(query)
    }
  }, [])
  
  const getStatusIcon = (status: string) => {
    const s = status.toUpperCase()
    switch(s) {
      case 'COMPLETED': return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'RUNNING': return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case 'FAILED': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  // Trigger workspace generation when workflow actually completes
  useEffect(() => {
    if (run?.status === 'completed' && !packages) {
      const fetchWorkspace = async () => {
        try {
          const { generateWorkspace, getWorkspace } = await import('../lib/api')
          const { workspace_id } = await generateWorkspace(run.id)
          const data = await getWorkspace(workspace_id)
          
          const sections = data.workspace.sections || []
          const markdown = sections.map((s: any) => `## ${s.title}\n\n${s.content}`).join('\n\n')
          
          useSessionStore.setState({ 
            packages: {
              reportPackage: { markdown_content: `# Autonomous Research Report\n\n${markdown}` },
              researchPackage: { papers: data.workspace.raw_papers || [] },
              correlationPackage: {}, evidencePackage: {}, hypothesisPackage: {}
            } as any 
          })
        } catch (e) {
          console.error("Failed to generate workspace", e)
        }
      }
      fetchWorkspace()
    }
  }, [run?.status, run?.id, packages])

  const handleRun = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputQuery.trim()) {
      loadSession(inputQuery.trim())
    }
  }

  const isRunningStore = Object.values(plannerStatus).some(s => s === 'RUNNING')
  const isRunningBackend = run?.status === 'running'
  const isRunning = isRunningBackend || isRunningStore
  const hasStarted = query !== ''

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Header with Search Bar */}
      <header className="space-y-6 pt-4">
        <form onSubmit={handleRun} className="flex gap-3">
          <input
            type="text"
            placeholder="Enter research topic..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isRunning}
            className="flex-1 px-4 py-3 rounded-lg border bg-card/50 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isRunning}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
          >
            {isRunning ? <Sparkles className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            Run Session
          </button>
        </form>

        {hasStarted && (
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              {query}
            </h1>
            <p className="text-xl text-muted-foreground">
              Autonomous Research Session
            </p>
          </div>
        )}
      </header>

      {!hasStarted ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-primary/10 rounded-full text-primary mb-6">
            <Sparkles className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Start your Research</h2>
          <p className="text-muted-foreground max-w-lg text-lg">
            Enter a research topic in the search bar above to launch the autonomous multi-agent pipeline and generate a comprehensive research report.
          </p>
        </div>
      ) : (
        <>
          {/* Live Agent Timeline */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Multi-Agent Execution Pipeline</h3>
            {run && run.nodes ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {run.nodes.map((node) => {
                  // Get the most recent log for this agent node
                  const latestLog = run.logs.filter(l => l.node_id === node.id).pop()?.message || "Waiting for execution..."
                  return (
                    <div key={node.id} className="p-4 border rounded-lg bg-card shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">{node.label.replace(' Server', '')}</span>
                        {getStatusIcon(node.status)}
                      </div>
                      <div className="text-xs text-muted-foreground bg-primary/5 p-3 rounded-md font-mono border border-primary/10 break-words">
                        {latestLog}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
                {Object.entries(plannerStatus).map(([agent, status]) => (
                  <div key={agent} className="p-3 border rounded-lg bg-card shadow-sm flex items-center justify-between">
                    <span className="text-sm font-medium">{agent.replace('Agent', '')}</span>
                    {getStatusIcon(status)}
                  </div>
                ))}
              </div>
            )}
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
        </>
      )}
    </div>
  )
}
