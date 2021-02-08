import React, { useCallback, useState } from 'react'
import { useFetch } from 'hook'
import CountUp from 'react-countup'
import styled, { css } from 'styled-components'
import { ReactComponent as UsdFlag } from 'img/usd.svg'
import { ReactComponent as EurFlag } from 'img/eur.svg'
import { ReactComponent as GbpFlag } from 'img/bgp.svg'

const Dashboard = () => {
  const { data, isLoading } = useFetch('currentprice.json')
  const [checked, setChecked] = useState('USD')

  const handleOnChange = useCallback((e) => {
    setChecked(e.target.value)
  }, [])

  const { EUR, USD, GBP } = data

  return (
    <Form>
      {USD && (
        <Wrapper>
          <Label selected={checked === 'EUR'}>
            <EurFlag />
            cotação atual
            <b>
              {' '}
              <CountUp
                end={EUR.rate_float}
                duration={1.0}
                separator=","
                decimals={4}
              />
            </b>
            <input
              type="checkbox"
              name="EUR"
              value="EUR"
              checked={checked === 'EUR'}
              onChange={handleOnChange}
            />
          </Label>

          <Label selected={checked === 'USD'}>
            <UsdFlag />
            cotação atual
            <b>
              {' '}
              <CountUp
                end={USD.rate_float}
                duration={1.0}
                separator=","
                decimals={4}
              />
            </b>
            <input
              type="checkbox"
              name="USD"
              value="USD"
              checked={checked === 'USD'}
              onChange={handleOnChange}
            />
          </Label>

          <Label selected={checked === 'GBP'}>
            <GbpFlag />
            cotação atual
            <b>
              {' '}
              <CountUp
                end={GBP.rate_float}
                duration={1.0}
                separator=","
                decimals={4}
              />
            </b>
            <input
              type="checkbox"
              name="GBP"
              value="GBP"
              checked={checked === 'GBP'}
              onChange={handleOnChange}
            />
          </Label>
        </Wrapper>
      )}
    </Form>
  )
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
const Form = styled.form`
  margin-bottom: 25px;
`

export default Dashboard
