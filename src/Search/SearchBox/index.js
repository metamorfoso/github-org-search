import React, { useState } from 'react'

import './index.css'

const SearchBox = ({ onSubmit }) => {
  const onSubmitNoDefault = (query) => (event) => {
    event.preventDefault()
    return onSubmit(query)
  }

  const [query, setQuery] = useState('')
  const onChange = (event) => setQuery(event.target.value)

  return (
    <div className="searchBox">
      <form className="searchForm" onSubmit={onSubmitNoDefault(query)}>
        <input className="searchFormElement searchInput" type="text" onChange={onChange} value={query} />
        <button className="searchFormElement searchSubmit" onClick={onSubmitNoDefault(query)}>Search</button>
      </form>
    </div>
  )
}

export {
  SearchBox
}
