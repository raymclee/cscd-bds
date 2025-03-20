export function getDistrictZoomLevelv2(id: string) {
  let zoom = 5;
  if (id === "GA") {
    zoom = 10;
  } else if (id === "HD" || id === "HN") {
    zoom = 6;
  }
  return zoom;
}
