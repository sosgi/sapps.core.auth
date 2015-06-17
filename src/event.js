import {ServiceTracker} from 'sosgi.framework';
import {
  AuthEvent, IAuthListener,
  UserEvent, IUserListener
} from 'sapps.core.api';

export default class EventDispatcher{
    constructor(ctx) {
        this._user = new ServiceTracker(ctx, IUserListener);
        this._auth = new ServiceTracker(ctx, IAuthListener);
        this._user.open();
        this._auth.open();
    }

    auth(type, user) {
        var event = new AuthEvent(type, user);
        var services = this._auth.services();
        for (var i = 0, j = services.length; i < j; i++) {
            services[i].authEvent(event);
        }
    }

    user(type, user){
      var event = new UserEvent(type, user);
      var services = this._user.services();
      for (var i = 0, j = services.length; i < j; i++) {
          services[i].userEvent(event);
      }
    }
}
