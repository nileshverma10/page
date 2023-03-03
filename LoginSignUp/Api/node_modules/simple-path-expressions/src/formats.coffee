# courtesy of Code Soyland's Surlex library for Python
module.exports =
    # year, including century
    'Y': '\\d{4}'
    # year, not including century
    'y': '\\d{2}'
    # month, abbreviated
    'M': 'jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec'
    # month, 1 or 2 digit
    'm': '0?(?:[1-9])|10|11|12'
    # day, 1 or 2 digit
    'd': '(?:0|1|2)?(?:[1-9])|[1-3]0|31'
    # number, any length
    '#': '\\d+'
    # word
    'w': '\\w+'
    # slug
    's': '[\\w-]+'
    # uuid
    'u': '[a-fA-F0-9]{8}-?[a-fA-F0-9]{4}-?[a-fA-F0-9]{4}-?[a-fA-F0-9]{4}-?[a-fA-F0-9]{12}'
    # anything
    '*': '[^/]+?'