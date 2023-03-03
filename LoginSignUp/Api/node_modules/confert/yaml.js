'use strict';

var fs   = require('fs');
var yaml = require('js-yaml');
var util = require('./_util');

module.exports = function(file, resolved) {
  if(typeof file === 'string') {
    file = util.resolveFile(file);
  }
  return yaml.load( fs.readFileSync(file.name, 'utf8') );
};
