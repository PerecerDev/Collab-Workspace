import {
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';

import { useCanvasObjectsStore } from '@/features/canvas/stores/canvasObjectsStore';
import { useCanvasViewportStore } from '@/features/canvas/stores/canvasStores';

export function useCanvasDnd(onDragEndExtra?: (event: DragEndEvent) => void) {
  const moveObject = useCanvasObjectsStore((state) => state.moveObject);
  const viewport = useCanvasViewportStore((state) => state.viewport);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const objectId = String(active.id);
    const object = useCanvasObjectsStore
      .getState()
      .objects.find((item) => item.id === objectId);

    if (object && delta) {
      moveObject(
        objectId,
        object.x + delta.x / viewport.zoom,
        object.y + delta.y / viewport.zoom,
      );
    }

    onDragEndExtra?.(event);
  };

  return { sensors, handleDragEnd };
}
