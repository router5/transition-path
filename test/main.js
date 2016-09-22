require('should');
require('mocha');

var transitionPath = require('../index.js').default;

describe('router5.transition-path', function () {
    it('should return a transition path with from null state', function () {
        transitionPath({name: 'a.b.c', params: {}, meta: {}}, null).should.eql({
            intersection: '',
            toActivate: ['a', 'a.b', 'a.b.c'],
            toDeactivate: []
        });
    });

    it('should return transition path between two states', function () {
        var meta = {
            params: {
                'a': {},
                'a.b': {},
                'a.b.c': {},
                'a.b.c.d': {}
            }
        };

        transitionPath(
            {name: 'a.b.c.d', params: {}, meta: meta},
            {name: 'a.b.e.f', params: {}, meta: meta}
        ).should.eql({
            intersection: 'a.b',
            toActivate: ['a.b.c', 'a.b.c.d'],
            toDeactivate: ['a.b.e.f', 'a.b.e']
        });
    });

    it('should return transition path two states with same name but different params', function () {
        var meta = {
            params: {
                'a': {},
                'a.b': {p1: 'url'},
                'a.b.c': {p2: 'url'},
                'a.b.c.d': {p3: 'url'}
            }
        };

        transitionPath(
            {name: 'a.b.c.d', params: {p1: 0, p2: 2, p3: 3}, meta: meta},
            {name: 'a.b.c.d', params: {p1: 1, p2: 2, p3: 3}, meta: meta}
        ).intersection.should.equal('a');

        transitionPath(
            {name: 'a.b.c.d', params: {p1: 1, p2: 0, p3: 3}, meta: meta},
            {name: 'a.b.c.d', params: {p1: 1, p2: 2, p3: 3}, meta: meta}
        ).intersection.should.equal('a.b');

        transitionPath(
            {name: 'a.b.c.d', params: {p1: 1, p2: 2, p3: 0}, meta: meta},
            {name: 'a.b.c.d', params: {p1: 1, p2: 2, p3: 3}, meta: meta}
        ).intersection.should.equal('a.b.c');
    });
});
