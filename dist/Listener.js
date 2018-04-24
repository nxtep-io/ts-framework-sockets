"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Binds a public static method from a class that extends BaseSocketController
 * to a socket instance, when bound to.
 *
 * @param eventName The event name to bind this action to.
 */
// tslint:disable-next-line:function-name
function Listener(eventName) {
    return function (target, propertyKey, descriptor) {
        target.constructor.bindEvent(eventName, descriptor.value);
    };
}
exports.Listener = Listener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvTGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7R0FLRztBQUNILHlDQUF5QztBQUN6QyxrQkFBeUIsU0FBaUI7SUFDeEMsT0FBTyxVQUFVLE1BQU0sRUFBRSxXQUFtQixFQUFFLFVBQThCO1FBQzFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUpELDRCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBCaW5kcyBhIHB1YmxpYyBzdGF0aWMgbWV0aG9kIGZyb20gYSBjbGFzcyB0aGF0IGV4dGVuZHMgQmFzZVNvY2tldENvbnRyb2xsZXJcbiAqIHRvIGEgc29ja2V0IGluc3RhbmNlLCB3aGVuIGJvdW5kIHRvLlxuICogXG4gKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBldmVudCBuYW1lIHRvIGJpbmQgdGhpcyBhY3Rpb24gdG8uXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmdW5jdGlvbi1uYW1lXG5leHBvcnQgZnVuY3Rpb24gTGlzdGVuZXIoZXZlbnROYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgIHRhcmdldC5jb25zdHJ1Y3Rvci5iaW5kRXZlbnQoZXZlbnROYW1lLCBkZXNjcmlwdG9yLnZhbHVlKTtcbiAgfTtcbn1cbiJdfQ==