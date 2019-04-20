import * as Redis from 'redis';
import * as SockerRedisAdapter from 'socket.io-redis';
import * as SocketIOWildcard from 'socketio-wildcard';
import { Logger, LoggerInstance } from 'ts-framework-common';
import { BaseAuthorizationHandler } from './base/BaseAuthorizationHandler';
import { BaseSocketController } from 'base/BaseSocketController';

export interface SocketServerOptions {
  redis?: Redis.RedisClient;
  logger?: LoggerInstance;
  listeners?: (typeof BaseSocketController)[];
}

export class SocketServer {
  public io: SocketIO.Server;
  protected logger: LoggerInstance;

  public constructor(io: SocketIO.Server, protected options: SocketServerOptions = {}) {
    this.io = io;
    this.logger = options.logger || Logger.getInstance();
    this.logger.debug('Socket service bound to Socket.io instance');

    // Prepare wildcard adapter
    this.io.use(SocketIOWildcard());

    // If enabled, prepare redis adapter for centralized sessions
    if (this.options.redis) {
      this.logger.debug('Socket service initializing Redis adapter for sticky sessions...');
      this.io.adapter(SockerRedisAdapter({ pubClient: this.options.redis, subClient: this.options.redis }));
    }

    // Bind event listeners
    this.io.on('connection', this.onConnect.bind(this));
  }

  /**
   * Handles a new client connection.
   */
  protected onConnect(socket: SocketIO.Socket) {
    const info = { id: socket.id } as any;
    this.logger.silly('Socket client connected', info);
    socket.on('error', this.onError.bind(this, socket));
    socket.on('disconnect', this.onDisconnect.bind(this, socket));

    // Bind all listeners to socket instance
    for (const listener of this.options.listeners || []) {
      this.logger.silly(`Biding socket client to "${listener.name}" listener`, info);
      listener.bindSocket(socket);
    }
  }

  /**
   * Handles a client disconnecting.
   */
  protected onDisconnect(socket: SocketIO.Socket) {
    const info = { id: socket.id } as any;
    this.logger.silly('Socket client disconnected', info);
  }

  /**
   * Handles an unknown socket error.
   */
  public async onError(error: Error): Promise<void> {
    this.logger.error(`Unknown socket error: ${error.message}`, error);
  }

  /**
   * Sets the handler for socket authorizations.
   */
  public setAuthorizationHandler(handler: BaseAuthorizationHandler) {
    // Bind middlewares
    (this.io as any).set('authorization', handler.onAuthorization.bind(handler));
  }
}
