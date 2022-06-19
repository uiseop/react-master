import styled from 'styled-components'

import useFadeIn from '../hooks/useFadeIn'
import useCountUp from '../hooks/useCountUp'
import FadeInInterface from '../types/FadeInInterface'

const DescNumberList = styled.ul<FadeInInterface>`
  margin-bottom: 50px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.translateY ? '0' : '10px')});
  transition: all 700ms ease-in-out 100ms;

  strong {
    font-weight: 700;
  }

  &::after {
    content: '';
    display: block;
  }
`

const DescNumber = styled.li`
  font-size: 31px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

function Descs() {
  const [opacity, translateY] = useFadeIn()
  const userCount = useCountUp(700)
  const reviewCount = useCountUp(100)
  const storeCount = useCountUp(470)

  return (
    <DescNumberList isVisible={opacity} translateY={translateY}>
      <DescNumber>
        <strong>{userCount}만 명</strong>의 여행자
      </DescNumber>
      <DescNumber>
        <strong>{reviewCount}만 개</strong>의 여행 리뷰
      </DescNumber>
      <DescNumber>
        <strong>{storeCount}만 개</strong>의 여행 일정
      </DescNumber>
    </DescNumberList>
  )
}

export default Descs
