import React, { useMemo, useRef, useEffect, useState } from 'react'
import moment from 'moment'
import { useFetch } from 'hook'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'

const ApiUrl = `historical/close.json`
const today = new Date().toISOString().slice(0, 10)
const initialDateEnd = moment().subtract(7, 'days').calendar('yyyy-MM-dd')

const HistoryChart = () => {
  const { data, fetchData } = useFetch(ApiUrl)
  const [dateStart, setDateStart] = useState(today)
  const [dateEnd, setDateEnd] = useState(initialDateEnd)
  console.log(today, initialDateEnd)

  // useEffect(() => {
  //   if (dateEnd !== null) {
  //     console.log('change')
  //   }
  // }, [dateEnd])

  const newData = Object.keys(data).map((item) => {
    return {
      label: moment(item).format('DD/MM/YY'),
      rate: data[item]
    }
  })

  console.log(moment().subtract(7, 'days').calendar())

  const chartData = useMemo(
    () => ({
      labels: newData.slice(-7).map(({ label }) => label),
      datasets: [
        {
          label: 'USD: ',
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          data: newData.slice(-7).map(({ rate }) => rate)
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
            onChange={(event) => {
              setDateStart(event.target.value)
            }}
          />
        </label>

        <label>
          ATE:{' '}
          <input
            valeu={dateEnd}
            type="date"
            onChange={(event) => setDateEnd(event.target.value)}
          ></input>
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
  display: flex;
  justify-content: space-around;
  margin: 12px 0;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 250px;
  width: 500px;
  margin: auto;
`

export default HistoryChart
