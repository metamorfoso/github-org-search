import React, { useState } from 'react'
import * as R from 'ramda'
import { useDebounce } from 'use-debounce'

import { FilterInput } from './FilterInput'
import { OrganizationList } from './OrganizationList'
import { PaginationControls } from './PaginationControls'
import { RenderOnlyWhenResult } from './RenderOnlyWhenResult'
import { ResultsLoading } from './ResultsLoading'
import { ResultsMetainfo } from './ResultsMetainfo'

import './index.css'

const filterEdges = ({ website, location }) => R.compose(
  R.filter(filterBy('websiteUrl', website)),
  R.filter(filterBy('location', location)),
  R.map((edge) => edge.node)
)

const filterBy = (key, value) => (org) => {
  if (!value || value.length < 1) {
    return true
  } else {
    return org[key] && R.includes(value.toLowerCase(), org[key].toLowerCase())
  }
}

const Result = ({ result, pagination, count }) => {
  const [filters, setFilters] = useState({
    location: '',
    website: ''
  })
  const [debouncedFilters] = useDebounce(filters, 250)
  const { location, website } = debouncedFilters

  const { data, fetching, error } = result

  const { setPage, targetPage, maxPages } = pagination

  if (!data && !fetching && !error) {
    return null
  }

  let organizations = []

  if (data && data.search && data.search.edges) {
    organizations = filterEdges({ website, location })(data.search.edges)
  }

  return (
    <div className="results card">
      <ResultsMetainfo count={count} page={targetPage} />
      <PaginationControls fetching={fetching} page={targetPage} setPage={setPage} maxPages={maxPages} />
      <FilterInput filters={filters} setFilters={setFilters} />
      <ResultsLoading fetching={fetching} />
      <RenderOnlyWhenResult result={result}>
        <OrganizationList organizations={organizations} />
      </RenderOnlyWhenResult>
    </div>
  )
}

export {
  Result
}
