function transitionPath(toState, fromState) {
    function nameToIDs(name) {
        return name.split('.').reduce(function (ids, name) {
            return ids.concat(ids.length ? ids[ids.length - 1] + '.' + name : name);
        }, []);
    }

    let i;
    const fromStateIds = fromState ? nameToIDs(fromState.name) : [];
    const toStateIds = nameToIDs(toState.name);
    const maxI = Math.min(fromStateIds.length, toStateIds.length);

    if (fromState && fromState.name === toState.name) {
        i = Math.max(maxI - 1, 0);
    } else {
        for (i = 0; i < maxI; i += 1) {
            if (fromStateIds[i] !== toStateIds[i]) break;
        }
    }

    const toDeactivate = fromStateIds.slice(i).reverse();
    const toActivate   = toStateIds.slice(i);
    const intersection = fromState && i > 0 ? fromStateIds[i - 1] : '';

    return {
        intersection,
        toDeactivate,
        toActivate
    };
}

export default transitionPath;
