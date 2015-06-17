import UserServiceTracker from './tracker';
import EventDispatcher from './event';

var service;
export function start(ctx) {
    service = new UserServiceTracker(ctx, new EventDispatcher(ctx));
    service.start();
}
export function stop(ctx) {
    service.stop();
}
