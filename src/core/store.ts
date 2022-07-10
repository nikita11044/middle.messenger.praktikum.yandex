import { set } from '../utils';

export type Indexed<T = any> = {
  [key in string]: T;
};

type EventHandler = (...args: any[]) => void;

type Subscription = { componentName: string, func: EventHandler };

export class Store {
  private state: Indexed = {};

  private subscriptions: Subscription[] = [];

  public subscribe(subscription: Subscription) {
    const existingSubscription = this.subscriptions.find((existing) => existing.componentName === subscription.componentName);
    if (existingSubscription) {
      this.unsubscribe(subscription.componentName);
    }
    this.subscriptions.push(subscription);
  }

  public unsubscribe(componentName: string) {
    this.subscriptions = this.subscriptions!.filter(
      (subscription) => subscription.componentName !== componentName,
    );
  }

  public emit(...args: any[]) {
    this.subscriptions.forEach((subscription) => {
      subscription.func(...args);
    });
  }

  public getState() {
    return this.state;
  }

  public set(path: keyof Indexed, value: unknown) {
    set(this.state, path, value);
    this.emit();
  }
}

const store = new Store();
export default store;
