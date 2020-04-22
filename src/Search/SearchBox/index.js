import React, { useState } from 'react'
import classnames from 'classnames'

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

  const submitButtonClassnames = classnames([
    'searchFormElement',
    'searchSubmit',
    fetching ? 'disabled' : ''
  ])
  return (
    <div className="searchBox">
      <form className="searchForm" onSubmit={onSubmitNoDefault(query)}>
        <input className="searchFormElement searchInput" type="text" onChange={onChange} value={query} />
        <button disabled={fetching} className={submitButtonClassnames} onClick={onSubmitNoDefault(query)}>Search</button>
      </form>
    </div>
  )
}

export {
  SearchBox
}
