// slightly modified from
// https://github.com/Matt-Esch/virtual-dom/blob/5313e2a17dc396e9b1ee79fcd68fd7653acdc71a/virtual-hyperscript/parse-tag.js

var split = require('browser-split')

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/
var notClassId = /^\.|#/

module.exports = function (tag, props) {
  if (!tag) return 'div'

  var noId = !(props.hasOwnProperty('id'))

  var tagParts = split(tag, classIdSplit)
  var tagName = null

  if (notClassId.test(tagParts[1]))
    tagName = 'div'

  var classes, part, type, i

  for (i = 0; i < tagParts.length; i++) {
    part = tagParts[i]

    if (!part)
      continue

    type = part.charAt(0)

    if (!tagName) {
      tagName = part
    } else if (type === '.') {
      classes = classes || []
      classes.push(part.substring(1, part.length))
    } else if (type === '#' && noId) {
      props.id = part.substring(1, part.length)
    }
  }

  if (classes) {
    if (props.className)
      classes.push(props.className)
    props.className = classes.join(' ')
  }

  return tagName
}
