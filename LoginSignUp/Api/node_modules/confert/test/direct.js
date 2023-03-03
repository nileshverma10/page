var should   = require('should');
var expected = require('./fixtures/test.json');

// Tests without indirect inclusion being loaded
//
// Test must be ran standalone like this:
//
// mocha test/direct.js
//
// otherwise it *is* loaded and we are not testing what we are trying to test.

describe('Confert', function() {

 describe('Standalone Direct inclusion', function() {

   describe('With an extension', function() {

     it('should load yaml', function() {
       require('../yaml')('./fixtures/yaml.yaml').should.eql(expected);
     });

     it('should load xml', function() {
       require('../xml')('./fixtures/xml.xml').should.eql(expected);
     });

     it('should load ini', function() {
       require('../ini')('./fixtures/ini.ini').should.eql(expected);
     });

   });

   describe('Without an extension', function() {

     it('should load yaml', function() {
       require('../yaml')('./fixtures/yaml').should.eql(expected);
     });

     it('should load xml', function() {
       require('../xml')('./fixtures/xml').should.eql(expected);
     });

     it('should load ini', function() {
       require('../ini')('./fixtures/ini').should.eql(expected);
     });

   });

 });


});
