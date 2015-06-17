System.register(['sapps.core.api', './domain'], function (_export) {
    'use strict';

    var USER_LOAD, USER_UNLOAD, createUser, UserService, AuthService;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_sappsCoreApi) {
            USER_LOAD = _sappsCoreApi.USER_LOAD;
            USER_UNLOAD = _sappsCoreApi.USER_UNLOAD;
        }, function (_domain) {
            createUser = _domain.createUser;
        }],
        execute: function () {
            UserService = (function () {
                function UserService(repository) {
                    _classCallCheck(this, UserService);

                    this._repository = repository;
                    this._user = null;
                }

                _createClass(UserService, [{
                    key: 'getUser',
                    value: function getUser() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            if (_this._user !== null) {
                                resolve(_this._user);
                            } else {
                                _this._repository.getUser().then(function (data) {
                                    _this._user = createUser(data);
                                    resolve(_this._user);
                                });
                            }
                        });
                    }
                }, {
                    key: 'udate',
                    value: function udate(data) {}
                }]);

                return UserService;
            })();

            _export('UserService', UserService);

            AuthService = (function () {
                function AuthService(repository) {
                    _classCallCheck(this, AuthService);

                    this._repository = repository;
                    this._user = null;
                }

                _createClass(AuthService, [{
                    key: 'login',
                    value: function login(_login, password) {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._repository.login(_login, password).then(function (data) {
                                this._user = createUser(data);
                                if (!this._user.isAnonymous()) {
                                    this._dispacher.auth(LOGIN, this._user);
                                }
                            }, reject);
                        });
                    }
                }, {
                    key: 'logout',
                    value: function logout() {
                        var _this3 = this;

                        var self = this;
                        return new Promise(function (resolve, reject) {
                            _this3._repository.logout().then(function () {
                                var user = self._user;
                                self._user = createUser();
                                self._dispacher.auth(LOGOUT, user);
                            }, reject);
                        });
                    }
                }]);

                return AuthService;
            })();

            _export('AuthService', AuthService);
        }
    };
});