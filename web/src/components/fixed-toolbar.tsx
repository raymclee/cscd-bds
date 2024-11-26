import { usePortalStore } from "~/store/portal";
import { cn } from "~/lib/utils";

export function FixedToolbar({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = usePortalStore((s) => s.sidebarCollapsed);

  return (
    <div
      className={cn(
        "fixed bottom-0 end-0 left-[200px] right-0 flex h-16 items-center justify-end gap-3 border-t bg-white px-6 transition-all",
        sidebarCollapsed ? "left-[5rem]" : "left-[200px]",
      )}
    >
      {children}
    </div>
  );
}
