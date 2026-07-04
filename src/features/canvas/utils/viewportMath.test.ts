import { describe, expect, it } from 'vitest';

import {
  clampZoom,
  fitViewportToBounds,
  getObjectsBounds,
  screenToWorld,
  worldToScreen,
  zoomAtPoint,
} from '@/features/canvas/utils/viewportMath';

describe('viewportMath', () => {
  it('clamps zoom within bounds', () => {
    expect(clampZoom(0.1)).toBe(0.25);
    expect(clampZoom(3)).toBe(2);
    expect(clampZoom(1)).toBe(1);
  });

  it('converts between screen and world coordinates', () => {
    const viewport = { x: 100, y: 50, zoom: 2 };
    const world = screenToWorld({ x: 300, y: 250 }, viewport);
    expect(world).toEqual({ x: 100, y: 100 });

    const screen = worldToScreen(world, viewport);
    expect(screen).toEqual({ x: 300, y: 250 });
  });

  it('zooms around a screen anchor point', () => {
    const viewport = { x: 0, y: 0, zoom: 1 };
    const next = zoomAtPoint(viewport, { x: 100, y: 100 }, 2);

    expect(next.zoom).toBe(2);
    expect(next.x).toBe(-100);
    expect(next.y).toBe(-100);
  });

  it('computes bounds and fits viewport', () => {
    const bounds = getObjectsBounds([
      { x: 0, y: 0, width: 200, height: 100 },
      { x: 300, y: 50, width: 100, height: 100 },
    ]);

    expect(bounds).toEqual({ x: 0, y: 0, width: 400, height: 150 });

    const fitted = fitViewportToBounds({ x: 0, y: 0, zoom: 1 }, bounds!, {
      width: 800,
      height: 600,
    });

    expect(fitted.zoom).toBeLessThanOrEqual(1);
    expect(fitted.x).toBeTypeOf('number');
  });
});
