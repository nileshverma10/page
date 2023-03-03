_ = require 'underscore'

# match against multiple patterns, 
# not allowing for any overlap
exports.multimatch = (str, patterns...) ->
    matches = []

    i = -1
    while i++ < str.length
        for pattern in patterns
            match = pattern.exec str[i..]

            if match isnt null
                i += match[0].length - 1
                match.unshift pattern
                matches.push match
                break

    matches

exports.name = (match, groups) ->
    [pattern, match, values...] = match

    obj = _.object _.zip groups, values
    obj.pattern = pattern
    obj.match = match
    obj.index = match.index
    obj