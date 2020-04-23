import React from 'react'

import './index.css'

const ResultsMetainfo = ({ result }) => {
  const { userCount, edges } = result.data.search

  return (
    <div className="resultsMeta">
      Retrieved <span className="bold">{edges.length}</span> of <span className="bold">{userCount}</span> results on Github.
    </div>
  )
}

export {
  ResultsMetainfo
}
