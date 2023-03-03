'use strict';

var fs   = require('fs');
var ini  = require('ini');
var util = require('./_util');

module.exports = function(file) {
  if(typeof file === 'string') {
    file = util.resolveFile(file);
  }
  return ini.parse(
    fs.readFileSync(file.name, 'utf8')
  );
};
