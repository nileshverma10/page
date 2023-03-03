simplex = require '../src'
should = require 'should'

describe 'simple path expressions', ->
    it 'can select from multiple kinds of placeholders', ->
        placeholders = simplex.placeholders.get()
        placeholders.length.should.equal 5
        placeholders = simplex.placeholders.get 'ruby'
        placeholders.length.should.equal 2

    it 'can check whether a format has placeholders or not', ->
        some = new simplex.PathExp '/articles/:date/:article'
        none = new simplex.PathExp '/articles'

        some.placeholders.length.should.equal 2
        some.hasPlaceholders.should.equal yes
        none.placeholders.length.should.equal 0
        none.hasPlaceholders.should.equal no

    it 'can turn a simple path expression into a working regular expression', ->
        url = simplex.compile '/:year:Y/(articles/:article?)'
        groups = url.exec '/2014/'
        groups.slice(1).should.eql ['2014', undefined]
        groups = url.exec '/2014/articles/abc'
        groups.slice(1).should.eql ['2014', 'abc']
        groups = url.exec '/2014/articles/'
        (groups is null).should.be.true
        groups = url.exec '/2014/abc'
        (groups is null).should.be.true
    
        url = simplex.compile '/[year]/articles/<article>'
        groups = url.exec '/2014/articles/abc'
        groups.slice(1).should.eql ['2014', 'abc']
        groups = url.exec '/articles/abc'
        groups.slice(1).should.eql [undefined, 'abc']

        url = simplex.compile '/archive/<year>/[month:y]/[day:y]/<author>/index.html'
        groups = url.exec '/archive/2014/05/jones/index.html'
        groups.slice(1).should.eql ['2014', '05', undefined, 'jones']
        groups = url.exec '/archive/2014/jones/index.html'
        groups.slice(1).should.eql ['2014', undefined, undefined, 'jones']

    it 'can try to match a path to a path expression', ->
        match = simplex.match \
            '/archive/<year>/[month:y]/[day:y]/<author>/index.html', 
            '/archive/2014/05/jones/index.html'
        match.should.eql
            year: '2014'
            month: '05'
            day: undefined
            author: 'jones'

    it 'does not match more than it should', ->
        match = simplex.match \
            '<client>-<id>-<description>', 
            'acme-005-rocket-launcher'
        match.should.eql
            client: 'acme'
            id: '005'
            description: 'rocket-launcher'

        match = simplex.match \
            '<client:w>-<id>-<description>', 
            'acme-inc-005-rocket-launcher'
        match.should.eql
            client: 'acme'
            id: 'inc'
            description: '005-rocket-launcher'

        match = simplex.match \
            '<client:s>-<id:#>-<description>', 
            'acme-inc-5-rocket-launcher'
        match.should.eql
            client: 'acme-inc'
            id: '5'
            description: 'rocket-launcher'

        match = simplex.match \
            '<description>', 
            'acme-inc-005-rocket-launcher'
        match.should.eql
            description: 'acme-inc-005-rocket-launcher'

    it 'can fill in the placeholders in a path expression', ->
        pattern = '/[year]/articles/<article>'
        url = simplex.fill pattern, 
            year: 2014
            article: 'hello-world'
        url.should.eql '/2014/articles/hello-world'

    it 'can fill in placeholders, not requiring optional ones', ->
        pattern = '/[year]/articles/<article>'
        url = simplex.fill pattern, 
            article: 'hello-world'
        url.should.eql '/articles/hello-world'

    it 'can fill in placeholders, protesting when required ones are missing', ->       
        pattern = '/[year]/articles/<article>' 
        getUrl = -> simplex.fill pattern, 
            year: 2014
        getUrl.should.throw simplex.InterpolationError

    it 'can split up a path expression into a (non-interpolated) head and an (interpolated) tail', ->
        p = new simplex.PathExp 'content/<year>/video/<permalink>/'
        p.head.should.eql 'content'
        p.tail.should.eql '<year>/video/<permalink>/'

        p = new simplex.PathExp '/articles'
        p.head.should.eql '/articles'
        p.tail.should.eql ''

        p = new simplex.PathExp '<type>/archive'
        p.head.should.eql = ''
        p.tail.should.eql '<type>/archive'
        