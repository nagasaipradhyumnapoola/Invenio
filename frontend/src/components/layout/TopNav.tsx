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
      </div>
    </header>
  )
}
