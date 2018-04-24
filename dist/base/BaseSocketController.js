"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    static bindEvent(eventName, action) {
        this.methods = this.methods || {};
        this.methods[eventName] = action.bind(this);
    }
}
BaseSocketController.methods = {};
exports.default = BaseSocketController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVNvY2tldENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYmFzZS9CYXNlU29ja2V0Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOztHQUVHO0FBQ0g7SUFHRTs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUF1QjtRQUM5QyxLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdkMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQy9EO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNPLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE1BQU07UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7QUExQmdCLDRCQUFPLEdBQXdDLEVBQUUsQ0FBQztBQURyRSx1Q0E0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTb2NrZXRJTyBmcm9tICdzb2NrZXQuaW8nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGNsYXNzIGZvciBjcmVhdGluZyBTb2NrZXQgQ29udHJvbGxlcnMsIGNvbGxlY3Rpb24gb2Ygc29ja2V0IExpc3RlbmVycy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVNvY2tldENvbnRyb2xsZXIge1xuICBwcm90ZWN0ZWQgc3RhdGljIG1ldGhvZHM6IHsgW2tleTogc3RyaW5nXTogKC4uLmFyZ3MpID0+IGFueSB9ID0ge307XG5cbiAgLyoqXG4gICAqIEJpbmRzIGEgU29ja2V0IGluc3RhbmNlIHRvIHRoZSBjb250cm9sbGVyIG1ldGhvZHMuXG4gICAqIFxuICAgKiBAcGFyYW0gc29ja2V0IFRoZSBzb2NrZXQgaW5zdGFuY2VcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYmluZFNvY2tldChzb2NrZXQ6IFNvY2tldElPLlNvY2tldCkge1xuICAgIGZvciAoY29uc3QgYWN0aW9uIGluIHRoaXMubWV0aG9kcykge1xuICAgICAgaWYgKHRoaXMubWV0aG9kcy5oYXNPd25Qcm9wZXJ0eShhY3Rpb24pKSB7XG4gICAgICAgIHNvY2tldC5vbihhY3Rpb24sIGRhdGEgPT4gdGhpcy5tZXRob2RzW2FjdGlvbl0oc29ja2V0LCBkYXRhKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIGEgU29ja2V0IGluc3RhbmNlIHRvIHRoaXMgY29udHJvbGxlciBtZXRob2RzLiBUaGlzIHNob3VsZCBub3QgYmVcbiAgICogY2FsbGVkIGRpcmVjdGx5LCB1c2UgdGhlIGRlY29yYXRvciBpbnN0ZWFkLlxuICAgKiBcbiAgICogQHNlZSBMaXN0ZW5lclxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBzb2NrZXQgZXZlbnQgbmFtZVxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBzb2NrZXQgYWN0aW9uIGxpc3RlbmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhdGljIGJpbmRFdmVudChldmVudE5hbWUsIGFjdGlvbikge1xuICAgIHRoaXMubWV0aG9kcyA9IHRoaXMubWV0aG9kcyB8fCB7fTtcbiAgICB0aGlzLm1ldGhvZHNbZXZlbnROYW1lXSA9IGFjdGlvbi5iaW5kKHRoaXMpO1xuICB9XG59XG4iXX0=