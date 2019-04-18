import * as SocketIO from 'socket.io';
/**
 * The base class for creating Socket Controllers, collection of socket Listeners.
 */
export declare class BaseSocketController {
    protected static methods: {
        [key: string]: (...args: any[]) => any;
    };
    /**
     * Binds a Socket instance to the controller methods.
     *
     * @param socket The socket instance
     */
    static bindSocket(socket: SocketIO.Socket): void;
    /**
     * Binds a Socket instance to this controller methods. This should not be
     * called directly, use the decorator instead.
     *
     * @see Listener
     * @param eventName The socket event name
     * @param eventName The socket action listener
     */
    protected static bindEvent(eventName: any, action: any): void;
}
