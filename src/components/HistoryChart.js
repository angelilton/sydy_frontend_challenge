import React, { useMemo, useEffect, useState } from 'react'
import moment from 'moment'
import { useFetch } from 'hook'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'

const ApiUrl = `historical/close.json`
const today = moment().format('YYYY-MM-DD')
const initialDateEnd = moment()
  .subtract(7, 'days')
  .calendar({ sameElse: 'YYYY-MM-DD' })

const HistoryChart = () => {
  const { data, fetchData } = useFetch(
    `${ApiUrl}?start=${initialDateEnd}&end=${today}`
  )
  const [dateStart, setDateStart] = useState(today)
  const [dateEnd, setDateEnd] = useState(initialDateEnd)

  useEffect(() => {
    if (dateEnd !== null) {
      fetchData(`${ApiUrl}?start=${dateEnd}&end=${dateStart}`)
    }
  }, [dateEnd])

  const newData = Object.keys(data).map((item) => {
    return {
      label: moment(item).format('DD/MM/YY'),
      rate: data[item]
    }
  })

  const chartData = useMemo(
    () => ({
      labels: newData.map(({ label }) => label),
      datasets: [
        {
          label: 'USD: ',
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 4,
          data: newData.map(({ rate }) => rate)
        }
      ]
    }),
    [newData]
  )

  return (
    <Wrapper>
      <InputGroup>
        <label>
          DE:{' '}
          <input
            value={dateStart}
            type="date"
            onChange={(e) => {
              setDateStart(event.target.value)
            }}
          />
        </label>

        <label>
          ATE:{' '}
          <input
            value={dateEnd}
            type="date"
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </label>
      </InputGroup>
      <Line
        data={chartData}
        options={{
          responsive: true,
          legend: { display: false }
        }}
      />
    </Wrapper>
  )
}

const InputGroup = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin: 12px 0;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 800px;
  margin: auto;
`

export default HistoryChart
