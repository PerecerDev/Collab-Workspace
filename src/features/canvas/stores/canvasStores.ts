import { create } from 'zustand';

import type {
  CanvasTool,
  ViewportState,
} from '@/features/canvas/types/canvas.types';
import { CANVAS_ZOOM_DEFAULT } from '@/features/canvas/types/canvas.types';
import {
  clampZoom,
  panViewport,
  zoomAtPoint,
} from '@/features/canvas/utils/viewportMath';

interface CanvasViewportState {
  viewport: ViewportState;
  isPanning: boolean;
  setViewport: (viewport: ViewportState) => void;
  setIsPanning: (isPanning: boolean) => void;
  panBy: (deltaX: number, deltaY: number) => void;
  zoomTo: (zoom: number, anchor?: { x: number; y: number }) => void;
  zoomIn: (anchor?: { x: number; y: number }) => void;
  zoomOut: (anchor?: { x: number; y: number }) => void;
  resetViewport: () => void;
}

const DEFAULT_VIEWPORT: ViewportState = {
  x: 0,
  y: 0,
  zoom: CANVAS_ZOOM_DEFAULT,
};

export const useCanvasViewportStore = create<CanvasViewportState>(
  (set, get) => ({
    viewport: DEFAULT_VIEWPORT,
    isPanning: false,

    setViewport: (viewport) => set({ viewport }),

    setIsPanning: (isPanning) => set({ isPanning }),

    panBy: (deltaX, deltaY) =>
      set((state) => ({
        viewport: panViewport(state.viewport, { x: deltaX, y: deltaY }),
      })),

    zoomTo: (zoom, anchor) =>
      set((state) => {
        const point = anchor ?? { x: 0, y: 0 };
        return {
          viewport: zoomAtPoint(state.viewport, point, zoom),
        };
      }),

    zoomIn: (anchor) => {
      const { viewport } = get();
      get().zoomTo(clampZoom(viewport.zoom + 0.1), anchor);
    },

    zoomOut: (anchor) => {
      const { viewport } = get();
      get().zoomTo(clampZoom(viewport.zoom - 0.1), anchor);
    },

    resetViewport: () => set({ viewport: DEFAULT_VIEWPORT }),
  }),
);

interface CanvasToolState {
  activeTool: CanvasTool;
  isSpacePressed: boolean;
  setActiveTool: (tool: CanvasTool) => void;
  setSpacePressed: (pressed: boolean) => void;
  getEffectiveTool: () => CanvasTool;
}

export const useCanvasToolStore = create<CanvasToolState>((set, get) => ({
  activeTool: 'select',
  isSpacePressed: false,

  setActiveTool: (activeTool) => set({ activeTool }),

  setSpacePressed: (isSpacePressed) => set({ isSpacePressed }),

  getEffectiveTool: () => {
    const { activeTool, isSpacePressed } = get();
    return isSpacePressed ? 'hand' : activeTool;
  },
}));

interface CanvasSelectionState {
  selectedIds: string[];
  select: (id: string, additive?: boolean) => void;
  toggle: (id: string) => void;
  selectMany: (ids: string[]) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
}

export const useCanvasSelectionStore = create<CanvasSelectionState>(
  (set, get) => ({
    selectedIds: [],

    select: (id, additive = false) =>
      set((state) => ({
        selectedIds: additive
          ? state.selectedIds.includes(id)
            ? state.selectedIds
            : [...state.selectedIds, id]
          : [id],
      })),

    toggle: (id) =>
      set((state) => ({
        selectedIds: state.selectedIds.includes(id)
          ? state.selectedIds.filter((item) => item !== id)
          : [...state.selectedIds, id],
      })),

    clear: () => set({ selectedIds: [] }),

    selectMany: (ids) => set({ selectedIds: ids }),

    isSelected: (id) => get().selectedIds.includes(id),
  }),
);
