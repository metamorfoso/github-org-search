import React, { useState } from 'react'
import * as R from 'ramda'
import { useQuery } from 'urql'

import { AccessReviewLink } from './AccessReviewLink'
import { Result } from './Result'
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
  const [resultsCount, setResultsCount] = useState(0)

  const onSearchSubmit = (query) => {
    setPage(1)
    setKnownCursors([])
    setGithubPageInfo({ endCursor: null })
    setResultsCount(0)

    return setSearchQuery(query)
  }

  /*
  Known cursors are saved after a page (aka set of results) is loaded.
  At the first page/set there would not be a cursor; for the second
  page/set the cursor would be saved at index 0.
  Hence index of target cursor is page number minus 2.
  */
  const afterCursor = knownCursors[targetPage - 2]

  const [result] = useQuery({
    query: orgQuery,
    variables: {
      searchQuery: `${searchQuery} type:org`,
      afterCursor
    },
    pause: !searchQuery
  })

  let maxPages = 1

  if (result.data && result.data.search && result.data.search.userCount && result.data.search.userCount !== resultsCount) {
    setResultsCount(result.data.search.userCount)
  }

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

  const pagination = {
    setPage,
    targetPage,
    maxPages
  }

  return (
    <div className="searchContainer">
      <div className="searchContent">
        <SearchBox onSubmit={onSearchSubmit} fetching={result.fetching} />
        <Result count={resultsCount} result={result} pagination={pagination} />
        <AccessReviewLink />
      </div>
    </div>
  )
}

export { Search }
