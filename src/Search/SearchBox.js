import React, { useState } from 'react'

const SearchBox = ({ onSubmit }) => {
  const onSubmitNoDefault = (query) => (event) => {
    event.preventDefault()
    return onSubmit(query)
  }

  const [query, setQuery] = useState('')
  const onChange = (event) => setQuery(event.target.value)

  return (
    <form onSubmit={onSubmitNoDefault(query)}>
      <input type="text" onChange={onChange} value={query} />
      <button onClick={onSubmitNoDefault(query)}>Search</button>
    </form>
  )
}

export {
  SearchBox
}
