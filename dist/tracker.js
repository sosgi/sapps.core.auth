System.register(['sapps.core.api', './services', './repository'], function (_export) {
    'use strict';

    var IUserService, IAuthService, IHttpConnection, USER_LOAD, USER_UNLOAD, UserService, AuthService, Repository, UserServiceTracker;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_sappsCoreApi) {
            IUserService = _sappsCoreApi.IUserService;
            IAuthService = _sappsCoreApi.IAuthService;
            IHttpConnection = _sappsCoreApi.IHttpConnection;
            USER_LOAD = _sappsCoreApi.USER_LOAD;
            USER_UNLOAD = _sappsCoreApi.USER_UNLOAD;
        }, function (_services) {
            UserService = _services.UserService;
            AuthService = _services.AuthService;
        }, function (_repository) {
            Repository = _repository['default'];
        }],
        execute: function () {
            UserServiceTracker = (function () {
                function UserServiceTracker(ctx, dispacher) {
                    _classCallCheck(this, UserServiceTracker);

                    this._ctx = ctx;
                    this._dispacher = dispacher;
                }

                _createClass(UserServiceTracker, [{
                    key: 'start',
                    value: function start() {
                        this._tracker = this._ctx.services.tracker(IHttpConnection, this).open();
                    }
                }, {
                    key: 'stop',
                    value: function stop() {
                        this._tracker.close();
                        this._user = null;
                        this._auth = null;
                    }
                }, {
                    key: 'addingService',
                    value: function addingService(ref, connection) {
                        var _this = this;

                        var repository = new Repository(connection);
                        var userService = new UserService(repository);
                        var authService = new AuthService(repository);

                        userService.getUser().then(function (user) {
                            _this._dispacher.user(USER_LOAD, user);
                        });
                        this._user = this._ctx.services.register(IUserService, userService);
                        this._auth = this._ctx.services.register(IAuthService, authService);
                    }
                }, {
                    key: 'removedService',
                    value: function removedService(ref) {
                        this._dispacher.user(USER_UNLOAD);
                        this._user.unregister();
                        this._auth.unregister();
                        this._user = null;
                        this._auth = null;
                    }
                }]);

                return UserServiceTracker;
            })();

            _export('default', UserServiceTracker);
        }
    };
});