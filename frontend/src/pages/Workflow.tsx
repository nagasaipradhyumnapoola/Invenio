import { useState, useEffect } from 'react'
import { Play, Sparkles } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { startWorkflow } from '@/lib/api'
import { useWorkflow } from '@/hooks/useWorkflow'
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas'
import { CopilotPanel } from '@/components/workflow/CopilotPanel'
import { SummaryPanel } from '@/components/workflow/SummaryPanel'

export function Workflow() {
  const [searchParams] = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'
  const navigate = useNavigate()

  const [query, setQuery] = useState(isDemo ? 'Quantum Error Correction' : '')
  const [runId, setRunId] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  
  const { data: statusData, error } = useWorkflow(runId)
  const run = statusData?.run

  // Auto-start demo mode
  useEffect(() => {
    if (isDemo && !runId && !isStarting && query) {
      const timer = setTimeout(() => {
        executeRun(query)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isDemo, runId, isStarting, query])

  // Trigger summary overlay when completed and handle demo auto-redirect
  useEffect(() => {
    if (run?.status === 'completed') {
      if (!showSummary) setShowSummary(true)
      
      if (isDemo) {
        // Wait 3 seconds then auto navigate
        const timer = setTimeout(() => {
          navigate(`/workspace?run_id=${runId}`)
        }, 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [run?.status, showSummary, isDemo, navigate, runId])

  const executeRun = async (q: string) => {
    if (!q.trim()) return
    
    setIsStarting(true)
    setRunId(null)
    setShowSummary(false)
    
    try {
      const res = await startWorkflow(q.trim())
      setRunId(res.run_id)
    } catch (err) {
      console.error(err)
    } finally {
      setIsStarting(false)
    }
  }

  const handleRun = (e: React.FormEvent) => {
    e.preventDefault()
    executeRun(query)
  }

  const isWorkflowActive = runId !== null

  return (
    <div className="flex w-full h-full bg-background relative overflow-hidden">
      
      {/* Central Canvas */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Header bar overlaid */}
        <header className="absolute top-0 left-0 right-0 z-20 px-8 py-4 bg-background/60 backdrop-blur-md border-b flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AI Research Copilot</h1>
              <p className="text-xs text-muted-foreground">
                Autonomous sequential research workflow
              </p>
            </div>
          </div>

          <form onSubmit={handleRun} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter research topic..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isStarting || (run && run.status === 'running')}
              className="w-80 px-4 py-2 rounded-lg border bg-card/50 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!query.trim() || isStarting || (run && run.status === 'running')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
            >
              {isStarting ? <Sparkles className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              Run Research
            </button>
          </form>
        </header>

        {/* Canvas or Empty State */}
        {isWorkflowActive ? (
          <WorkflowCanvas nodesState={run?.nodes || []} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="p-4 bg-primary/10 rounded-full text-primary mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Ready to Orchestrate</h2>
            <p className="text-muted-foreground max-w-md">
              Enter a research topic above to launch the autonomous pipeline. The Copilot will execute search, correlation, gap detection, and hypothesis synthesis.
            </p>
          </div>
        )}
        
        {/* Error overlay */}
        {error && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg shadow-lg z-50">
            Error polling workflow: {error.message}
          </div>
        )}

        {/* Summary Modal overlay */}
        {showSummary && run?.summary && runId && (
          <SummaryPanel runId={runId} summary={run.summary} onClose={() => setShowSummary(false)} />
        )}
      </div>

      {/* Right Sidebar: Copilot Logs */}
      {isWorkflowActive && (
        <CopilotPanel logs={run?.logs || []} />
      )}
    </div>
  )
}
