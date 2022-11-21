export const generateGradient = () => {
  const hexValues = ['7','7','7','7','7','6','6','6','6','6','a','b','c','d','e']

  function populate(a) {
    for ( let i = 0; i < 6; i++ ) {
      const x = Math.round( Math.random() * 14 )
      const y = hexValues[x]
      a += y
    }
    return a
  }

  const newColor1 = populate('#')
  const newColor2 = populate('#')
  const angle = Math.round( Math.random() * 360 )

  return 'linear-gradient(' + angle + 'deg, ' + newColor1 + ', ' + newColor2 + ')'
}
