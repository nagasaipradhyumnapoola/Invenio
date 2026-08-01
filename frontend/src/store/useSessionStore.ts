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
  loadSession: () => void;
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
  
  loadSession: () => {
    // Simulate planner loading
    set({ activeSessionId: "session_1" })
    
    // Simulate real-time updates for demonstration
    const simulateRun = async () => {
      const setStatus = (agent: string, status: string) => {
        set((state) => ({
          plannerStatus: { ...state.plannerStatus, [agent]: status }
        }))
      }
      
      const agents = Object.keys(packagesData).map(k => k); // Just a placeholder loop logic
      
      setStatus("ResearchAgent", "RUNNING")
      setStatus("DatasetAgent", "RUNNING")
      setStatus("RepositoryAgent", "RUNNING")
      
      await new Promise(r => setTimeout(r, 1000))
      setStatus("ResearchAgent", "COMPLETED")
      setStatus("DatasetAgent", "COMPLETED")
      setStatus("RepositoryAgent", "COMPLETED")
      setStatus("CorrelationAgent", "RUNNING")
      
      await new Promise(r => setTimeout(r, 800))
      setStatus("CorrelationAgent", "COMPLETED")
      setStatus("EvidenceAgent", "RUNNING")
      
      await new Promise(r => setTimeout(r, 500))
      setStatus("EvidenceAgent", "COMPLETED")
      setStatus("HypothesisAgent", "RUNNING")
      
      await new Promise(r => setTimeout(r, 300))
      setStatus("HypothesisAgent", "COMPLETED")
      setStatus("ReportAgent", "RUNNING")
      
      await new Promise(r => setTimeout(r, 200))
      setStatus("ReportAgent", "COMPLETED")
      
      // Load the data
      set({ packages: packagesData as any })
    }
    
    simulateRun()
  }
}))
