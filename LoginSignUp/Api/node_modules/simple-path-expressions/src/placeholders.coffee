_ = require 'underscore'


exports.required = required = 
    unix: /^<(\w+)(\?)?(?::([\w#]))?>/
    ruby: /^:(\w+)(\?)?(?::([\w#]))?/
    python: /^\{(\w+)(\?)?(?::([\w#]))?\}/


exports.optional = optional = 
    unix: /^\[(\w+)(:([\w#]))?\]\/?/
    ruby: /^\(:(\w+)(:([\w#]))\)?\/?/


exports.get = (styles...) ->
    if not styles.length then styles = ['unix', 'ruby', 'python']

    _.flatten [
        _.values _.pick optional, styles...
        _.values _.pick required, styles...
    ]