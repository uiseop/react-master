import styled from 'styled-components'

import Images from '../assets/images'
import useFadeIn from '../hooks/useFadeIn'
import FadeInInterface from '../types/FadeInInterface'

const TripleLogoWrapper = styled.figure<FadeInInterface>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 398px;
  height: 336px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.translateY ? '0' : '10px')});
  transition: all 700ms ease-in-out;
`

const TrippleLogoImg = styled.img.attrs({
  src: `${Images.tripleLogo}`,
  alt: '트리플 로고 이미지',
})`
  width: 100%;
`

const ImageCaption = styled.figcaption`
  position: absolute;
  font-size: 13px;
  bottom: 42px;
  color: #3a3a3ab3;
`

function TripleLogo() {
  const [opacity, translateY] = useFadeIn()

  return (
    <TripleLogoWrapper isVisible={opacity} translateY={translateY}>
      <TrippleLogoImg />
      <ImageCaption>2021년 12월 기준</ImageCaption>
    </TripleLogoWrapper>
  )
}

export default TripleLogo
