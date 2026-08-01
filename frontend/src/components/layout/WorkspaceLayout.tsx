import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'
import { useSessionStore } from '../../store/useSessionStore'
import { X, ExternalLink, Lightbulb, Activity, Database, CheckCircle2 } from 'lucide-react'

export function WorkspaceLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [inspectorOpen, setInspectorOpen] = useState(false)
  
  const { activeInspectorNode, setInspectorNode, loadSession, query, packages } = useSessionStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Open inspector automatically if a node is selected
    if (activeInspectorNode) {
      setInspectorOpen(true)
    }
  }, [activeInspectorNode])

  // Fake initial session load
  useEffect(() => {
    loadSession()
  }, [])

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* ── Left Sidebar ──────────────────────────────── */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />

      {/* ── Center Workspace ──────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative border-r border-border/40">
        <TopNav />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6" id="main-content">
          <Outlet />
        </main>
      </div>

      {/* ── Right Inspector Sidebar ───────────────────── */}
      {inspectorOpen && (
        <aside className="w-80 h-full flex flex-col bg-card border-l border-border/40 shadow-sm transition-all animate-in slide-in-from-right-8 duration-200">
          <div className="flex items-center justify-between p-4 border-b border-border/40">
            <h3 className="font-semibold text-sm">Context Inspector</h3>
            <button 
              onClick={() => {
                setInspectorOpen(false)
                setInspectorNode(null)
              }}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {!activeInspectorNode ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-50">
                <Activity className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Select any node, paper, or claim to inspect properties here.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">
                    {activeInspectorNode.id || activeInspectorNode.title || 'Selected Entity'}
                  </h4>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-transparent">
                    {activeInspectorNode.type || 'Entity'}
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-sm font-semibold flex items-center gap-2">
                    <Database className="w-4 h-4" /> Properties
                  </h5>
                  <div className="bg-muted/50 rounded-lg p-3 text-sm font-mono break-all space-y-2">
                    {Object.entries(activeInspectorNode).map(([key, value]) => {
                      if (key === 'id' || key === 'type') return null;
                      if (typeof value === 'object') return null;
                      return (
                        <div key={key} className="flex flex-col">
                          <span className="text-muted-foreground text-xs">{key}</span>
                          <span className="text-foreground">{String(value)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2">
                  <Lightbulb className="w-4 h-4 mr-2" /> Find Related
                </button>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  )
}
