System.register(['./tracker', './event'], function (_export) {
    'use strict';

    var UserServiceTracker, EventDispatcher, service;

    _export('start', start);

    _export('stop', stop);

    function start(ctx) {
        service = new UserServiceTracker(ctx, new EventDispatcher(ctx));
        service.start();
    }

    function stop(ctx) {
        service.stop();
    }

    return {
        setters: [function (_tracker) {
            UserServiceTracker = _tracker['default'];
        }, function (_event) {
            EventDispatcher = _event['default'];
        }],
        execute: function () {}
    };
});