import { motion } from 'framer-motion'
import { FileText, CheckCircle2, FlaskConical, Network, Lightbulb } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface SummaryPanelProps {
  runId: string
  summary: Record<string, any>
  onClose: () => void
}

export function SummaryPanel({ runId, summary, onClose }: SummaryPanelProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border shadow-2xl rounded-2xl p-6 w-[500px] z-50"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
          <h2 className="text-lg font-bold">Research Workflow Complete</h2>
        </div>
        <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">
          Dismiss
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-muted/50 rounded-xl border flex flex-col items-center justify-center text-center">
          <FlaskConical className="w-5 h-5 text-blue-500 mb-1" />
          <span className="text-2xl font-bold">{summary.total_papers || 0}</span>
          <span className="text-xs text-muted-foreground">Papers</span>
        </div>
        <div className="p-3 bg-muted/50 rounded-xl border flex flex-col items-center justify-center text-center">
          <Network className="w-5 h-5 text-purple-500 mb-1" />
          <span className="text-2xl font-bold">{summary.gaps_found || 0}</span>
          <span className="text-xs text-muted-foreground">Gaps Found</span>
        </div>
        <div className="p-3 bg-muted/50 rounded-xl border flex flex-col items-center justify-center text-center">
          <Lightbulb className="w-5 h-5 text-amber-500 mb-1" />
          <span className="text-2xl font-bold">{summary.opportunities_found || 0}</span>
          <span className="text-xs text-muted-foreground">Opportunities</span>
        </div>
      </div>

      {summary.ready_for_report && (
        <button 
          onClick={() => navigate(`/workspace?run_id=${runId}`)}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(var(--primary),0.3)]"
        >
          <FileText className="w-4 h-4" />
          Open Research Workspace
        </button>
      )}
    </motion.div>
  )
}
