# Simple Path Expressions

[![Build Status](https://travis-ci.org/stdbrouw/simple-path-expressions.svg)](https://travis-ci.org/stdbrouw/simple-path-expressions)

Simple Path Expressions are a dumbed-down but easier-to-use kind of regular expressions for matching and filling paths and urls. For example, `/articles/<year:Y>/<month>/<day>` becomes the regular expression `/^/articles/(\d{4})/([^/]+)/([^/]+)$/`.

## Features

* **Flexible syntax:** Simple Path Expressions come in your flavor, too. There's `<unix>`, `{python}` and `:ruby`-style interpolation, and `[unix]` or `(:ruby)` as well as `<unix?>`, `{python?}` and `:ruby?` for optional segments. We'll use UNIX-style throughout the documentation.
* **Named groups:** simple path expressions returns named groups as objects rather than arrays, making matches easier to work with.
* **Shortcuts to common patterns:** specify that a certain URL or path segments needs to be a year or a month or a UUID or a number or a string.
* **Object-oriented or functional:** two interfaces to the same functionality. Your pick.

## Usage

Translate a simple path expression into a regular expression: 

```javascript
var simplex = require('simple-path-expressions');
var route = '/articles/<year>/<month>/<day>';
var regexp = simplex.compile(route);
var groups = regexp.exec '/articles/2014/09/01'
// [ '/articles/2014/09/01', '2014', '09', '01' ]
console.log(groups);
```

Match a path against an expression: 

```javascript
var url = '/articles/2014/05/04';
var route = '/articles/<year>/<month>/<day>';
var match = simplex.match(route, url);
// { year: '2014', month: '05', day: '05'}
console.log(match);
```

Similarly to regular expressions, if the string doesn't match the pattern, the resulting match will be `null`.

```javascript
var route = '/archive/<year:Y>/index.html';
var path = '/archive/90s/index.html';
var match = simplex.match(route, path);
assert match == null;
```

Optional segments are possible too. They're specified using `[segment]` or `(:segment)` or by adding a question mark after a segment, e.g. `<segment?>`, `:segment?` or `{segment?}`.

```javascript
var route = '/archive/<year>/[month:y]/[day:y]/index.html';
var path = '/archive/2014/index.html';
var match = simplex.match(route, path);
assert match.year == '2014';
assert match.month == undefined;
assert match.day == undefined;
```

Build a path from an expression: 

```javascript
    var route = '/articles/<year>/<month>/<day>';
    var url = simplex.fill(route, {
        year: 1988, 
        month: '05', 
        day: '04'
    });
    // '/articles/1988/05/04'
    console.log(url);
```

You can also use a more object-oriented interface with the `PathExp` object. I actually like it more.

```javascript
var pattern = '/articles/<year>/<month>/<day>';
var instance = '/articles/2014/05/04';
var path = new simplex.PathExp(pattern);
assert path.match(instance) == simplex.match(pattern, instance);
```

## Formats

Generally, a placeholder will match anything that isn't a slash. However, it is possible to be more specific by adding a format. Just tack a colon to the placeholder name, followed by the required format. E.g. `:title:s` or `{year:Y}` depending on your interpolation style.

The available formats are: 

Format | RegExp              | Description
------ | ------------------- | -----------
**Y**  | `\d{4}`             | year, including century
**y**  | `\d{2}`             | year, not including century
**M**  | [see code][formats] | month, abbreviated
**m**  | [see code][formats] | month, 1 or 2 digits
**d**  | [see code][formats] | day, 1 or 2 digits
**#**  | `\d+`               | number, any length
**w**  | `\w+`               | word
**s**  | `[\w-]+`            | slug
**u**  | [see code][formats] | uuid
**\*** | `[^/]+?`            | the default, which matches anything

[formats]: https://github.com/stdbrouw/simple-path-expressions/blob/master/src/formats.coffee

## Interpolation styles

By default, you can use UNIX, Python and Ruby-style placeholders for interpolation. You can be more picky by specifying with style or styles to allow:

```javascript
// all styles
var template = new simplex.PathExp('/posts/<author>/:title');
assert template.fill({author: 'me', title: 'first-post'}) == '/posts/me/first-post';
// just ruby
var template = new simplex.PathExp('/posts/<author>/:title', 'ruby');
assert template.fill({author: 'me', title: 'first-post'}) == '/posts/<author>/first-post';
```

This works for all simple path expression functionality: 

```javascript
var regexp = simplex.compile(pattern, 'ruby');
var match = simplex.match(pattern, string, 'python', 'unix');
var path = simplex.fill(pattern, obj, 'unix');
var pathTemplate = new simplex.PathExp(pattern, 'ruby');
```

## Learn more

Take a look at the [test suite](https://github.com/stdbrouw/simple-path-expressions/tree/master/test/index.coffee) for more example code.

Simple path expressions are inspired by [Cody Soyland](http://codysoyland.com/)'s [Surlex](https://github.com/codysoyland/surlex) library for Python. Surlex is "a language for URL matching and extraction."

## Missing features

This is a list of features I'd like to implement at some point in the future, though there's no clear roadmap detailing if and when they might land.

### Traversal

We don't always have full control over the structure of the objects we use to fill in a path expression. When dealing with nested objects, traversal using dot notation could be quite useful: 

```javascript
var template = new PathExp('/posts/<post.author>/<post.metadata.title>');
assert template.fill({
    post: {
        author: 'me', 
        metadata: {
            title: 'first-post'
        }
    }
}) == '/posts/me/first-post';
```

### Filters

One interesting feature we might implement at some point would be filters.

```javascript
var simplex = require('simple-path-expressions');
var pattern = '/articles/{month|lowercase}/{title|slugify}/';
var template = new simplex.PathExp(pattern);
var path = template.fill({month: 'January', 'title': 'Hello world!'});
assert path == '/articles/january/hello-world/';
```

The concept is pretty similar to [how filters work in Jinja](http://jinja.pocoo.org/docs/dev/templates/#filters) or [how they work in Liquid templates](http://docs.shopify.com/themes/liquid-documentation/filters): when you do `expression.fill` it will first process the variable `month` with a `lowercase` function before filling it in.

*Formats* determine what input to a path expression should look like to make a match. *Filters* determine how to then post-process that match, or how to pre-process data before using it to fill in a template.

An example of using filters to post-process a match: 

```javascript    
var simplex = require('simple-path-expressions');
// no filter
var match = simplex.match('/articles/{year:Y}', '/articles/1996');
assert match == '1996';
assert typeof match == 'string';
// integer filter
var match = simplex.match('/articles/{year:Y|integer}', '/articles/1996');
assert match == 1996;  
assert typeof match == 'number';
```

Filters wouldn't be be a killer feature for a router, but they might be for command-line applications, e.g. as the basis for a more user-friendly version of the linux `rename` utility.
