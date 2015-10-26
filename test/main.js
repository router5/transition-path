require('should');
require('mocha');
var transitionPath = require('../dist/commonjs');

describe('router5.transition-path', function () {
    it('should return a transition path with from null state', function () {
        transitionPath({name: 'a.b.c', params: {}}, null).should.eql({
            intersection: '',
            toActivate: ['a', 'a.b', 'a.b.c'],
            toDeactivate: []
        });
    });

    it('should return transition path between two states', function () {
        transitionPath(
            {name: 'a.b.c.d', params: {}},
            {name: 'a.b.e.f', params: {}}
        ).should.eql({
            intersection: 'a.b',
            toActivate: ['a.b.c', 'a.b.c.d'],
            toDeactivate: ['a.b.e.f', 'a.b.e']
        });
    });

    it('should return transition path two states with same name but different params', function () {
        transitionPath(
            {name: 'a.b', params: {id: 2}},
            {name: 'a.b', params: {id: 1}}
        ).should.eql({
            intersection: 'a',
            toActivate: ['a.b'],
            toDeactivate: ['a.b']
        });
    });
});
