/**
 * Settings — Application Preferences
 *
 * Phase 1: Professional placeholder layout.
 *
 * Phase 2+ Responsibilities:
 * - User profile and account settings
 * - Workspace configuration
 * - API key management (OpenAlex, GitHub, Kaggle, etc.)
 * - Nitro agent configuration (model selection, rate limits)
 * - Notification preferences
 * - Theme and appearance settings
 * - Data export and account deletion (GDPR)
 *
 * @see docs/ARCHITECTURE.md — "Configuration" section
 */

import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Key, Cpu, Bell, Palette, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

const SETTINGS_SECTIONS = [
  {
    id: 'profile',
    label: 'Profile',
    description: 'Name, email, and account details',
    icon: User,
    phase: 'Phase 3',
  },
  {
    id: 'api-keys',
    label: 'API Keys',
    description: 'OpenAlex, GitHub, Kaggle, HuggingFace integration keys',
    icon: Key,
    phase: 'Phase 2',
  },
  {
    id: 'nitro',
    label: 'Nitro Configuration',
    description: 'Agent model selection, rate limits, and orchestration settings',
    icon: Cpu,
    phase: 'Phase 2',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Alert preferences for agent activity and new correlations',
    icon: Bell,
    phase: 'Phase 3',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    description: 'Theme, color mode, and display density',
    icon: Palette,
    phase: 'Phase 1',
  },
  {
    id: 'privacy',
    label: 'Privacy & Data',
    description: 'Data export, account deletion, and GDPR controls',
    icon: Shield,
    phase: 'Phase 3',
  },
]

export function Settings() {
  return (
    <div className="p-6 md:p-8">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-6">

        {/* ── Header ───────────────────────────────── */}
        <motion.div variants={item} className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <SettingsIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Settings</h2>
              <p className="text-sm text-muted-foreground">Manage your workspace and preferences</p>
            </div>
          </div>
        </motion.div>

        {/* ── Settings Sections ────────────────────── */}
        <motion.div variants={item} className="space-y-2">
          {SETTINGS_SECTIONS.map((section) => (
            <div
              key={section.id}
              id={`settings-${section.id}`}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl border border-border bg-card',
                'hover:border-primary/20 transition-all duration-200 cursor-default'
              )}
            >
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <section.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{section.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
              </div>
              <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground border border-border uppercase tracking-wide">
                {section.phase}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Architecture Note ─────────────────────── */}
        <motion.div
          variants={item}
          className="p-4 rounded-lg border border-dashed border-border"
        >
          <p className="text-xs text-muted-foreground font-mono">
            {'// Settings — see docs/CODING_STANDARDS.md for configuration management guidelines.'}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
