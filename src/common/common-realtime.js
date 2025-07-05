// SPDX-FileCopyrightText: 2023 XWiki CryptPad Team <contact@cryptpad.org> and contributors
//
// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {
const factory = () => {
    var common = {};

    /*
        TODO make this not blow up when disconnected or lagging...
    */
    common.whenRealtimeSyncs = function (realtime, cb) {
        if (typeof(realtime.getAuthDoc) !== 'function') {
            return void console.error('improper use of this function');
        }
        setTimeout(function () {
            if (realtime.getAuthDoc() === realtime.getUserDoc()) {
                return void cb();
            } else {
                realtime.onSettle(cb);
            }
        }, 0);
    };

    return common;
};

if (typeof(module) !== 'undefined' && module.exports) {
    module.exports = factory();
} else if ((typeof(define) !== 'undefined' && define !== null) && (define.amd !== null)) {
    define([], factory);
} else {
    // unsupported initialization
}

})();
