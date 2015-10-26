function transitionPath(toState, fromState) {
    function nameToIDs(name) {
        return name.split('.').reduce(function (ids, name) {
            return ids.concat(ids.length ? ids[ids.length - 1] + '.' + name : name);
        }, []);
    }

    var i;
    var fromStateIds = fromState ? nameToIDs(fromState.name) : [];
    var toStateIds = nameToIDs(toState.name);
    var maxI = Math.min(fromStateIds.length, toStateIds.length);

    if (fromState && fromState.name === toState.name) {
        i = Math.max(maxI - 1, 0);
    } else {
        for (i = 0; i < maxI; i += 1) {
            if (fromStateIds[i] !== toStateIds[i]) break;
        }
    }

    var toDeactivate = fromStateIds.slice(i).reverse();
    var toActivate   = toStateIds.slice(i);
    var intersection = fromState && i > 0 ? fromStateIds[i - 1] : '';

    return {
        intersection: intersection,
        toDeactivate: toDeactivate,
        toActivate: toActivate
    };
}

module.exports = transitionPath;
