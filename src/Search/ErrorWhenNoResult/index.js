import React from 'react'

import './index.css'

const ErrorWhenNoResult = ({ result, children }) => {
  if (result.error) {
    return (<div className="error card">Something went wrong while searching Github...</div>)
  }

  if (!result.data || !result.data.search || !result.data.search.edges || !result.data.search.userCount) {
    return null
  }

  return children
}

export {
  ErrorWhenNoResult
}
