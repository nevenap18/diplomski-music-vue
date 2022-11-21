import uaParser from 'ua-parser-js'

const mobileDetector = (function () {
  const ua = navigator.userAgent
  const parser = uaParser(ua)

  return {
    ua,
    deviceType: deviceType()
  }

  function deviceType () {
    if (parser.device) {
      return parser.device.type
    }
    return ''
  }
}())

export default mobileDetector
