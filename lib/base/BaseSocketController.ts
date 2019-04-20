import * as SocketIO from 'socket.io';
import { BaseError } from 'ts-framework-common';

/**
 * The base class for creating Socket Controllers, collection of socket Listeners.
 */
export class BaseSocketController {
  protected static methods: { [key: string]: (...args) => any } = {};

  /**
   * Binds a Socket instance to the controller methods.
   *
   * @param socket The socket instance
   */
  public static bindSocket(socket: SocketIO.Socket) {
    for (const action in this.methods) {
      socket.on(action, (...args) => this.methods[action](socket, ...args));
    }
  }

  /**
   * Binds a Socket instance to this controller methods. This should not be
   * called directly, use the decorator instead.
   *
   * @see Listener
   * @param eventName The socket event name
   * @param eventName The socket action listener
   */
  protected static bindEvent(eventName: string, action: (...args: any[]) => void) {
    this.methods = this.methods || {};

    if (this.methods[eventName]) {
      throw new BaseError('Event is already bound in this controller for another listener');
    }

    this.methods[eventName] = action.bind(this);
  }
}
