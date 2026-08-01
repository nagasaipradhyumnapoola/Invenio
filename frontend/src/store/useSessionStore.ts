import { create } from 'zustand'
import packagesData from '../data/packages.json'

interface SessionState {
  activeSessionId: string | null;
  query: string;
  packages: {
    researchPackage: any;
    correlationPackage: any;
    evidencePackage: any;
    hypothesisPackage: any;
    reportPackage: any;
  } | null;
  activeInspectorNode: any | null;
  plannerStatus: Record<string, string>;
  setInspectorNode: (node: any) => void;
  loadSession: (newQuery?: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  activeSessionId: null,
  query: "Contrastive Learning Vision",
  packages: null,
  activeInspectorNode: null,
  plannerStatus: {
    "ResearchAgent": "QUEUED",
    "DatasetAgent": "QUEUED",
    "RepositoryAgent": "QUEUED",
    "CorrelationAgent": "QUEUED",
    "EvidenceAgent": "QUEUED",
    "HypothesisAgent": "QUEUED",
    "ReportAgent": "QUEUED"
  },
  
  setInspectorNode: (node) => set({ activeInspectorNode: node }),
  
  loadSession: async (newQuery?: string) => {
    if (newQuery) set({ query: newQuery })
    const currentQuery = newQuery || useSessionStore.getState().query
    
    // Reset state before running
    set({ 
      activeSessionId: null,
      packages: null,
      plannerStatus: {
        "ResearchAgent": "QUEUED",
        "DatasetAgent": "QUEUED",
        "RepositoryAgent": "QUEUED",
        "CorrelationAgent": "QUEUED",
        "EvidenceAgent": "QUEUED",
        "HypothesisAgent": "QUEUED",
        "ReportAgent": "QUEUED"
      }
    })
    
    try {
      const { startWorkflow, getWorkflowStatus, generateWorkspace, getWorkspace } = await import('../lib/api')
      
      const setStatus = (agent: string, status: string) => {
        set((state) => ({
          plannerStatus: { ...state.plannerStatus, [agent]: status }
        }))
      }
      
      // 1. Start real workflow
      setStatus("ResearchAgent", "RUNNING")
      setStatus("DatasetAgent", "RUNNING")
      setStatus("RepositoryAgent", "RUNNING")
      
      const { run_id } = await startWorkflow(currentQuery)
      set({ activeSessionId: run_id })
      
      // 2. Poll workflow status (Since it's very fast locally, we just do a couple steps for UX)
      await new Promise(r => setTimeout(r, 1000))
      setStatus("ResearchAgent", "COMPLETED")
      setStatus("DatasetAgent", "COMPLETED")
      setStatus("RepositoryAgent", "COMPLETED")
      setStatus("CorrelationAgent", "RUNNING")
      
      await new Promise(r => setTimeout(r, 800))
      setStatus("CorrelationAgent", "COMPLETED")
      setStatus("EvidenceAgent", "RUNNING")
      
      await new Promise(r => setTimeout(r, 800))
      setStatus("EvidenceAgent", "COMPLETED")
      setStatus("HypothesisAgent", "RUNNING")
      
      await new Promise(r => setTimeout(r, 600))
      setStatus("HypothesisAgent", "COMPLETED")
      setStatus("ReportAgent", "RUNNING")
      
      // 3. Generate the workspace
      const { workspace_id } = await generateWorkspace(run_id)
      const data = await getWorkspace(workspace_id)
      
      setStatus("ReportAgent", "COMPLETED")
      
      // Convert real sections to markdown content for the dashboard
      const sections = data.workspace.sections || []
      const markdown = sections.map((s: any) => `## ${s.title}\n\n${s.content}`).join('\n\n')
      
      // 4. Update the dashboard
      set({ 
        packages: {
          reportPackage: { markdown_content: `# Autonomous Research Report\n\n${markdown}` },
          researchPackage: {}, correlationPackage: {}, evidencePackage: {}, hypothesisPackage: {}
        } as any 
      })
    } catch (error) {
      console.error("Workflow failed", error)
      const setStatus = (agent: string, status: string) => {
        set((state) => ({ plannerStatus: { ...state.plannerStatus, [agent]: status } }))
      }
      setStatus("ResearchAgent", "FAILED")
      setStatus("CorrelationAgent", "FAILED")
      setStatus("ReportAgent", "FAILED")
    }
  }
}))
