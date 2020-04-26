import React, { useState } from 'react'
import * as R from 'ramda'
import { useQuery } from 'urql'
import { useDebounce } from 'use-debounce'

import { ErrorWhenNoResult } from './ErrorWhenNoResult'
import { FilterInput } from './FilterInput'
import { Result } from './Result'
import { ResultsLoading } from './ResultsLoading'
import { ResultsMetainfo } from './ResultsMetainfo'
import { SearchBox } from './SearchBox'

import { orgQuery } from '../graphql/orgQuery'

import './index.css'

const notEqual = R.compose(
  R.not,
  R.equals
)

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(undefined)
  const [githubPageInfo, setGithubPageInfo] = useState({
    endCursor: null
  })
  const [targetPage, setPage] = useState(1)
  const [knownCursors, setKnownCursors] = useState([])

  const onSearchSubmit = (query) => {
    setPage(1)
    setKnownCursors([])
    setGithubPageInfo({ endCursor: null })

    return setSearchQuery(query)
  }

  /*
  Known cursors are saved after a page (aka set of results) is loaded.
  The cursor for the first page/set would not be saved, while the
  cursor for the second page/set would be saved at index 0.
  Hence index is analogous to page number minus 2.
  */
  const afterCursor = knownCursors[targetPage - 2]

  const [filters, setFilters] = useState({
    location: '',
    website: ''
  })

  const [debouncedFilters] = useDebounce(filters, 250)

  const [result] = useQuery({
    query: orgQuery,
    variables: {
      searchQuery: `${searchQuery} type:org`,
      afterCursor
    },
    pause: !searchQuery
  })

  let maxPages = 1

  if (result.data && result.data.search && result.data.search.pageInfo) {
    if (notEqual(result.data.search.pageInfo, githubPageInfo)) {
      setGithubPageInfo({
        ...githubPageInfo,
        ...result.data.search.pageInfo
      })
    }

    maxPages = Math.ceil(result.data.search.userCount / 100)

    // populate known cursors when first requesting new sets
    if (targetPage <= maxPages && targetPage - 1 > knownCursors.length) {
      setKnownCursors([...knownCursors, githubPageInfo.endCursor])
    }
  }

  return (
    <div className="searchContainer">
      <div className="searchContent">
        <SearchBox onSubmit={onSearchSubmit} fetching={result.fetching} />
        <ResultsLoading fetching={result.fetching} />
        <ErrorWhenNoResult result={result}>
          <ResultsMetainfo result={result} setPage={setPage} page={targetPage} maxPages={maxPages} />
          <FilterInput filters={filters} setFilters={setFilters} />
          <Result result={result} filters={debouncedFilters} />
        </ErrorWhenNoResult>
      </div>
    </div>
  )
}

export { Search }
