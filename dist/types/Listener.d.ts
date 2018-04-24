/**
 * Binds a public static method from a class that extends BaseSocketController
 * to a socket instance, when bound to.
 *
 * @param eventName The event name to bind this action to.
 */
export declare function Listener(eventName: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
