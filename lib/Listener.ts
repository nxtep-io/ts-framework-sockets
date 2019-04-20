/**
 * Binds a public static method from a class that extends BaseSocketController
 * to a socket instance, when bound to.
 *
 * @param eventName The event name to bind this action to.
 */
// tslint:disable-next-line:function-name
export function Listener(eventName: string) {
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    target.bindEvent(eventName, descriptor.value);
  };
}
