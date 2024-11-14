import { NavigateFn, useNavigate } from "@tanstack/react-router";
import { create } from "zustand";

export type District = {
  id: string;
  citycode: string[];
  adcode: number[];
  name: string;
  center: [number, number];
  level: string;
  districts: District[];
};

const districts: District[] = [
  {
    id: "1",
    citycode: [],
    adcode: [
      540000, 650000, 620000, 630000, 510000, 530000, 640000, 610000, 500000,
      520000,
    ],
    name: "西部地区",
    center: [90.986153, 36.876121],
    level: "province",
    districts: [],
  },
  {
    id: "2",
    citycode: [],
    adcode: [
      150000, 230000, 220000, 210000, 110000, 130000, 140000, 120000, 370000,
    ],
    name: "华北地区",
    center: [116.136142, 42.021244],
    level: "province",
    districts: [],
  },
  {
    id: "3",
    citycode: [],
    adcode: [320000, 310000, 340000, 330000, 410000],
    name: "华东地区",
    center: [119.008879, 32.688899],
    level: "province",
    districts: [],
  },
  {
    id: "4",
    citycode: [],
    adcode: [430000, 350000, 440000, 450000, 360000, 420000, 460000, 710000],
    name: "华南地区",
    center: [112.186512, 28.03419],
    level: "province",
    districts: [],
  },
  {
    id: "5",
    citycode: [],
    adcode: [810000, 820000],
    name: "港澳地区",
    center: [114.183583, 22.385247],
    level: "province",
    districts: [],
  },
];

type MapState = {
  map: AMap.Map | null;
  selectedDistrict: District | null;
  districts: District[];
  districtExplorer: any | null;
  initMap: (container: string, opts: Partial<AMap.MapOptions>) => void;
  selectDistrict: (district: District) => void;
  setDistrictExplorer: (districtExplorer: any) => void;
};

export const useMapStore = create<MapState>()((set, get) => ({
  map: null,
  districtExplorer: null,
  selectedDistrict: null,
  districts,
  initMap: (container, opts) => {
    const map = new AMap.Map(container, { ...opts });

    set({ map });
  },
  selectDistrict: (selectedDistrict) => {
    set({ selectedDistrict });
  },
  setDistrictExplorer: (districtExplorer) => {
    set({ districtExplorer });
  },
}));
