import React, { useState } from 'react'

import './index.css'

const SearchBox = ({ onSubmit, fetching }) => {
  const onSubmitNoDefault = (query) => (event) => {
    event.preventDefault()
    return onSubmit(query)
  }

  const [query, setQuery] = useState('')
  const onChange = (event) => {
    if (event.target.value.length < 240) {
      return setQuery(event.target.value)
    }
  }

  return (
    <div className="searchBox card spacious">
      <form className="searchForm" onSubmit={onSubmitNoDefault(query)}>
        <input className="searchFormElement searchInput" type="text" onChange={onChange} value={query} />
        <button disabled={fetching} className="searchFormElement searchSubmit" onClick={onSubmitNoDefault(query)}>Search</button>
      </form>
    </div>
  )
}

export {
  SearchBox
}
