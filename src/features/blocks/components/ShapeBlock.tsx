import type { ShapeKind } from '@/features/blocks/types/block.types';
import { cn } from '@/shared/lib/cn';

interface ShapeBlockProps {
  color: string;
  shapeKind?: ShapeKind;
}

export function ShapeBlock({
  color,
  shapeKind = 'rectangle',
}: ShapeBlockProps) {
  return (
    <div
      className={cn(
        'h-full w-full border-2 border-zinc-500/30 shadow-sm',
        shapeKind === 'ellipse' ? 'rounded-full' : 'rounded-lg',
      )}
      style={{ backgroundColor: color }}
      aria-label={shapeKind === 'ellipse' ? 'Ellipse shape' : 'Rectangle shape'}
    />
  );
}
