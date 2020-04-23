import React from 'react'

import './index.css'

const calcStartEnd = (page) => {
  if (page === 1) return ({ start: 1, end: 100 })

  return {
    start: (page - 1) * 100 + 1,
    end: page * 100
  }
}

const ResultsMetainfo = ({ result, page, setPage, maxPages }) => {
  const { userCount: count } = result.data.search

  const { start, end } = calcStartEnd(page)

  const incrementPage = () => page === maxPages ? setPage(page) : setPage(page + 1)

  const decrementPage = () => page === 1 ? setPage(1) : setPage(page - 1)

  return (
    <div className="resultsMeta">
      <p>Showing set <span className="bold">{start} - {end}</span> of <span className="bold">{count}</span> results on Github.</p>
      { maxPages > 1 && <div className="paginationControls">
        <button disabled={page === 1} className="paginationButton" onClick={decrementPage}>Prev 100</button>
        <button disabled={page === maxPages} className="paginationButton" onClick={incrementPage}>Next 100</button>
      </div>}
    </div>
  )
}

export {
  ResultsMetainfo
}
