'use strict';

var path = require('path');
var yaml = require('./yaml');
var  ini = require('./ini');
var  xml = require('./xml');
var   fs = require('fs');
var util = require('./_util');

module.exports = function(filename, opts) {

  var file = util.resolveFile(filename);

  switch(file.ext) {

    case '.yml':
    case '.yaml':
      return yaml(file);

    case '.ini':
      return ini(file);

    case '.xml':
      return xml(file, opts);

    default:
      return require(file.name);

  }

};
