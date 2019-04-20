"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_framework_common_1 = require("ts-framework-common");
/**
 * The base class for creating Socket Controllers, collection of socket Listeners.
 */
class BaseSocketController {
    /**
     * Binds a Socket instance to the controller methods.
     *
     * @param socket The socket instance
     */
    static bindSocket(socket) {
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
    static bindEvent(eventName, action) {
        this.methods = this.methods || {};
        if (this.methods[eventName]) {
            throw new ts_framework_common_1.BaseError('Event is already bound in this controller for another listener');
        }
        this.methods[eventName] = action.bind(this);
    }
}
BaseSocketController.methods = {};
exports.BaseSocketController = BaseSocketController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVNvY2tldENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYmFzZS9CYXNlU29ja2V0Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZEQUFnRDtBQUVoRDs7R0FFRztBQUNILE1BQWEsb0JBQW9CO0lBRy9COzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQXVCO1FBQzlDLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdkU7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNPLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBaUIsRUFBRSxNQUFnQztRQUM1RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBRWxDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMzQixNQUFNLElBQUksK0JBQVMsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO1NBQ3ZGO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7O0FBN0JnQiw0QkFBTyxHQUF3QyxFQUFFLENBQUM7QUFEckUsb0RBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU29ja2V0SU8gZnJvbSAnc29ja2V0LmlvJztcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGNsYXNzIGZvciBjcmVhdGluZyBTb2NrZXQgQ29udHJvbGxlcnMsIGNvbGxlY3Rpb24gb2Ygc29ja2V0IExpc3RlbmVycy5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VTb2NrZXRDb250cm9sbGVyIHtcbiAgcHJvdGVjdGVkIHN0YXRpYyBtZXRob2RzOiB7IFtrZXk6IHN0cmluZ106ICguLi5hcmdzKSA9PiBhbnkgfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBCaW5kcyBhIFNvY2tldCBpbnN0YW5jZSB0byB0aGUgY29udHJvbGxlciBtZXRob2RzLlxuICAgKlxuICAgKiBAcGFyYW0gc29ja2V0IFRoZSBzb2NrZXQgaW5zdGFuY2VcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYmluZFNvY2tldChzb2NrZXQ6IFNvY2tldElPLlNvY2tldCkge1xuICAgIGZvciAoY29uc3QgYWN0aW9uIGluIHRoaXMubWV0aG9kcykge1xuICAgICAgc29ja2V0Lm9uKGFjdGlvbiwgKC4uLmFyZ3MpID0+IHRoaXMubWV0aG9kc1thY3Rpb25dKHNvY2tldCwgLi4uYXJncykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kcyBhIFNvY2tldCBpbnN0YW5jZSB0byB0aGlzIGNvbnRyb2xsZXIgbWV0aG9kcy4gVGhpcyBzaG91bGQgbm90IGJlXG4gICAqIGNhbGxlZCBkaXJlY3RseSwgdXNlIHRoZSBkZWNvcmF0b3IgaW5zdGVhZC5cbiAgICpcbiAgICogQHNlZSBMaXN0ZW5lclxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBzb2NrZXQgZXZlbnQgbmFtZVxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBzb2NrZXQgYWN0aW9uIGxpc3RlbmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhdGljIGJpbmRFdmVudChldmVudE5hbWU6IHN0cmluZywgYWN0aW9uOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQpIHtcbiAgICB0aGlzLm1ldGhvZHMgPSB0aGlzLm1ldGhvZHMgfHwge307XG5cbiAgICBpZiAodGhpcy5tZXRob2RzW2V2ZW50TmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoJ0V2ZW50IGlzIGFscmVhZHkgYm91bmQgaW4gdGhpcyBjb250cm9sbGVyIGZvciBhbm90aGVyIGxpc3RlbmVyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5tZXRob2RzW2V2ZW50TmFtZV0gPSBhY3Rpb24uYmluZCh0aGlzKTtcbiAgfVxufVxuIl19