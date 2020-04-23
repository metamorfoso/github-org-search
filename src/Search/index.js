import React, { useState } from 'react'
import { useQuery } from 'urql'
import { useDebounce } from 'use-debounce'

import { DontRenderIfNoResult } from '../components/DontRenderIfNoResult'
import { FilterInput } from './FilterInput'
import { Result } from './Result'
import { ResultsMetainfo } from './ResultsMetainfo'
import { SearchBox } from './SearchBox'

import { orgQuery } from '../graphql/orgQuery'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(undefined)

  const [filters, setFilters] = useState({
    location: '',
    website: ''
  })

  const [debouncedFilters] = useDebounce(filters, 250)

  const [result] = useQuery({
    query: orgQuery,
    variables: {
      searchQuery: `${searchQuery} type:org`
    },
    pause: !searchQuery
  })

  return (
    <div>
      <SearchBox onSubmit={setSearchQuery} fetching={result.fetching} />
      <DontRenderIfNoResult result={result}>
        <ResultsMetainfo result={result} />
        <FilterInput filters={filters} setFilters={setFilters} />
        <Result result={result} filters={debouncedFilters} />
      </DontRenderIfNoResult>
    </div>
  )
}

export { Search }
