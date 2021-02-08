import React, { useCallback, useState } from 'react'
import { useFetch } from 'hook'
import styled, { css } from 'styled-components'

const HistoryChart = () => {
  const { data } = useFetch('historical/close.json')

  const newData = Object.keys(data).map((date) => ({
    x: date.toString(),
    y: data[date]
  }))

  console.log(newData.map(({ x }) => x))

  return <h1>graph</h1>
}

export default HistoryChart
