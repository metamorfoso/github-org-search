import React, { useState } from 'react'
import * as R from 'ramda'
import { useQuery } from 'urql'
import { useDebounce } from 'use-debounce'

import { DontRenderIfNoResult } from '../components/DontRenderIfNoResult'
import { FilterInput } from './FilterInput'
import { Result } from './Result'
import { ResultsMetainfo } from './ResultsMetainfo'
import { SearchBox } from './SearchBox'

import { orgQuery } from '../graphql/orgQuery'

const notEqual = R.compose(
  R.not,
  R.equals
)

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(undefined)
  const [githubPageInfo, setGithubPageInfo] = useState({
    startCursor: null,
    endCursor: null
  })
  const [page, setPage] = useState(1)
  const [knownCursors, setKnownCursors] = useState([])
  const [targetCursor, setTargetCursor] = useState(undefined)

  const [filters, setFilters] = useState({
    location: '',
    website: ''
  })

  const [debouncedFilters] = useDebounce(filters, 250)

  const [result] = useQuery({
    query: orgQuery,
    variables: {
      searchQuery: `${searchQuery} type:org`,
      afterCursor: targetCursor
    },
    pause: !searchQuery
  })

  if (result.data && result.data.search && result.data.search.pageInfo) {
    if (notEqual(result.data.search.pageInfo, githubPageInfo)) {
      setGithubPageInfo({
        ...githubPageInfo,
        ...result.data.search.pageInfo
      })
    }

    const pagesPossible = Math.ceil(result.data.search.userCount / 100)

    if (page <= pagesPossible && page > (knownCursors.length + 1)) {
      setKnownCursors([...knownCursors, githubPageInfo.endCursor])
      setTargetCursor(githubPageInfo.endCursor)
    }
  }

  return (
    <div>
      <SearchBox onSubmit={setSearchQuery} fetching={result.fetching} />
      <DontRenderIfNoResult result={result}>
        <ResultsMetainfo result={result} setPage={setPage} page={page} />
        <FilterInput filters={filters} setFilters={setFilters} />
      </DontRenderIfNoResult>
      <Result result={result} filters={debouncedFilters} />
    </div>
  )
}

export { Search }
