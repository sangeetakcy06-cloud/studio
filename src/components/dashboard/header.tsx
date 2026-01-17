import { Logo } from "@/components/logo";

export function DashboardHeader() {
  return (
    <header className="flex items-center gap-4 py-6 px-4 md:px-8 border-b bg-card">
      <Logo />
      <h1 className="text-2xl font-bold text-card-foreground font-headline">
        Career Navigator
      </h1>
    </header>
  );
}
