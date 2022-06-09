type EventHandler = (...args: any[]) => void;

export default class EventBus {
  private listeners: Record<string, EventHandler[]> = {};

  public on(event: string, callback: EventHandler) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  public off(event: string, callback: EventHandler) {
    if (!this.listeners[event]) {
      throw new Error(`No such event: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      (listener) => listener !== callback,
    );
  }

  public emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
