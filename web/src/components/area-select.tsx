import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";

const areas = [
  { id: 1, label: "华东地区" },
  { id: 2, label: "华南地区" },
  { id: 3, label: "西部地区" },
  { id: 4, label: "华北地区" },
  { id: 5, label: "港澳地区" },
];

type SelectProps = {
  className?: string;
};

export function AreaSelect({ className }: SelectProps) {
  return (
    <Select>
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder="區域" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {areas.map((area) => (
            <SelectItem key={String(area.id)} value={String(area.id)}>
              {area.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
