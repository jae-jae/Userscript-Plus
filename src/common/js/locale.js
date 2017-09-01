const langContext = require.context('../lang/', false, /\.js$/)

let message = {}

let getName = (path) => {
  return path.match(/([^/]+)\.js$/)[1]
}

langContext.keys().map((lang) => {
  let name = getName(lang)
  message[name] = require('../lang/' + name).default
})

export default message
