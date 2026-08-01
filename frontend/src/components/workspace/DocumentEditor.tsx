import { useState } from 'react'
import { IReportSection, IInsight } from '@/types'
import { AlertTriangle, Lightbulb, Network } from 'lucide-react'

interface DocumentEditorProps {
  sections: IReportSection[]
}

export function DocumentEditor({ sections }: DocumentEditorProps) {
  // We use local state to simulate an editable document
  const [editableSections, setEditableSections] = useState(sections)

  const handleContentChange = (index: number, newContent: string) => {
    const updated = [...editableSections]
    updated[index] = { ...updated[index], content: newContent }
    setEditableSections(updated)
  }

  const renderInsight = (insight: IInsight) => {
    const Icon = insight.type === 'gap' ? AlertTriangle : 
                 insight.type === 'opportunity' ? Lightbulb : Network
    
    const colorClass = insight.type === 'gap' ? 'text-purple-500 bg-purple-500/10' :
                       insight.type === 'opportunity' ? 'text-amber-500 bg-amber-500/10' : 'text-blue-500 bg-blue-500/10'

    return (
      <div key={insight.id} className="my-4 p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1.5 rounded-md ${colorClass}`}>
            <Icon className="w-4 h-4" />
          </div>
          <h4 className="font-bold">{insight.title}</h4>
          <span className="ml-auto text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            Conf: {(insight.confidence * 100).toFixed(0)}%
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
        <div className="text-xs bg-muted/50 p-2 rounded border border-border/50 font-mono text-muted-foreground">
          <strong>AI Reasoning:</strong> {insight.reasoning}
        </div>
      </div>
    )
  }

  return (
    <div className="flex max-w-6xl mx-auto py-12 px-8 pb-32 gap-12">
      {/* Sticky Table of Contents */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="sticky top-24 space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Contents</h3>
          <nav className="flex flex-col space-y-1">
            {editableSections.map((section) => (
              <a 
                key={`toc-${section.id}`}
                href={`#section-${section.id}`}
                className="text-sm text-muted-foreground hover:text-foreground py-1.5 px-3 rounded-md hover:bg-muted/50 transition-colors truncate"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Document Content */}
      <div className="flex-1 max-w-3xl">
        {editableSections.map((section, idx) => (
          <section key={section.id} id={`section-${section.id}`} className="mb-16 group scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 group-hover:text-primary transition-colors">
              {section.title}
            </h2>
            
            <textarea
              value={section.content}
              onChange={(e) => handleContentChange(idx, e.target.value)}
              className="w-full min-h-[100px] bg-transparent resize-none outline-none text-muted-foreground leading-relaxed transition-all focus:text-foreground focus:bg-muted/20 p-3 -mx-3 rounded-lg text-lg"
            />

          {section.insights && section.insights.length > 0 && (
            <div className="mt-4 space-y-4 pl-4 border-l-2 border-primary/20">
              {section.insights.map(renderInsight)}
            </div>
          )}
        </section>
      ))}
      </div>
    </div>
  )
}
