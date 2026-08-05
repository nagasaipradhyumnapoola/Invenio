/**
 * Landing — Public-Facing Entry Page
 *
 * Premium presentation with floating cards, ambient glowing orbs,
 * and high-end typography.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Microscope,
  FlaskConical,
  Network,
  Database,
  GitBranch,
  Cpu,
  ArrowRight,
  Sparkles,
  BookOpenCheck,
  Atom,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { APP_NAME, APP_TAGLINE } from '@/constants'

/* ─── Animation Variants ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

/* ─── Feature Item ─────────────────────────────── */
interface FeatureItemProps {
  icon: React.ElementType
  title: string
  description: string
}

function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'group p-6 rounded-3xl glass-card card-hover flex flex-col items-start gap-5'
      )}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 179, 237, 0.15), rgba(139, 92, 246, 0.15))',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-100 mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-violet-400 transition-all duration-300">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Connection Type ──────────────────────────── */
function ConnectionBadge({ label }: { label: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold',
      'transition-all duration-300 cursor-default hover:scale-105'
    )}
    style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#94a3b8',
      backdropFilter: 'blur(8px)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(99, 179, 237, 0.4)';
      e.currentTarget.style.color = '#fff';
      e.currentTarget.style.background = 'rgba(99, 179, 237, 0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.color = '#94a3b8';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
    }}
    >
      {label}
    </span>
  )
}

/* ─── Landing Page ─────────────────────────────── */
export function Landing() {
  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden relative">

      {/* ── Ambient Background Lighting ──────────────── */}
      <div className="fixed top-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-radial from-blue-500/20 to-transparent blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-gradient-radial from-violet-500/20 to-transparent blur-[100px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />

      {/* ── Top Navigation ─────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 glass">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)',
              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
            }}
          >
            <Microscope className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">{APP_NAME}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            id="landing-enter-app"
            className="btn-premium flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
          >
            Enter App
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ───────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-24 px-6 md:px-12 z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative max-w-5xl mx-auto space-y-10"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide"
              style={{
                background: 'rgba(99, 179, 237, 0.1)',
                border: '1px solid rgba(99, 179, 237, 0.3)',
                color: '#93c5fd',
                boxShadow: '0 0 20px rgba(99, 179, 237, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              PHASE 1 — ARCHITECTURE FOUNDATION
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1]">
              <span className="text-white drop-shadow-sm">The Research</span>
              <br />
              <span className="text-gradient-premium drop-shadow-sm">{APP_TAGLINE}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
              Invenio connects scientific papers, datasets, repositories, patents, and natural
              phenomena to uncover research opportunities that traditional search cannot.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/workflow?demo=true"
              id="landing-cta-demo"
              className="btn-gradient flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-xl shadow-blue-500/20 w-full sm:w-auto justify-center"
            >
              <Sparkles className="w-5 h-5" />
              Run Demo Pipeline
            </Link>
            <Link
              to="/dashboard"
              id="landing-cta-primary"
              className="btn-premium flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white shadow-lg w-full sm:w-auto justify-center"
            >
              Open Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com"
              id="landing-cta-github"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white transition-colors duration-200 w-full sm:w-auto justify-center group"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <GitBranch className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
              View on GitHub
            </a>
          </motion.div>

          {/* Connection types */}
          <motion.div variants={fadeUp} className="pt-10 space-y-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Connecting across domains</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Scientific Papers', 'Datasets', 'Repositories', 'Patents',
                'Biological Phenomena', 'Mathematical Concepts', 'Algorithms', 'Engineering Techniques',
              ].map((label) => (
                <ConnectionBadge key={label} label={label} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features Grid ──────────────────────────── */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          <motion.div variants={fadeUp} className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Built for Discovery</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
              Every module is designed to surface connections that humans miss and systems can't see.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureItem
              icon={FlaskConical}
              title="Research Intelligence"
              description="Semantic search across OpenAlex, Semantic Scholar, ArXiv, and PubMed. AI-assisted query expansion."
            />
            <FeatureItem
              icon={Network}
              title="Knowledge Graph"
              description="Neo4j-powered relationship graph connecting all entities across domains. Discover hidden links."
            />
            <FeatureItem
              icon={Database}
              title="Dataset Discovery"
              description="Index and browse datasets from Kaggle, HuggingFace, Zenodo, and 20+ sources."
            />
            <FeatureItem
              icon={GitBranch}
              title="Repository Linking"
              description="Connect code implementations directly to the papers and datasets they implement or use."
            />
            <FeatureItem
              icon={BookOpenCheck}
              title="Evidence Chains"
              description="Structured, scored evidence chains extracted by AI from research entities."
            />
            <FeatureItem
              icon={Cpu}
              title="Nitro Orchestration"
              description="9 specialized AI agents working in concert via MCP. Planner coordinates, agents execute."
            />
          </div>
        </motion.div>
      </section>

      {/* ── Architecture Preview ────────────────────── */}
      <section className="px-6 md:px-12 py-24 max-w-5xl mx-auto relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-12"
        >
          <motion.div variants={fadeUp} className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Architecture First</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
              Invenio is built for teams. Every module is independently deployable and independently testable.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="p-8 rounded-3xl glass-premium font-mono text-sm space-y-2 overflow-x-auto"
          >
            {[
              'invenio/',
              '  frontend/     ← React + Vite + TypeScript + Tailwind + shadcn',
              '  backend/      ← FastAPI + Pydantic + SQLAlchemy',
              '  nitro/        ← NitroStack MCP agent workspace',
              '  shared/       ← Cross-workspace types and constants',
              '  docs/         ← Architecture, phases, standards',
              '  scripts/      ← Dev environment bootstrap',
              '  tests/        ← Pytest + Vitest integration suites',
              '  .github/      ← CI/CD workflows',
            ].map((line, i) => (
              <div key={line} className="flex">
                <span className="w-8 text-slate-600 select-none mr-4">{i + 1}</span>
                <span className={line.startsWith('  ') ? 'text-blue-300/80' : 'text-blue-400 font-bold'}>
                  {line}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="border-t border-white/10 px-6 md:px-12 py-10 mt-12 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <Atom className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-300 tracking-wide">
              {APP_NAME} — {APP_TAGLINE}
            </span>
          </div>
          <div className="text-xs font-medium text-slate-500 tracking-widest uppercase">
            Phase 1 — Architecture Foundation — v0.1.0
          </div>
        </div>
      </footer>
    </div>
  )
}
