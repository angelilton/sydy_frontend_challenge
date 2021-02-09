import React from 'react'
import Dashboard from './components/Dashboard'
import HistoryChart from 'components/HistoryChart'
import styled from 'styled-components'

const App = () => (
  <Container>
    <Dashboard />
    <HistoryChart />
  </Container>
)

const Container = styled.section`
  margin-top: 25px;
`

export default App
