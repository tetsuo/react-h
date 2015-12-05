var React = require('react')
var isArray = require('x-is-array')
var parseTag = require('./parse-tag')

var isValidElement = React.isValidElement
var dom = React.DOM

module.exports = function (name, properties, children) {
  var props

  if (!children && isChildren(properties)) {
    children = properties
    props = {}
  }

  props = props || properties || {}

  var tag = parseTag(name, props)
  var fn = dom[tag]
  if (typeof fn !== 'function') return

  var args = [props]
  if (children !== undefined && children !== null)
    args = args.concat(children)

  return fn.apply(null, args)
}

function isChildren(x) {
  return typeof x === 'string' || typeof x === 'number' || isArray(x) || isValidElement(x);
}
