import Server, { Logger } from 'ts-framework';
import * as Redis from 'redis';
import * as SockerRedisAdapter from 'socket.io-redis';
import * as SocketIOWildcard from 'socketio-wildcard';
import { BaseAuthorizationHandler } from './base/BaseAuthorizationHandler';

export interface SocketServerOptions {
  redis?: Redis.RedisClient;
}

export default class SocketServer {
  public io: SocketIO.Server;

  public constructor(io: SocketIO.Server, protected options: SocketServerOptions = {}) {
    this.io = io;

    // Prepare wildcard adapter
    this.io.use(SocketIOWildcard());

    // If enabled, prepare redis adapter for centralized sessions
    if (this.options.redis) {
      Logger.debug('Socket service initializing Redis adapter for sticky sessions...');
      this.io.adapter(SockerRedisAdapter({ pubClient: this.options.redis, subClient: this.options.redis }));
    }

    // Bind event listeners
    this.io.on('connect', this.onConnect.bind(this));
  }

  /**
   * Handles a new client connection.
   * 
   * @param socket The socket instance
   */
  protected onConnect(socket: SocketIO.Socket) {
    const info = { id: socket.id } as any;
    Logger.silly('Socket client connected', info);
    socket.on('error', this.onError.bind(this, socket));
    socket.on('disconnect', this.onDisconnect.bind(this, socket));
  }

  /**
   * Handles a client disconnecting.
   * 
   * @param socket The socket instance
   */
  protected onDisconnect(socket: SocketIO.Socket) {
    const info = { id: socket.id } as any;
    Logger.silly('Socket client disconnected', info);
  }

  /**
   * Handles an unknown socket error.
   * 
   * @param error The error instance
   */
  public async onError(error: Error): Promise<void> {
    Logger.error(`Unknown socket error: ${error.message}`, error);
  }

  /**
   * Sets the handler for socket authorizations.
   * 
   * @param handler The authorization handler instance
   */
  public setAuthorizationHandler(handler: BaseAuthorizationHandler) {
    // Bind middlewares
    (this.io as any).set('authorization', handler.onAuthorization.bind(handler));
  }
}
