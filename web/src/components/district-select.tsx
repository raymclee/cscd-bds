import { useNavigate } from "@tanstack/react-router";
import { useShallow } from "zustand/shallow";
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
import { useMapStore } from "~/store/map";

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

export function DistrictSelect({ className }: SelectProps) {
  const [districts, selectDistrict] = useMapStore(
    useShallow((state) => [state.districts, state.selectDistrict])
  );
  const navigate = useNavigate();

  return (
    <Select
      onValueChange={(id) => {
        const district = districts.find((d) => d.id == id)!;
        selectDistrict(district);
        navigate({ to: "/areas/$area", params: { area: district.id } });
      }}
    >
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder="區域" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {districts.map((district) => (
            <SelectItem key={String(district.id)} value={String(district.id)}>
              {district.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
