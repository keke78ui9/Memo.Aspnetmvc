"use strict";
MEMO.services.dataStorageSvc = (function () {

    (function () {
        // immediate ivoke functions come here.
    })();

    var _add = function (key, obj) {
        var value = JSON.stringify(obj);
        localStorage.setItem(key, value);
    };

    var _get = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };

    var _remove = function (key) {
        localStorage.removeItem(key);
    };

    var _changeOption = function(options) {
        return extend(_options, options);
    };

    var extend = function (a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            };
        }
    };

    return {
        save: _add,
        add: _add,
        addUpdate: _add,
        get: _get,
        remove: _remove,
        changeOpt: _changeOption
    };
})();