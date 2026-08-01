import React from 'react'
import { useSessionStore } from '../store/useSessionStore'
import { AlertTriangle, ThumbsUp, Scale, AlertCircle } from 'lucide-react'

export function EvidenceView() {
  const { packages, setInspectorNode } = useSessionStore()
  
  if (!packages?.evidencePackage) {
    return <div className="p-12 text-center text-muted-foreground">Waiting for Evidence Agent...</div>
  }

  const { claims = [], contradictions = [], consensus_findings = [] } = packages.evidencePackage

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <header>
        <h1 className="text-3xl font-bold">Evidence Intelligence</h1>
        <p className="text-muted-foreground">Extracted {claims.length} claims and detected {contradictions.length} contradictions.</p>
      </header>

      {/* Contradictions Block */}
      {contradictions.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-red-500">
            <AlertTriangle className="w-5 h-5" /> Contradictions Detected
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {contradictions.map((c: any, idx: number) => (
              <div 
                key={idx} 
                className="p-5 rounded-lg border border-red-500/30 bg-red-500/5 cursor-pointer hover:bg-red-500/10 transition-colors"
                onClick={() => setInspectorNode({ ...c, type: 'Contradiction' })}
              >
                <h4 className="font-semibold text-foreground mb-2">{c.description}</h4>
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="flex-1 p-3 bg-background rounded border">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Claim 1</span>
                    <p className="text-sm mt-1">{c.evidence.claim_1.text}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Scale className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 p-3 bg-background rounded border">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Claim 2</span>
                    <p className="text-sm mt-1">{c.evidence.claim_2.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Claims Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ThumbsUp className="w-5 h-5 text-primary" /> Extracted Claims
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {claims.map((claim: any, idx: number) => (
            <div 
              key={idx} 
              className="p-4 rounded-lg border bg-card hover:border-primary/50 cursor-pointer transition-colors"
              onClick={() => setInspectorNode({ ...claim, type: 'Claim' })}
            >
              <div className="inline-flex rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-3">
                {claim.type}
              </div>
              <p className="text-sm line-clamp-4">{claim.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
