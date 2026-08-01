import React from 'react'
import { CorrelationGraph } from '../components/graph/CorrelationGraph'
import { useSessionStore } from '../store/useSessionStore'

export function KnowledgeGraph() {
  const { packages, setInspectorNode } = useSessionStore()
  
  if (!packages?.correlationPackage) {
    return <div className="p-12 text-center text-muted-foreground">Waiting for Correlation Agent...</div>
  }

  const { nodes, edges } = packages.correlationPackage.knowledge_graph

  return (
    <div className="w-full h-[calc(100vh-6rem)] rounded-lg overflow-hidden border shadow-sm relative bg-card">
      <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-md p-4 rounded-lg shadow border pointer-events-none">
        <h2 className="font-bold text-lg">Semantic Knowledge Graph</h2>
        <p className="text-sm text-muted-foreground">Rendered {nodes.length} entities and {edges.length} relationships.</p>
      </div>
      <CorrelationGraph 
        nodes={nodes} 
        edges={edges} 
        onNodeSelect={(node) => setInspectorNode(node)} 
      />
    </div>
  )
}
