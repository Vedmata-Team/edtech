import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0 overflow-x-hidden">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
