import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-8", className)}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" className="fill-primary stroke-primary" />
      <path d="M2 17l10 5 10-5" className="stroke-accent" />
      <path d="M2 12l10 5 10-5" className="stroke-primary" />
    </svg>
  );
}
