import { describe, expect, it } from 'vitest';

import { createBlockNode } from '@/features/blocks/registry/createBlockNode';

describe('createBlockNode', () => {
  it('creates a sticky note centered on the click point', () => {
    const node = createBlockNode({
      workspaceId: 'ws-1',
      userId: 'user-1',
      x: 300,
      y: 200,
      zIndex: 1,
      tool: 'sticky',
    });

    expect(node.type).toBe('sticky_note');
    expect(node.x).toBe(200);
    expect(node.y).toBe(120);
    expect(node.width).toBe(200);
    expect(node.height).toBe(160);
  });

  it('creates an ellipse shape with shapeKind metadata', () => {
    const node = createBlockNode({
      workspaceId: 'ws-1',
      userId: 'user-1',
      x: 100,
      y: 100,
      zIndex: 2,
      tool: 'ellipse',
    });

    expect(node.type).toBe('shape');
    expect(node.shapeKind).toBe('ellipse');
  });
});
