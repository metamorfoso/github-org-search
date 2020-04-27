import React from 'react'

import './index.css'

const PaginationControls = ({ fetching, page, setPage, maxPages }) => {
  if (maxPages < 2) {
    return null
  }

  const incrementPage = () => page === maxPages ? setPage(page) : setPage(page + 1)

  const decrementPage = () => page === 1 ? setPage(1) : setPage(page - 1)

  return (
    <div className="paginationControls">
      <div className="controls">
        <button disabled={fetching || page === 1} className="paginationButton" onClick={decrementPage}>Prev 100</button>
        <button disabled={fetching || page === maxPages} className="paginationButton" onClick={incrementPage}>Next 100</button>
      </div>
    </div>
  )
}

export {
  PaginationControls
}
