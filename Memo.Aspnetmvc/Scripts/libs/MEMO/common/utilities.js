"use strict";
MEMO.common.utilities = (function () {

    (function () {
        // immediate ivoke functions come here.
    })();

    // equal to jquery.extend
    var _extend = function (a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            };
        }
    };

    // get property name
    var _propName = function (prop, value) {
        for (var i in prop) {
            if (prop[i] == value) {
                return i;
            }
        }
        return false;
    };

    // replace all the match
    var _replace = function (match, replace, value) {
        return value.replace(new RegExp(match, 'g'), replace);
    };

    return {
        extend: _extend,
        propertyName: _propName,
        replace: _replace
    };
})();