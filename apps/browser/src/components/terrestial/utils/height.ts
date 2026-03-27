export class HeightMap {
  private imageData: ImageData | null = null;
  private width = 0;
  private height = 0;
  private loadPromise: Promise<void>;

  constructor(imageUrl: string) {
    this.loadPromise = new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        this.width = img.width;
        this.height = img.height;
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          this.imageData = ctx.getImageData(0, 0, this.width, this.height);
        }
        resolve();
      };
      img.onerror = () => {
        console.error("Failed to load HeightMap image:", imageUrl);
        resolve();
      };
      img.src = imageUrl;
    });
  }

  async waitForLoad() {
    return this.loadPromise;
  }

  getYPosition(worldX: number, worldZ: number): number {
    if (!this.imageData) return 0;

    let u = worldX / 800.0;
    let v = worldZ / 800.0;

    u = u - Math.floor(u);
    v = v - Math.floor(v);

    v = 1.0 - v;

    let px = Math.floor(u * this.width);
    let py = Math.floor(v * this.height);

    px = Math.max(0, Math.min(this.width - 1, px));
    py = Math.max(0, Math.min(this.height - 1, py));

    const index = (py * this.width + px) * 4;
    const r = this.imageData.data[index] / 255.0;

    return 8.0 * (2.0 * r - 1.0);
  }
}

export function getSphereOffset(
  localX: number,
  localZ: number,
  radius: number
): number {
  if (radius <= 0) return 0;
  const lenXZ = Math.hypot(localX, localZ);
  if (lenXZ <= 1e-5) return 0;

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));
  const safeAcos = (val: number) => Math.acos(clamp(val, -1.0, 1.0));

  const theta = safeAcos(localZ / radius);
  const denom = radius * Math.sin(Math.max(theta, 1e-5));
  const phi = safeAcos(localX / denom);
  const sV = radius * Math.sin(theta) * Math.sin(phi);

  const sphereY = isNaN(sV) ? 0 : sV;
  return Math.max(0, sphereY) - radius;
}
