'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nameToIDs = nameToIDs;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function nameToIDs(name) {
    return name.split('.').reduce(function (ids, name) {
        return ids.concat(ids.length ? ids[ids.length - 1] + '.' + name : name);
    }, []);
}

function extractSegmentParams(name, state) {
    if (!state._meta || !state._meta[name]) return {};

    return Object.keys(state._meta[name]).reduce(function (params, p) {
        params[p] = state.params[p];
        return params;
    }, {});
}

function transitionPath(toState, fromState) {
    var fromStateIds = fromState ? nameToIDs(fromState.name) : [];
    var toStateIds = nameToIDs(toState.name);
    var maxI = Math.min(fromStateIds.length, toStateIds.length);

    function pointOfDifference() {
        var i = undefined;

        var _loop = function _loop() {
            var left = fromStateIds[i];
            var right = toStateIds[i];

            if (left !== right) return {
                    v: i
                };

            var leftParams = extractSegmentParams(left, toState);
            var rightParams = extractSegmentParams(right, fromState);

            if (leftParams.length !== rightParams.length) return {
                    v: i
                };
            if (leftParams.length === 0) return 'continue';

            var different = Object.keys(leftParams).some(function (p) {
                return rightParams[p] !== leftParams[p];
            });
            if (different) {
                return {
                    v: i
                };
            }
        };

        for (i = 0; i < maxI; i += 1) {
            var _ret = _loop();

            switch (_ret) {
                case 'continue':
                    continue;

                default:
                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
        }

        return i;
    }

    var i = undefined;
    if (!fromState) {
        i = 0;
    } else if (!fromState || toState.name === fromState.name && (!toState._meta || !fromState._meta)) {
        console.log('[router5.transition-path] Some states are missing metadata, reloading all segments');
        i = 0;
    } else {
        i = pointOfDifference();
    }

    var toDeactivate = fromStateIds.slice(i).reverse();
    var toActivate = toStateIds.slice(i);

    var intersection = fromState && i > 0 ? fromStateIds[i - 1] : '';

    return {
        intersection: intersection,
        toDeactivate: toDeactivate,
        toActivate: toActivate
    };
}

exports.default = transitionPath;