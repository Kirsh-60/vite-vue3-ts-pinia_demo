import * as turf from '@turf/turf';// 检查多边形是否自相交
import { showMessage } from '@/utils/message'
const isPolygonSelfIntersecting = (polygon: any) => {
  const points = polygon.getPath().map((point: any) => [point.lng, point.lat]);
  if (points.length < 4) {
    return false; // 如果点数少于 4 个，直接返回 false
  }
  // 确保多边形是闭合的
  if (points[0][0] !== points[points.length - 1][0] || points[0][1] !== points[points.length - 1][1]) {
    points.push(points[0]);
  }
  const turfPolygon = turf.polygon([points]);
  return turf.kinks(turfPolygon).features.length > 0;
};

// 检查两个覆盖物是否重合
const areOverlaysIntersecting = (overlay1: any, overlay2: any) => {
  const turfOverlay1 = convertOverlayToTurfFeature(overlay1);
  const turfOverlay2 = convertOverlayToTurfFeature(overlay2);
  if (!turfOverlay1 || !turfOverlay2) {
    return false; // 如果任意一个覆盖物转换失败，直接返回 false
  }
  return turf.booleanOverlap(turfOverlay1, turfOverlay2);
};

// 将覆盖物转换为 Turf.js 特征
const convertOverlayToTurfFeature = (overlay: any) => {
  if (overlay.CLASS_NAME === "Overlay.Circle") {
    const center = overlay.getCenter();
    return turf.circle([center.lng, center.lat], overlay.getRadius() / 1000); // 半径转换为公里
  } else if (overlay.CLASS_NAME === "Overlay.Polygon") {
    const points = overlay.getPath().map((point: any) => [point.lng, point.lat]);
    if (points.length < 4) {
      return null; // 如果点数少于 4 个，返回 null
    }
    // 确保多边形是闭合的
    if (points[0][0] !== points[points.length - 1][0] || points[0][1] !== points[points.length - 1][1]) {
      points.push(points[0]);
    }
    return turf.polygon([points]);
  } else if (overlay.CLASS_NAME === "Overlay.Rectangle") {
    const bounds = overlay.getBounds();
    return turf.polygon([[
      [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
      [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
      [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
      [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
      [bounds.getSouthWest().lng, bounds.getSouthWest().lat]
    ]]);
  }
  return null;
};
const checkOverlayIntersections = (overlays:any) => {
  for (let i = 0; i < overlays.length; i++) {
    const shape = overlays[i];
    if (shape.CLASS_NAME === "Overlay.Polygon" && isPolygonSelfIntersecting(shape)) {
      showMessage('error', '多边形自相交，请重新绘制！');
      return false;
    }

    for (let j = 0; j < overlays.length; j++) {
      if (i !== j && areOverlaysIntersecting(overlays[i], overlays[j])) {
        showMessage('error', '覆盖物重合，请重新绘制！');
        return false;
      }
    }
  }
  return true;
};
export default checkOverlayIntersections;