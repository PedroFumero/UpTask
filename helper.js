const vardump = (object) => {
  return JSON.stringify(object, null, 2)
}

module.exports = {
  vardump,
}
