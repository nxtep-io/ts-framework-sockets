import * as SocketIO from 'socket.io';

/**
 * The base class for creating Socket Controllers, collection of socket Listeners.
 */
export default class BaseSocketController {
  protected static methods: { [key: string]: (...args) => any } = {};

  /**
   * Binds a Socket instance to the controller methods.
   * 
   * @param socket The socket instance
   */
  public static bindSocket(socket: SocketIO.Socket) {
    for (const action in this.methods) {
      if (this.methods.hasOwnProperty(action)) {
        socket.on(action, data => this.methods[action](socket, data));
      }
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
  protected static bindEvent(eventName, action) {
    this.methods = this.methods || {};
    this.methods[eventName] = action.bind(this);
  }
}
