import {
  parseDomainEvent,
  parseEventPayload,
  type DomainEventInput,
} from '@/realtime/events/eventSchemas';
import type {
  DomainEvent,
  EventHandler,
} from '@/realtime/types/connection.types';

export class EventValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EventValidationError';
  }
}

type ListenerMap = Map<string, Set<EventHandler>>;

export class EventDispatcher {
  private readonly listeners: ListenerMap = new Map();
  private readonly wildcardListeners = new Set<EventHandler>();

  on<T>(eventType: string, handler: EventHandler<T>): () => void {
    const handlers = this.listeners.get(eventType) ?? new Set();
    handlers.add(handler as EventHandler);
    this.listeners.set(eventType, handlers);

    return () => {
      handlers.delete(handler as EventHandler);
      if (handlers.size === 0) this.listeners.delete(eventType);
    };
  }

  onAny(handler: EventHandler): () => void {
    this.wildcardListeners.add(handler);
    return () => this.wildcardListeners.delete(handler);
  }

  dispatch(raw: unknown): DomainEventInput | null {
    try {
      const event = parseDomainEvent(raw);
      const payload = parseEventPayload(event.type, event.payload);
      const domainEvent = { ...event, payload } as DomainEvent;

      const handlers = this.listeners.get(event.type);
      handlers?.forEach((handler) => handler(payload, domainEvent));
      this.wildcardListeners.forEach((handler) =>
        handler(payload, domainEvent),
      );

      return event;
    } catch {
      return null;
    }
  }

  clear(): void {
    this.listeners.clear();
    this.wildcardListeners.clear();
  }
}

export const globalEventDispatcher = new EventDispatcher();
