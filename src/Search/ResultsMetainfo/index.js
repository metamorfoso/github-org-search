import React from 'react'

import './index.css'

const calcStartEnd = (page, count) => {
  if (page === 1) {
    return {
      start: 1,
      end: count < 100 ? count : 100
    }
  }

  return {
    start: (page - 1) * 100 + 1,
    end: page * 100
  }
}

const ResultsMetainfo = ({ result, page, setPage, maxPages }) => {
  const { userCount: count } = result.data.search

  const { start, end } = calcStartEnd(page, count)

  const incrementPage = () => page === maxPages ? setPage(page) : setPage(page + 1)

  const decrementPage = () => page === 1 ? setPage(1) : setPage(page - 1)

  return (
    <div className="resultsMeta">
      <p className="resultsInfo">Set <span className="bold">{start}-{end}</span> of <span className="bold">{count}</span> total matches on GitHub.</p>
      { maxPages > 1 && <div className="paginationControls">
        <button disabled={result.fetching || page === 1} className="paginationButton" onClick={decrementPage}>Prev 100</button>
        <button disabled={result.fetching || page === maxPages} className="paginationButton" onClick={incrementPage}>Next 100</button>
      </div>}
    </div>
  )
}

export {
  ResultsMetainfo
}
