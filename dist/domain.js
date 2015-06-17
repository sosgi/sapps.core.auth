System.register([], function (_export) {
    'use strict';

    var User, AnonymousUser;

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    _export('createUser', createUser);

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function createUser(params) {
        params = params || {};
        return params.id ? new User(params.id, params) : new AnonymousUser();
    }

    return {
        setters: [],
        execute: function () {
            User = (function () {
                function User(id, params) {
                    _classCallCheck(this, User);

                    Object.defineProperties(this, {
                        id: {
                            get: function get() {
                                return id;
                            },
                            enumerable: true
                        },
                        name: {
                            value: params.name,
                            enumerable: true },
                        login: {
                            value: params.login,
                            enumerable: true }
                    });
                    this._params = params;
                }

                _createClass(User, [{
                    key: 'serialize',
                    value: function serialize() {
                        var params = Object.assign({}, this._params);
                        params.id = this.id;
                        return params;
                    }
                }, {
                    key: 'isAnonymous',
                    value: function isAnonymous() {
                        return false;
                    }
                }]);

                return User;
            })();

            _export('User', User);

            AnonymousUser = (function (_User) {
                function AnonymousUser() {
                    _classCallCheck(this, AnonymousUser);

                    _get(Object.getPrototypeOf(AnonymousUser.prototype), 'constructor', this).call(this, 0, { name: 'Anonymous', login: '' });
                }

                _inherits(AnonymousUser, _User);

                _createClass(AnonymousUser, [{
                    key: 'isAnonymous',
                    value: function isAnonymous() {
                        return true;
                    }
                }, {
                    key: 'getName',
                    value: function getName() {
                        return 'Anonymous';
                    }
                }]);

                return AnonymousUser;
            })(User);

            _export('AnonymousUser', AnonymousUser);
        }
    };
});