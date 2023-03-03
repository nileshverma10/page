'use strict';

var path = require('path');
var   fs = require('fs');

var extensions = ['.yml', '.yaml', '.ini', '.xml', '.json', '.js'];

function resolve(filename) {
  var dirname;
  var isWindows;
  var indexjsPattern;

  isWindows = /^win/.test(process.platform);
  if (isWindows) {
    indexjsPattern = /confert\\index.js$/;
  } else {
    indexjsPattern = /confert\/index.js$/;
  }

  if(indexjsPattern.test(module.parent.parent.filename)) {
    dirname = module.parent.parent.parent.filename;
  } else {
    dirname = module.parent.parent.filename;
  }
  return path.resolve(
    path.dirname(dirname),
    filename
  );
}

function findFile(filename) {
  var file;
  extensions.every(function(x) {
    var f = resolve(filename + x);
    if(fs.existsSync(f)) {
      file = f;
      return false;
    }
    return true;
  });

  if(!file) {
    throw Error('Unable to resolve file: ' + filename);
  }

  return file;
}


function resolveFile(filename) {
  var file;
  var ext = path.extname(filename);

  if(ext && extensions.indexOf(ext) >= 0) {
    file = resolve(filename);
  } else {
    file = findFile(filename);
    ext = path.extname(file);
  }

  return {
    name: file,
    ext: ext
  };
}

module.exports = {
  resolve: resolve,
  findFile: findFile,
  resolveFile: resolveFile
};
