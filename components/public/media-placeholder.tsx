import { Image as ImageIcon } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type MediaPlaceholderProps = {
  label: string;
  note?: string;
  className?: string;
  compact?: boolean;
  dark?: boolean;
};

export function MediaPlaceholder({
  label,
  note = siteConfig.fullName,
  className = "",
  compact = false,
  dark = false
}: MediaPlaceholderProps) {
  return (
    <div
      className={`media-placeholder group relative isolate overflow-hidden ${dark ? "media-placeholder-dark" : ""} ${className}`}
      role="img"
      aria-label={`${label}. ${note}.`}
    >
      <div className="absolute inset-0 media-placeholder-grid" aria-hidden="true" />
      <div
        className="absolute left-0 top-0 h-1 w-20 bg-[#C8102E] transition-[width] duration-300 group-hover:w-28"
        aria-hidden="true"
      />
      <div
        className={`relative z-10 flex h-full flex-col justify-between ${compact ? "p-5" : "p-6 sm:p-8"}`}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
            <ImageIcon size={15} strokeWidth={1.8} aria-hidden="true" />
            {siteConfig.clubName}
          </span>
          <span className="text-xs tabular-nums opacity-65">
            {siteConfig.clubName}
          </span>
        </div>
        <div>
          <p className={`${compact ? "text-base" : "text-lg sm:text-xl"} font-semibold`}>
            {label}
          </p>
          <p className="mt-1 text-sm opacity-68">{note}</p>
        </div>
      </div>
    </div>
  );
}
