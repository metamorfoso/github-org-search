import React from 'react'

const RenderOnlyWhenResult = ({ result, children }) => {
  if (result.error) {
    return (<div className="card">Something went wrong while searching Github...</div>)
  }

  if (!result.data || !result.data.search || !result.data.search.edges || !result.data.search.userCount) {
    return null
  }

  return children
}

export {
  RenderOnlyWhenResult
}
