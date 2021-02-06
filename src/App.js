import React, { useCallback, useState } from 'react'
import useFetch from './hook/useFetch'
import styled, { css } from 'styled-components'
import { ReactComponent as UsdFlag } from './img/usd.svg'
import { ReactComponent as EurFlag } from './img/eur.svg'
import { ReactComponent as GbpFlag } from './img/bgp.svg'

// import './styles.css'

const App = () => {
  const { data } = useFetch('currentprice.json')
  const [checked, setChecked] = useState('USD')

  const handleOnChange = useCallback((e) => {
    setChecked(e.target.value)
  }, [])

  console.log(data)
  return <h1>teste</h1>

  // return (
  //   <form>
  //     <Wrapper>
  //       <Label selected={checked === 'EUR'}>
  //         <EurFlag />
  //         cotação atual:
  //         <b>{data[0]}</b>
  //         <input
  //           type="checkbox"
  //           name="EUR"
  //           value="EUR"
  //           checked={checked === 'EUR'}
  //           onChange={handleOnChange}
  //         />
  //       </Label>

  //       <Label selected={checked === 'USD'}>
  //         <UsdFlag />
  //         cotação atual:
  //         <b>{data[1]}</b>
  //         <input
  //           type="checkbox"
  //           name="USD"
  //           value="USD"
  //           checked={checked === 'USD'}
  //           onChange={handleOnChange}
  //         />
  //       </Label>

  //       <Label selected={checked === 'GBP'}>
  //         <GbpFlag />
  //         cotação atual:
  //         <b>{data[2]}</b>
  //         <input
  //           type="checkbox"
  //           name="GBP"
  //           value="GBP"
  //           checked={checked === 'GBP'}
  //           onChange={handleOnChange}
  //         />
  //       </Label>
  //     </Wrapper>
  //   </form>
  // )
}

const Label = styled.label`
  ${({ selected }) => css`
    border: 1px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-width: 155px;
    margin: 4px;
    cursor: pointer;
    ${!!selected && { background: '#4BD295' }}
  `}

  & > input {
    opacity: 0;
  }
`

const Wrapper = styled.div`
  display: flex;
  height: 150px;
  width: 500px;
  margin: auto;
`

export default App
