const langContext = require.context('../lang/', false, /\.js$/)

let message = {}

let getName = (path) => {
  let name = path.match(/([^/]+)\.js$/)[1]
  return name
}

langContext.keys().map((lang) => {
  let name = getName(lang)
  message[name.toLowerCase()] = require('../lang/' + name).default
})

export default message
