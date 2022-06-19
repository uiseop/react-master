import styled from 'styled-components'

import Images from '../assets/images'
import useFadeIn from '../hooks/useFadeIn'
import FadeInInterface from '../types/FadeInInterface'

const AwardList = styled.ul<FadeInInterface>`
  display: flex;
  margin-bottom: 80px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.translateY ? '0' : '10px')});
  transition: all 700ms ease-in-out 200ms;
`

const Award = styled.li`
  position: relative;
  display: flex;
  & + & {
    margin-left: 42px;
  }
`

const Badge = styled.img`
  width: 52px;
  height: 52px;
`

const AwardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 5px;
  font-size: 12px;
`

const AwardTitle = styled.p``

const AwardDesc = styled.p``

function Awards() {
  const [opacity, translateY] = useFadeIn()

  return (
    <AwardList isVisible={opacity} translateY={translateY}>
      <Award>
        <Badge src={Images.google} alt="플레이스토어 수상 이미지" />
        <AwardWrapper>
          <AwardTitle>2018 구글 플레이스토어</AwardTitle>
          <AwardDesc>올해의 앱 최우수상 수상</AwardDesc>
        </AwardWrapper>
      </Award>
      <Award>
        <Badge src={Images.apple} alt="앱스토어 수상 이미지" />
        <AwardWrapper>
          <AwardTitle>2018 애플 앱스토어</AwardTitle>
          <AwardDesc>오늘의 여행앱 선정</AwardDesc>
        </AwardWrapper>
      </Award>
    </AwardList>
  )
}

export default Awards
