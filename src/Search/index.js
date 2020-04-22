import React, { useState } from 'react'
import { useQuery } from 'urql'

import { Result } from './Result'
import { SearchBox } from './SearchBox'

import { orgQuery } from '../graphql/orgQuery'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(undefined)
  const [result] = useQuery({
    query: orgQuery,
    variables: {
      searchQuery: `type:org ${searchQuery}`
    },
    pause: !searchQuery
  })

  return (
    <div>
      <SearchBox onSubmit={setSearchQuery} fetching={result.fetching} />
      <Result result={result} />
    </div>
  )
}

export { Search }
