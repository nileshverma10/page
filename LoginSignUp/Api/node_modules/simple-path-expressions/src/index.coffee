_ = require 'underscore'
exports.formats = require './formats'
exports.placeholders = require './placeholders'
{InterpolationError, PathExp} = require './compiler'


exports.InterpolationError = InterpolationError

exports.PathExp = PathExp

exports.compile = (pattern, styles...) ->
    px = new PathExp pattern, styles...
    px.toRegExp()

exports.match = (pattern, str, styles...) ->
    px = new PathExp pattern, styles...
    px.match str

exports.fill = (pattern, map, styles...) ->
    px = new PathExp pattern, styles...
    px.fill map