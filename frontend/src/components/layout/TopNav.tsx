/**
 * TopNav — Top Navigation Bar
 *
 * Responsibilities (Phase 1 — layout only):
 * - Display current page title and breadcrumb
 * - Action slot for page-level buttons
 * - Status indicator for system health
 *
 * Future Phases:
 * - Global command palette (⌘K)
 * - Notification center
 * - User profile and workspace selector
 * - Real-time Nitro agent status indicators
 * - Search with AI suggestions
 */

import { useLocation } from 'react-router-dom'
import { Bell, Command, Search, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, NAV_BOTTOM_ITEMS } from '@/constants'

/* ─── Breadcrumb helpers ───────────────────────── */
function getPageInfo(pathname: string) {
  const allItems = [...NAV_ITEMS, ...NAV_BOTTOM_ITEMS]
  const match = allItems.find(
    (item) => pathname === item.path || pathname.startsWith(item.path + '/')
  )
  return match ?? { label: 'Invenio', description: 'AI Research Operating System' }
}

/* ─── Props ────────────────────────────────────── */
interface TopNavProps {
  /** Optional additional actions to render on the right side */
  actions?: React.ReactNode
  /** Page-level title override */
  title?: string
}

/* ─── Component ────────────────────────────────── */
export function TopNav({ actions, title }: TopNavProps) {
  const location = useLocation()
  const pageInfo = getPageInfo(location.pathname)
  const displayTitle = title ?? pageInfo.label

  return (
    <header
      className={cn(
        'flex items-center justify-between px-6 border-b flex-shrink-0',
        'bg-[hsl(var(--topnav-bg))] border-[hsl(var(--topnav-border))]'
      )}
      style={{ height: 'var(--topnav-height)' }}
      role="banner"
    >
      {/* ── Left: Page Title ───────────────────────── */}
      <div className="flex items-center gap-2 min-w-0">
        <h1 className="text-sm font-semibold text-foreground truncate">
          {displayTitle}
        </h1>
        {'description' in pageInfo && (
          <span className="hidden sm:block text-xs text-muted-foreground truncate">
            — {pageInfo.description}
          </span>
        )}
      </div>

      {/* ── Right: Actions ─────────────────────────── */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Custom page actions slot */}
        {actions}

        {/* ── Command Palette Trigger ──────────────── */}
        {/* Future: Opens global command palette (⌘K) */}
        <button
          id="topnav-command-palette"
          className={cn(
            'hidden sm:flex items-center gap-2 px-3 h-8 rounded-md border text-xs',
            'text-muted-foreground border-border bg-muted/50',
            'hover:bg-muted hover:text-foreground transition-colors duration-150',
            'cursor-default' // Future: will open command palette
          )}
          aria-label="Open command palette"
          disabled
          title="Command palette — coming in Phase 2"
        >
          <Search className="w-3 h-3" />
          <span>Search...</span>
          <kbd className="hidden md:flex items-center gap-0.5 px-1 py-0.5 rounded bg-background border border-border text-[10px] font-mono">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </button>

        {/* ── Nitro Status ────────────────────────────*/}
        {/* Future: Real indicator of Nitro agent orchestration health */}
        <div
          className={cn(
            'flex items-center gap-1.5 px-2.5 h-7 rounded-md border text-xs',
            'text-muted-foreground border-border bg-muted/30'
          )}
          title="Nitro — AI orchestration layer (Phase 2)"
          id="topnav-nitro-status"
        >
          <Cpu className="w-3 h-3" />
          <span className="hidden sm:block">Nitro</span>
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
        </div>

        {/* ── Notifications ───────────────────────────*/}
        {/* Future: Real-time notification center */}
        <button
          id="topnav-notifications"
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-md',
            'text-muted-foreground hover:text-foreground hover:bg-muted',
            'transition-colors duration-150'
          )}
          aria-label="Notifications (coming in Phase 2)"
          disabled
          title="Notifications — coming in Phase 2"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* ── Avatar ──────────────────────────────────*/}
        {/* Future: User profile, workspace settings */}
        <div
          className={cn(
            'w-7 h-7 rounded-full bg-primary/20 border border-primary/30',
            'flex items-center justify-center text-[11px] font-semibold text-primary',
            'cursor-default'
          )}
          title="User profile — coming in Phase 3 (Auth)"
          id="topnav-avatar"
          aria-label="User avatar placeholder"
        >
          IN
        </div>
      </div>
    </header>
  )
}
