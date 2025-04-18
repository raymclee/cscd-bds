import { useNavigate, useSearch } from "@tanstack/react-router";
import { operationsIndexPageQuery$data } from "__generated__/operationsIndexPageQuery.graphql";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

type ProjectSelectProps = {
  defaultCode?: string;
  data: operationsIndexPageQuery$data;
};

export function ProjectSelect({ defaultCode, data }: ProjectSelectProps) {
  const [open, setOpen] = useState(false);
  const code = useSearch({
    from: "/__auth/__dashboard/__scaled/operations/",
    select: (search) => search.code || defaultCode,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const projectsArray = data?.node?.projects?.edges
    ?.map((item) => item?.node)
    .filter((item) => item?.code);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="inline-flex w-[310px] cursor-pointer items-center justify-between gap-2 px-2 py-1 text-sm font-medium text-white outline-brand-project"
        >
          <div className="line-clamp-1 flex-1 text-left">
            {code
              ? projectsArray?.find((item) => item?.code === code)?.name
              : "请选择项目..."}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xxs text-slate-400">Ctrl/Cmd K</span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[310px] border-none bg-transparent p-0">
        <Command
          className="bg-slate-900/90 text-white backdrop-blur-2xl"
          filter={(value, search) => {
            return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
          }}
        >
          <CommandInput placeholder="请选择项目..." />
          <CommandList>
            <CommandEmpty>没有相关项目</CommandEmpty>
            <CommandGroup>
              {projectsArray?.map((item) => (
                <CommandItem
                  className="cursor-pointer text-white data-[selected='true']:bg-slate-600 data-[selected=true]:text-white"
                  key={item?.code}
                  value={item?.code ?? ""}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    navigate({
                      to: "/operations",
                      search: { code: currentValue },
                      replace: true,
                    });
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      defaultCode === item?.code ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item?.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
