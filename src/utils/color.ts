export class Color {
  constructor(public r: number, public g: number, public b: number, public a = 1) {}

  static similarity(color1: Color, color2: Color) {
    return Math.sqrt(Math.pow(color1.r - color2.r, 2) + Math.pow(color1.g - color2.g, 2) + Math.pow(color1.b - color2.b, 2))
  }

  static rgba(rgbaStr: string) {
    const [r, g, b, a] = rgbaStr
      .match(/rgba\((.*)\)/i)?.[1]
      ?.split(',')
      ?.map((n) => parseInt(n, 10)) ?? [0, 0, 0, 1]
    return new Color(r, g, b, a)
  }

  toLab() {
    let r = this.r / 255,
      g = this.g / 255,
      b = this.b / 255

    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

    let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
    let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0
    let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116

    return [116 * y - 16, 500 * (x - y), 200 * (y - z)]
  }
}
