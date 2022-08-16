const mediaQuery = (maxWidth) => `
  @media (max-width: ${maxWidth}px)
`

const media = {
  xxxlarge: mediaQuery(2200),
  xxlarge: mediaQuery(1920), //데스크톱
  xlarge: mediaQuery(1640),
  large: mediaQuery(1200),
  medium: mediaQuery(1084), //노트북
  small: mediaQuery(768), //테블릿
  xsmall: mediaQuery(500), //모바일
  custom: mediaQuery,
}

export default media
