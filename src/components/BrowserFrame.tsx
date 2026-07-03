import React from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
}

function formatUrl(url?: string): string {
  if (!url) return "localhost:3000";
  try {
    const u = new URL(url);
    const path = u.pathname === "/" ? "" : u.pathname;
    return u.hostname + path;
  } catch {
    return url;
  }
}

const LockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const BrowserFrame: React.FC<BrowserFrameProps> = ({ url, children, className }) => {
  const displayUrl = formatUrl(url);
  const isLive = Boolean(url);

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-border bg-[var(--surface-1)]",
        className,
      )}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[linear-gradient(180deg,#F2EFE7,#E2DCCE)] border-b border-border">
        {/* Traffic lights — 3D kecil */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="block w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(0,0,0,0.25)]" />
          <span className="block w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(0,0,0,0.25)]" />
          <span className="block w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(0,0,0,0.25)]" />
        </div>

        {/* URL bar */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <div className="well-inset flex items-center gap-1.5 px-3 py-1 rounded-md min-w-0 max-w-full">
            <LockIcon className="w-3 h-3 text-muted-foreground/60 shrink-0" />
            <span className="text-[11px] text-muted-foreground font-mono-tight tracking-tight truncate">
              {displayUrl}
            </span>
          </div>
        </div>

        {/* Spacer to balance traffic lights */}
        <div className="w-[42px] shrink-0 hidden sm:flex items-center justify-end">
          {isLive && (
            <span className="flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] text-[hsl(var(--led-green))] font-mono-tight">
              <span className="led led-green block w-1.5 h-1.5" />
              Live
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default BrowserFrame;
