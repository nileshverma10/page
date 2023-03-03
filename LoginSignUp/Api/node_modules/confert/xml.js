'use strict';

var fs   = require('fs');
var util = require('./_util');

module.exports = function(file, opts) {

  var xml;

  try {
    xml = require('xml2json');
  } catch(err) {
    console.log(
      'Run `npm install xml2json` to enable xml support'
    );
    return;
  }

  if(typeof file === 'string') {
    file = util.resolveFile(file);
  }

  var ret;
  opts = opts || {};
  opts.object = true;
  ret = xml.toJson( fs.readFileSync( file.name ), opts );

  return ret[Object.keys(ret)[0]];

};
