import React from 'react'

import './index.css'

const calcStartEnd = (page) => {
  if (page === 1) return ({ start: 1, end: 100 })

  return {
    start: (page - 1) * 100 + 1,
    end: page * 100
  }
}

const ResultsMetainfo = ({ result, page, setPage }) => {
  const { userCount: count } = result.data.search

  const { start, end } = calcStartEnd(page)

  const incrementPage = (event) => {
    event.preventDefault()
    setPage(page + 1)
  }

  return (
    <div className="resultsMeta">
      <p>Showing set <span className="bold">{start} - {end}</span> of <span className="bold">{count}</span> results on Github.</p>
      <button onClick={incrementPage}>Request Next 100</button>
    </div>
  )
}

export {
  ResultsMetainfo
}
