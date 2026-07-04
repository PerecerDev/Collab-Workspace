import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { useCanvasObjectsStore } from '@/features/canvas/stores/canvasObjectsStore';
import { useCanvasViewportStore } from '@/features/canvas/stores/canvasStores';
import { canvasSyncEngine } from '@/sync/canvasSyncEngine';

export function useCanvasDnd(userId: string) {
  const viewport = useCanvasViewportStore((state) => state.viewport);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
  );

  const handleDragEnd = (event: {
    active: { id: string | number };
    delta: { x: number; y: number };
  }) => {
    const objectId = String(event.active.id);
    const object = useCanvasObjectsStore.getState().getObject(objectId);

    if (object && event.delta) {
      canvasSyncEngine.moveObject(
        objectId,
        object.x + event.delta.x / viewport.zoom,
        object.y + event.delta.y / viewport.zoom,
        userId,
      );
    }
  };

  return { sensors, handleDragEnd };
}
