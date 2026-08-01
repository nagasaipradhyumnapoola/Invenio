import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Maximize2, Minimize2, Layers, Search, FlaskConical, Network, BookOpenCheck, Database, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSessionStore } from '@/store/useSessionStore';

// Isometric container style
const isometricStyle = {
  transform: 'rotateX(60deg) rotateY(0deg) rotateZ(-45deg)',
  transformStyle: 'preserve-3d' as const,
};

// Agent configuration
const AGENTS = [
  { id: 'research', label: 'Research MCP', icon: FlaskConical, color: 'text-blue-500', bg: 'bg-blue-500/20', border: 'border-blue-500/50' },
  { id: 'correlation', label: 'Correlation', icon: Network, color: 'text-purple-500', bg: 'bg-purple-500/20', border: 'border-purple-500/50' },
  { id: 'evidence', label: 'Evidence', icon: BookOpenCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/20', border: 'border-emerald-500/50' },
  { id: 'knowledge', label: 'Knowledge Graph', icon: Database, color: 'text-amber-500', bg: 'bg-amber-500/20', border: 'border-amber-500/50' },
  { id: 'report', label: 'Report MCP', icon: FileText, color: 'text-rose-500', bg: 'bg-rose-500/20', border: 'border-rose-500/50' },
];

export function NitroProcessWidget() {
  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1); // -1: inactive, 0: intent, 1: planning, 2: agents, 3: output
  const [activeAgentIdx, setActiveAgentIdx] = useState<number>(0);
  
  // Tie this to the actual session store status if possible.
  // For now, since generateWorkspace is async, we can check a generic "isGenerating" flag if we had one.
  // We'll simulate a pipeline sequence when expanded just for visualization.
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (expanded) {
      setActiveStep(0);
      interval = setInterval(() => {
        setActiveStep(prev => {
          if (prev >= 3) return 0;
          if (prev === 2) {
            // Cycle through agents
            setActiveAgentIdx(a => (a + 1) % AGENTS.length);
          }
          return prev + 1;
        });
      }, 2000);
    } else {
      setActiveStep(-1);
    }
    return () => clearInterval(interval);
  }, [expanded]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-4 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl p-8 pointer-events-auto overflow-hidden relative"
            style={{ width: 400, height: 500 }}
          >
            {/* Header */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-sm">Nitro Orchestration</h3>
              </div>
              <button 
                onClick={() => setExpanded(false)}
                className="p-1 hover:bg-muted rounded-md transition-colors"
              >
                <Minimize2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* 3D Container */}
            <div className="absolute inset-0 flex items-center justify-center mt-12">
              <div style={isometricStyle} className="relative w-64 h-64">
                
                {/* Layer 1: Studio UI */}
                <motion.div 
                  className={cn(
                    "absolute inset-0 bg-card/80 border-2 rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-500",
                    activeStep === 0 ? "border-primary shadow-[0_0_30px_rgba(var(--primary),0.3)]" : "border-border"
                  )}
                  style={{ transform: 'translateZ(120px)' }}
                >
                  <div className="text-center">
                    <Layers className={cn("w-8 h-8 mx-auto mb-2", activeStep === 0 ? "text-primary" : "text-muted-foreground")} />
                    <span className="text-xs font-bold font-mono">Gateway MCP</span>
                  </div>
                </motion.div>

                {/* Layer 2: Planner Agent */}
                <motion.div 
                  className={cn(
                    "absolute inset-0 bg-muted/80 border-2 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-500",
                    activeStep === 1 ? "border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)]" : "border-border"
                  )}
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <div className="grid grid-cols-2 gap-2 w-full px-4">
                    <div className="bg-background/50 border rounded p-2 text-center text-[10px] font-mono">Intent</div>
                    <div className="bg-background/50 border rounded p-2 text-center text-[10px] font-mono">Plan</div>
                  </div>
                  <span className="text-xs font-bold mt-2 font-mono text-indigo-400">Autonomous Planner</span>
                </motion.div>

                {/* Layer 3: FastMCP Servers (The Grid) */}
                <motion.div 
                  className={cn(
                    "absolute inset-0 bg-background/90 border-2 rounded-lg p-2 backdrop-blur-sm transition-all duration-500",
                    activeStep === 2 ? "border-primary" : "border-border"
                  )}
                  style={{ transform: 'translateZ(0px)' }}
                >
                  <div className="grid grid-cols-2 gap-2 h-full">
                    {AGENTS.map((agent, idx) => {
                      const Icon = agent.icon;
                      const isWorking = activeStep === 2 && activeAgentIdx === idx;
                      return (
                        <div 
                          key={agent.id}
                          className={cn(
                            "rounded border flex flex-col items-center justify-center transition-all duration-300",
                            isWorking ? `${agent.bg} ${agent.border} scale-105 shadow-lg` : "bg-muted/30 border-border/50 opacity-50"
                          )}
                        >
                          <Icon className={cn("w-6 h-6 mb-1", isWorking ? agent.color : "text-muted-foreground")} />
                          <span className="text-[9px] font-mono text-center px-1 leading-tight">{agent.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Connecting Lines / Data Flow (Simulated via drop shadows) */}
                <div className="absolute inset-0 -z-10 shadow-[0_0_100px_rgba(0,0,0,0.5)]" style={{ transform: 'translateZ(-20px)' }} />

              </div>
            </div>

            {/* Status Footer */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 border-t border-border/50 pt-3 bg-background/50">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", activeStep !== -1 ? "bg-primary" : "bg-muted-foreground")}></span>
                  <span className={cn("relative inline-flex rounded-full h-2 w-2", activeStep !== -1 ? "bg-primary" : "bg-muted-foreground")}></span>
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {activeStep === -1 ? 'IDLE' : (activeStep === 0 ? 'ANALYZING INTENT' : (activeStep === 1 ? 'PLANNING DAG' : (activeStep === 2 ? `RUNNING ${AGENTS[activeAgentIdx].label.toUpperCase()}` : 'SYNTHESIZING')))}
                </span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-200"
        >
          <Cpu className="w-5 h-5" />
          <span className="absolute right-full mr-3 whitespace-nowrap bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            View Nitro Architecture
          </span>
        </button>
      )}
    </div>
  );
}
