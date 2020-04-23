const DontRenderIfNoResult = ({ result, children }) => {
  if (!result.data || !result.data.search || !result.data.search.edges || !result.data.search.userCount) {
    return null
  }

  return children
}

export {
  DontRenderIfNoResult
}
