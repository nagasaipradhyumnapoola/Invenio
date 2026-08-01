/**
 * Sidebar — Primary Navigation
 *
 * Responsibilities (Phase 1 — layout only):
 * - Render collapsible navigation sidebar
 * - Display nav items with icons and labels
 * - Highlight active route
 * - Support collapsed (icon-only) mode
 *
 * Future Phases:
 * - Persist collapse state to user preferences (Supabase)
 * - Add workspace switcher
 * - Add recent items section
 * - Add notification badge on nav items
 * - Integrate keyboard shortcut (⌘B) for toggle
 */

import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FlaskConical,
  Network,
  BookOpenCheck,
  Database,
  GitBranch,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brain,
  Users,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, NAV_BOTTOM_ITEMS, APP_NAME } from '@/constants'

/* ─── Icon Map ─────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  FlaskConical,
  Network,
  BookOpenCheck,
  Database,
  GitBranch,
  FileText,
  Settings,
  Users,
  AlertTriangle,
  Lightbulb,
}

/* ─── Props ────────────────────────────────────── */
interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

/* ─── Component ────────────────────────────────── */
export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()

  return (
    <motion.aside
      animate={{ width: collapsed ? 60 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="relative flex flex-col h-full border-r overflow-hidden"
      style={{
        background: 'hsl(var(--sidebar-bg))',
        borderColor: 'hsl(var(--sidebar-border))',
        minWidth: collapsed ? 60 : 240,
      }}
      aria-label="Primary navigation"
    >
      {/* ── Logo ─────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 border-b"
        style={{
          height: 'var(--topnav-height)',
          borderColor: 'hsl(var(--sidebar-border))',
        }}
      >
        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="font-semibold text-sm tracking-tight text-foreground whitespace-nowrap"
            >
              {APP_NAME}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── Main Nav ──────────────────────────────── */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon]
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')

          return (
            <NavLink
              key={item.id}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'text-primary bg-[hsl(var(--sidebar-item-active))]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--sidebar-item-hover))]'
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    'flex-shrink-0 w-4 h-4 transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                />
              )}
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="truncate whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          )
        })}
      </nav>

      {/* ── Bottom Nav ────────────────────────────── */}
      <div
        className="px-2 py-3 border-t space-y-0.5"
        style={{ borderColor: 'hsl(var(--sidebar-border))' }}
      >
        {NAV_BOTTOM_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon]
          const isActive = location.pathname === item.path

          return (
            <NavLink
              key={item.id}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'text-primary bg-[hsl(var(--sidebar-item-active))]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--sidebar-item-hover))]'
              )}
            >
              {Icon && (
                <Icon className="flex-shrink-0 w-4 h-4" />
              )}
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="truncate whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          )
        })}

        {/* ── Collapse Toggle ─────────────────────── */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--sidebar-item-hover))] transition-all duration-150 text-sm font-medium"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          id="sidebar-toggle"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="whitespace-nowrap"
              >
                Collapse
              </motion.span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  )
}
