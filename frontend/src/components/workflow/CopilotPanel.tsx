import { IExecutionLog } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface CopilotPanelProps {
  logs: IExecutionLog[]
}

export function CopilotPanel({ logs }: CopilotPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom as logs come in
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="w-80 h-full bg-card/80 backdrop-blur-md border-l flex flex-col pointer-events-auto">
      <div className="p-4 border-b flex items-center gap-2 bg-muted/30">
        <Terminal className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-sm">Research Copilot</h3>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-2 rounded-lg border ${
                log.level === 'error' ? 'bg-destructive/10 border-destructive/30 text-destructive' :
                log.level === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-500' :
                'bg-muted border-border/50 text-foreground'
              }`}
            >
              <div className="opacity-50 text-[10px] mb-1">
                {new Date(log.timestamp).toLocaleTimeString()}
              </div>
              <div>{log.message}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {logs.length === 0 && (
          <div className="text-muted-foreground italic opacity-50 text-center mt-10">
            Awaiting workflow execution...
          </div>
        )}
      </div>
    </div>
  )
}
