export enum MarkerType {
  BlueCircle,
  Text,
}

export const MarkerTypes = {
  [MarkerType.BlueCircle]: {
    src: '/markers/blueCircle.svg',
    xCalibrate: -0.5,
    yCalibrate: -0.5,
    type: 'svg',
  },
  [MarkerType.Text]: {
    xCalibrate: -0.5,
    yCalibrate: -0.5,
    type: 'text',
    fontSize: 24,
    fill: 'red',
  },
}
