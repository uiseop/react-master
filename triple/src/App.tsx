import styled from 'styled-components'

import GlobalStyle from './styles/GlobalStyle'
import TripleLogo from './components/TripleLogo'
import Descs from './components/Descs'
import Awards from './components/Awards'

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  min-width: 1200px;
  justify-content: center;
  align-items: center;
`

const DescWrapper = styled.div`
  margin-left: 220px;
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <TripleLogo />
        <DescWrapper>
          <Descs />
          <Awards />
        </DescWrapper>
      </Wrapper>
    </>
  )
}

export default App
