System.register([], function (_export) {
    'use strict';

    var Repository;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [],
        execute: function () {
            Repository = (function () {
                function Repository(connection) {
                    _classCallCheck(this, Repository);

                    this.connection = connection;
                }

                _createClass(Repository, [{
                    key: 'getUser',
                    value: function getUser() {
                        return this.connection.get('/user');
                    }
                }, {
                    key: 'login',
                    value: function login(_login, password) {
                        return this.connection.post('/login', {
                            login: _login,
                            password: password
                        });
                    }
                }, {
                    key: 'logout',
                    value: function logout() {
                        return this.connection.get('/logout');
                    }
                }]);

                return Repository;
            })();

            _export('default', Repository);
        }
    };
});