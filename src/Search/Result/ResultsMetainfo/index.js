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

const ResultsMetainfo = ({ count, page }) => {
  const { start, end } = calcStartEnd(page, count)

  return (
    <div className="resultsMeta">
      <p className="resultsInfo">Set <span className="bold">{start}-{end}</span> of <span className="bold">{count}</span> total matches on GitHub.</p>
    </div>
  )
}

export {
  ResultsMetainfo
}
