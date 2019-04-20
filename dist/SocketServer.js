"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SockerRedisAdapter = require("socket.io-redis");
const SocketIOWildcard = require("socketio-wildcard");
const ts_framework_common_1 = require("ts-framework-common");
class SocketServer {
    constructor(io, options = {}) {
        this.options = options;
        this.io = io;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
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
    onConnect(socket) {
        const info = { id: socket.id };
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
    onDisconnect(socket) {
        const info = { id: socket.id };
        this.logger.silly('Socket client disconnected', info);
    }
    /**
     * Handles an unknown socket error.
     */
    onError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.error(`Unknown socket error: ${error.message}`, error);
        });
    }
    /**
     * Sets the handler for socket authorizations.
     */
    setAuthorizationHandler(handler) {
        // Bind middlewares
        this.io.set('authorization', handler.onAuthorization.bind(handler));
    }
}
exports.SocketServer = SocketServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ja2V0U2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL1NvY2tldFNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0Esc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUN0RCw2REFBNkQ7QUFVN0QsTUFBYSxZQUFZO0lBSXZCLFlBQW1CLEVBQW1CLEVBQVksVUFBK0IsRUFBRTtRQUFqQyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUNqRixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7UUFFaEUsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUVoQyw2REFBNkQ7UUFDN0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN2RztRQUVELHVCQUF1QjtRQUN2QixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxTQUFTLENBQUMsTUFBdUI7UUFDekMsTUFBTSxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRTlELHdDQUF3QztRQUN4QyxLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsUUFBUSxDQUFDLElBQUksWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQy9FLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxZQUFZLENBQUMsTUFBdUI7UUFDNUMsTUFBTSxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBUyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7T0FFRztJQUNVLE9BQU8sQ0FBQyxLQUFZOztZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0ksdUJBQXVCLENBQUMsT0FBaUM7UUFDOUQsbUJBQW1CO1FBQ2xCLElBQUksQ0FBQyxFQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7Q0FDRjtBQTVERCxvQ0E0REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWRpcyBmcm9tICdyZWRpcyc7XG5pbXBvcnQgKiBhcyBTb2NrZXJSZWRpc0FkYXB0ZXIgZnJvbSAnc29ja2V0LmlvLXJlZGlzJztcbmltcG9ydCAqIGFzIFNvY2tldElPV2lsZGNhcmQgZnJvbSAnc29ja2V0aW8td2lsZGNhcmQnO1xuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuaW1wb3J0IHsgQmFzZUF1dGhvcml6YXRpb25IYW5kbGVyIH0gZnJvbSAnLi9iYXNlL0Jhc2VBdXRob3JpemF0aW9uSGFuZGxlcic7XG5pbXBvcnQgeyBCYXNlU29ja2V0Q29udHJvbGxlciB9IGZyb20gJ2Jhc2UvQmFzZVNvY2tldENvbnRyb2xsZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNvY2tldFNlcnZlck9wdGlvbnMge1xuICByZWRpcz86IFJlZGlzLlJlZGlzQ2xpZW50O1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgbGlzdGVuZXJzPzogKHR5cGVvZiBCYXNlU29ja2V0Q29udHJvbGxlcilbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFNvY2tldFNlcnZlciB7XG4gIHB1YmxpYyBpbzogU29ja2V0SU8uU2VydmVyO1xuICBwcm90ZWN0ZWQgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoaW86IFNvY2tldElPLlNlcnZlciwgcHJvdGVjdGVkIG9wdGlvbnM6IFNvY2tldFNlcnZlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuaW8gPSBpbztcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdTb2NrZXQgc2VydmljZSBib3VuZCB0byBTb2NrZXQuaW8gaW5zdGFuY2UnKTtcblxuICAgIC8vIFByZXBhcmUgd2lsZGNhcmQgYWRhcHRlclxuICAgIHRoaXMuaW8udXNlKFNvY2tldElPV2lsZGNhcmQoKSk7XG5cbiAgICAvLyBJZiBlbmFibGVkLCBwcmVwYXJlIHJlZGlzIGFkYXB0ZXIgZm9yIGNlbnRyYWxpemVkIHNlc3Npb25zXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZWRpcykge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1NvY2tldCBzZXJ2aWNlIGluaXRpYWxpemluZyBSZWRpcyBhZGFwdGVyIGZvciBzdGlja3kgc2Vzc2lvbnMuLi4nKTtcbiAgICAgIHRoaXMuaW8uYWRhcHRlcihTb2NrZXJSZWRpc0FkYXB0ZXIoeyBwdWJDbGllbnQ6IHRoaXMub3B0aW9ucy5yZWRpcywgc3ViQ2xpZW50OiB0aGlzLm9wdGlvbnMucmVkaXMgfSkpO1xuICAgIH1cblxuICAgIC8vIEJpbmQgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5pby5vbignY29ubmVjdGlvbicsIHRoaXMub25Db25uZWN0LmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBuZXcgY2xpZW50IGNvbm5lY3Rpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgb25Db25uZWN0KHNvY2tldDogU29ja2V0SU8uU29ja2V0KSB7XG4gICAgY29uc3QgaW5mbyA9IHsgaWQ6IHNvY2tldC5pZCB9IGFzIGFueTtcbiAgICB0aGlzLmxvZ2dlci5zaWxseSgnU29ja2V0IGNsaWVudCBjb25uZWN0ZWQnLCBpbmZvKTtcbiAgICBzb2NrZXQub24oJ2Vycm9yJywgdGhpcy5vbkVycm9yLmJpbmQodGhpcywgc29ja2V0KSk7XG4gICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgdGhpcy5vbkRpc2Nvbm5lY3QuYmluZCh0aGlzLCBzb2NrZXQpKTtcblxuICAgIC8vIEJpbmQgYWxsIGxpc3RlbmVycyB0byBzb2NrZXQgaW5zdGFuY2VcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgfHwgW10pIHtcbiAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KGBCaWRpbmcgc29ja2V0IGNsaWVudCB0byBcIiR7bGlzdGVuZXIubmFtZX1cIiBsaXN0ZW5lcmAsIGluZm8pO1xuICAgICAgbGlzdGVuZXIuYmluZFNvY2tldChzb2NrZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgY2xpZW50IGRpc2Nvbm5lY3RpbmcuXG4gICAqL1xuICBwcm90ZWN0ZWQgb25EaXNjb25uZWN0KHNvY2tldDogU29ja2V0SU8uU29ja2V0KSB7XG4gICAgY29uc3QgaW5mbyA9IHsgaWQ6IHNvY2tldC5pZCB9IGFzIGFueTtcbiAgICB0aGlzLmxvZ2dlci5zaWxseSgnU29ja2V0IGNsaWVudCBkaXNjb25uZWN0ZWQnLCBpbmZvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIHVua25vd24gc29ja2V0IGVycm9yLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uRXJyb3IoZXJyb3I6IEVycm9yKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5sb2dnZXIuZXJyb3IoYFVua25vd24gc29ja2V0IGVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCwgZXJyb3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGhhbmRsZXIgZm9yIHNvY2tldCBhdXRob3JpemF0aW9ucy5cbiAgICovXG4gIHB1YmxpYyBzZXRBdXRob3JpemF0aW9uSGFuZGxlcihoYW5kbGVyOiBCYXNlQXV0aG9yaXphdGlvbkhhbmRsZXIpIHtcbiAgICAvLyBCaW5kIG1pZGRsZXdhcmVzXG4gICAgKHRoaXMuaW8gYXMgYW55KS5zZXQoJ2F1dGhvcml6YXRpb24nLCBoYW5kbGVyLm9uQXV0aG9yaXphdGlvbi5iaW5kKGhhbmRsZXIpKTtcbiAgfVxufVxuIl19