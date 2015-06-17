import {
    IUserService,
    IAuthService,
    IHttpConnection,
    USER_LOAD, USER_UNLOAD
} from 'sapps.core.api';
import {UserService, AuthService} from './services';
import Repository from './repository';


export default class UserServiceTracker{
    constructor(ctx, dispacher) {
        this._ctx = ctx;
        this._dispacher = dispacher;
    }
    start() {
        this._tracker = this._ctx.services.tracker(IHttpConnection, this).open();
    }
    stop() {
        this._tracker.close();
        this._user = null;
        this._auth = null;
    }
    addingService(ref, connection) {
        var repository = new Repository(connection);
        var userService = new UserService(repository);
        var authService = new AuthService(repository);

        userService.getUser().then(user => {
          this._dispacher.user(USER_LOAD, user)
        })
        this._user = this._ctx.services.register(IUserService, userService);
        this._auth = this._ctx.services.register(IAuthService, authService);
    }
    removedService(ref) {
        this._dispacher.user(USER_UNLOAD)
        this._user.unregister();
        this._auth.unregister();
        this._user = null;
        this._auth = null;
    }
}
