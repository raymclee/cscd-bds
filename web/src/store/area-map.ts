import { NavigateFn } from "@tanstack/react-router";
import { create } from "zustand";

type MapState = {
  map: AMap.Map | null;
  initAreaMap: (navigate: NavigateFn) => void;
};

export const useAreaMapStore = create<MapState>()((set) => ({
  map: null,
  initAreaMap(navigate) {
    const satellite = new AMap.TileLayer.Satellite({});
    const disCountry = new AMap.DistrictLayer.Country({
      zIndex: 11,
      SOC: "CHN",
      depth: 1,
      zooms: [3, 20],
      styles: {
        // "nation-stroke": "#d0f5ce",
        // "coastline-stroke": "#d0f5ce",
        // "province-stroke": "#d0f5ce",
        // "county-stroke": "#d0f5ce",
        fill: (props: { adcode_pro: number }) => {
          switch (props.adcode_pro) {
            case 540000: //西藏
            case 650000: //新疆
            case 620000: // 甘肃
            case 630000: //青海
            case 510000: //四川
            case 530000: //云南
            case 640000: //宁夏
            case 610000: //陕西
            case 500000: //重庆
            case 520000: //貴州
              return "#d0f5ce";
            //華北
            case 150000: //内蒙古
            case 230000: //黑龙江
            case 220000: //吉林
            case 210000: //辽宁
            case 110000: //北京
            case 130000: //河北
            case 140000: //山西
            case 120000: //天津
            case 370000: //山东
              return "#efe6fe";
            //華東
            case 320000: //江苏
            case 310000: //上海
            case 340000: //安徽
            case 330000: //浙江
            case 410000: //河南
              return "#e0e9ff";
            //華南
            case 430000: //湖南
            case 350000: //福建
            case 440000: //广东
            case 450000: //广西
            case 360000: //江西
            case 420000: //湖北
            case 460000: //海南
            case 710000: //台湾
              return "#fee3e2";
            case 810000: //香港
            case 820000: //澳门
              return "#fee7cd";
            default:
              return "transparent";
          }
        },
      },
    });

    const distWorld = new AMap.DistrictLayer.World({
      zIndex: 10, //设置图层层级
      zooms: [2, 15], //设置图层显示范围
    });

    //3、设置行政区图层样式
    distWorld.setStyles({
      // "stroke-width": 1, //描边线宽
      // fill: function (data) {
      //   //设置区域填充颜色，可根据回调信息返回区域信息设置不同填充色
      //   //回调返回区域信息数据，字段包括 SOC(国家代码)、NAME_ENG(英文名称)、NAME_CHN(中文名称)等
      //   //国家代码名称说明参考 https://a.amap.com/jsapi_demos/static/demo-center/js/soc-list.json
      //   return "#ffffffec";
      //   // return "#FFF2CC";
      // },
      fill: "#ffffffec",
    });

    const map = new AMap.Map("map", {
      // zoom: 10,
      // center: [116.397428, 39.90923],
      center: [106.122082, 33.719192],
      zoom: 4,
      layers: [
        // new AMap.DistrictLayer.World({
        //   zIndex: 10, //设置图层层级
        //   // zooms: [0, 4], //设置图层显示范围
        //   styles: {
        //     // fill: "#bcbcbc",
        //   },
        //   opacity: 0.8,
        //   depth: 1,
        // }),
        distWorld,
        // new AMap.TileLayer({}),
        disCountry,
      ],
      zooms: [3, 18],
      // wallColor: "#f0f0f0",
    });

    map.on("complete", function () {
      const layer = new AMap.LabelsLayer({
        // 开启标注避让，默认为开启，v1.4.15 新增属性
        collision: false,
        // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
      });
      for (let i = 0; i < LabelsData.length; i++) {
        const labelsMarker = new AMap.LabelMarker(LabelsData[i]);
        labelsMarker.on("click", (e) => {
          map.setZoomAndCenter(16, LabelsData[i].position);
          map.remove(disCountry);
          map.remove(distWorld);
          map.add(AMap.createDefaultLayer());
          // map.add(satellite);
        });
        // @ts-expect-error
        layer.add(labelsMarker);
      }
      map.add(layer);
    });

    map.on("zoomend", () => {
      const zoom = map.getZoom();
      if (zoom > 8) {
        map.remove(disCountry);
        map.remove(distWorld);
        map.add(AMap.createDefaultLayer());
        // map.add(satellite);
      } else {
        map.add(distWorld);
        map.add(disCountry);
        map.remove(AMap.createDefaultLayer());
        // map.remove(satellite);
      }
    });

    set({ map });
  },
}));

const districts = [
  {
    citycode: [],
    adcode: "440000",
    name: "西部地区",
    center: "90.986153,36.876121",
    level: "province",
    districts: [],
  },
  {
    citycode: [],
    adcode: "440000",
    name: "华北地区",
    center: "116.136142,42.021244",
    level: "province",
    districts: [],
  },
  {
    citycode: [],
    adcode: "440000",
    name: "华东地区",
    center: "119.008879,32.688899",
    level: "province",
    districts: [],
  },
  {
    citycode: [],
    adcode: "440000",
    name: "华南地区",
    center: "112.186512,28.03419",
    level: "province",
    districts: [],
  },
  {
    citycode: [],
    adcode: "440000",
    name: "港澳地区",
    center: "114.183583,22.385247",
    level: "province",
    districts: [],
  },
];

// var districts = [
//   {
//     citycode: [],
//     adcode: "440000",
//     name: "广东",
//     center: "113.280637,23.125178",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "410000",
//     name: "河南",
//     center: "113.665412,34.757975",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "150000",
//     name: "内蒙古",
//     center: "111.670801,40.818311",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "230000",
//     name: "黑龙江",
//     center: "126.642464,45.756967",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "650000",
//     name: "新疆",
//     center: "87.617733,43.792818",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "420000",
//     name: "湖北",
//     center: "114.298572,30.584355",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "210000",
//     name: "辽宁",
//     center: "123.429096,41.796767",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "370000",
//     name: "山东",
//     center: "117.000923,36.675807",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "610000",
//     name: "陕西",
//     center: "108.948024,34.263161",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: "021",
//     adcode: "310000",
//     name: "上海",
//     center: "121.472644,31.231706",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "520000",
//     name: "贵州",
//     center: "106.713478,26.578343",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: "023",
//     adcode: "500000",
//     name: "重庆",
//     center: "106.504962,29.533155",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "540000",
//     name: "西藏",
//     center: "91.132212,29.660361",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "340000",
//     name: "安徽",
//     center: "117.283042,31.86119",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "350000",
//     name: "福建",
//     center: "119.306239,26.075302",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "430000",
//     name: "湖南",
//     center: "112.982279,28.19409",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "460000",
//     name: "海南",
//     center: "110.33119,20.031971",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "320000",
//     name: "江苏",
//     center: "118.767413,32.041544",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "630000",
//     name: "青海",
//     center: "101.778916,36.623178",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "450000",
//     name: "广西",
//     center: "108.320004,22.82402",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "640000",
//     name: "宁夏",
//     center: "106.278179,38.46637",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "360000",
//     name: "江西",
//     center: "115.892151,28.676493",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "330000",
//     name: "浙江",
//     center: "120.153576,30.287459",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "130000",
//     name: "河北",
//     center: "114.502461,38.045474",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: "1853",
//     adcode: "820000",
//     name: "澳门",
//     center: "113.54909,22.198951",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: "1886",
//     adcode: "710000",
//     name: "台湾",
//     center: "121.509062,25.044332",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: "1852",
//     adcode: "810000",
//     name: "香港",
//     center: "114.173355,22.320048",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "620000",
//     name: "甘肃",
//     center: "103.823557,36.058039",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "510000",
//     name: "四川",
//     center: "104.065735,30.659462",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "220000",
//     name: "吉林",
//     center: "125.3245,43.886841",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: "022",
//     adcode: "120000",
//     name: "天津",
//     center: "117.190182,39.125596",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "530000",
//     name: "云南",
//     center: "102.712251,25.040609",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: "010",
//     adcode: "110000",
//     name: "北京",
//     center: "116.405285,39.904989",
//     level: "province",
//     districts: [],
//   },
//   {
//     citycode: [],
//     adcode: "140000",
//     name: "山西",
//     center: "112.549248,37.857014",
//     level: "province",
//     districts: [],
//   },
// ];

interface District {
  citycode: string[];
  adcode: string;
  name: string;
  center: string;
  level: string;
  districts: any[];
}

interface LabelConfig {
  name: string;
  position: [number, number];
  zooms: [number, number];
  zIndex: number;
  opacity: number;
  text: {
    content: string;
    direction: string;
    offset: [number, number];
    zooms: [number, number];
    style: {
      fontSize: number;
      fontWeight: string;
      fillColor: string;
      strokeColor: string;
      strokeWidth: number;
    };
  };
}

const LabelsData: LabelConfig[] = [];

const directions: { [key: string]: string } = {
  北京: "top",
  河北: "right",
  宁夏: "bottom",
  浙江: "bottom",
  上海: "right",
  青海: "left",
  黑龙江: "top",
  江苏: "right",
  安徽: "top",
  重庆: "right",
  湖南: "left",
  澳门: "bottom",
  香港: "right",
  台湾: "bottom",
  内蒙古: "top",
};

for (let i = 0; i < districts.length; i++) {
  let config: LabelConfig = {
    name: "",
    position: [116.12, 39.11],
    zooms: [0, 13],
    zIndex: 1,
    opacity: 1,
    text: {
      content: "",
      direction: "center",
      offset: [0, 0],
      zooms: [0, 20],
      style: {
        fontSize: 20,
        fontWeight: "normal",
        fillColor: "#eee",
        strokeColor: "#88f",
        strokeWidth: 2,
      },
    },
  };
  const district = districts[i];
  const name = district.name;
  config.text.content = name;
  config.position = district.center.split(",").map((v) => parseFloat(v)) as [
    number,
    number,
  ];
  if (directions[name]) {
    config.text.direction = directions[name];
  }
  LabelsData.push(config);
}
