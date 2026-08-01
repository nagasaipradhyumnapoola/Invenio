/**
 * PagePlaceholder — Reusable placeholder for Phase 1 pages
 *
 * Displays a professional "coming soon" layout that communicates:
 * - What the module does
 * - What phase it ships in
 * - What capabilities it will have
 *
 * This is intentionally design-neutral — the UI team will replace
 * all page content in a later phase.
 */

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PlaceholderModule {
  label: string
  description: string
  phase: string
}

interface PagePlaceholderProps {
  /** Page title */
  title: string
  /** One-line description of the page purpose */
  description: string
  /** Lucide icon component */
  icon: React.ReactNode
  /** Future modules/panels to preview */
  modules?: PlaceholderModule[]
  /** Optional badge text (e.g. "Phase 2") */
  phaseBadge?: string
  /** Optional class name */
  className?: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export function PagePlaceholder({
  title,
  description,
  icon,
  modules = [],
  phaseBadge = 'Phase 2',
  className,
}: PagePlaceholderProps) {
  return (
    <div className={cn('h-full min-h-screen p-6 md:p-8', className)}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* ── Page Header ──────────────────────────── */}
        <motion.div variants={item} className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground border border-border uppercase tracking-wider">
                  {phaseBadge}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
            </div>
          </div>
        </motion.div>

        {/* ── Status Banner ────────────────────────── */}
        <motion.div
          variants={item}
          className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-muted/30"
        >
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            This module is part of the Invenio architecture foundation. Implementation begins in{' '}
            <span className="text-foreground font-medium">{phaseBadge}</span>. The layout and
            structure are ready for development.
          </p>
        </motion.div>

        {/* ── Module Panels ─────────────────────────── */}
        {modules.length > 0 && (
          <motion.div variants={item} className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Planned Panels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {modules.map((mod) => (
                <motion.div
                  key={mod.label}
                  variants={item}
                  className={cn(
                    'group p-4 rounded-lg border border-border bg-card',
                    'hover:border-primary/30 hover:bg-card/80 transition-all duration-200'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">{mod.label}</span>
                    <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-medium bg-muted text-muted-foreground uppercase tracking-wide">
                      {mod.phase}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {mod.description}
                  </p>
                  {/* Skeleton lines */}
                  <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 bg-muted rounded-full w-3/4" />
                    <div className="h-1.5 bg-muted rounded-full w-1/2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Architecture Note ─────────────────────── */}
        <motion.div
          variants={item}
          className="p-4 rounded-lg border border-dashed border-border bg-transparent"
        >
          <p className="text-xs text-muted-foreground font-mono">
            {'// '}
            <span className="text-foreground">{title}</span>
            {' — see docs/ARCHITECTURE.md for design decisions and docs/PHASES.md for the implementation roadmap.'}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
