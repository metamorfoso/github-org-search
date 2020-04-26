import React, { useState } from 'react'

import { OpenInNew } from '../../components/ExtrenalLink/OpenInNew'
import { OpenInNewIcon } from '../../components/ExtrenalLink/OpenInNewIcon'

import './index.css'

const githubAccessReviewUrl = `https://github.com/settings/connections/applications/${process.env.REACT_APP_CLIENT_ID}`

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
    <div className="searchBox">
      <div className="searchAlignmentWrapper">
        <form className="searchForm" onSubmit={onSubmitNoDefault(query)}>
          <input className="searchFormElement searchInput" type="text" onChange={onChange} value={query} />
          <button disabled={fetching} className="searchFormElement searchSubmit" onClick={onSubmitNoDefault(query)}>Search</button>
        </form>
        <div className="githubAccessReview">
          <OpenInNew url={githubAccessReviewUrl}>Review this app's privileges on Github<OpenInNewIcon /></OpenInNew>
        </div>
      </div>
    </div>
  )
}

export {
  SearchBox
}
