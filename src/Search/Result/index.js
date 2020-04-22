import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import * as R from 'ramda'

import { OrganizationList } from './OrganizationList'
import { OrganizationsLoading } from './OrganizationsLoading'
import { FilterResults } from './FilterResults'

import './index.css'

const filterBy = (key, value) => (org) => {
  if (!value || value.length < 1) {
    return true
  } else {
    return org[key] && R.includes(value.toLowerCase(), org[key].toLowerCase())
  }
}

const Result = ({ result }) => {
  const [showFilters, setShowFilters] = useState(false)
  const toggleShowFilters = () => setShowFilters(!showFilters)
  const [locationFilter, setLocationFilter] = useState('')
  const onLocationFilterChange = (event) => setLocationFilter(event.target.value)
  const [websiteFilter, setWebsiteFilter] = useState('')
  const onWebsiteFilterChange = (event) => setWebsiteFilter(event.target.value)
  const [debouncedLocation] = useDebounce(locationFilter, 250)
  const [debouncedWebsite] = useDebounce(websiteFilter, 250)

  const { data, fetching, error } = result

  if (!data && !fetching && !error) {
    return null
  }

  if (fetching) {
    return (
      <div className="results">
        <OrganizationsLoading />
      </div>
    )
  }

  const { userCount } = data.search

  const { edges } = data.search

  const organizations = R.compose(
    R.filter(filterBy('websiteUrl', debouncedWebsite)),
    R.filter(filterBy('location', debouncedLocation)),
    R.map((edge) => edge.node)
  )(edges)

  return (
    <div className="results">
      <div className="resultsMeta">
        Retrieved <span className="bold">{edges.length}</span> of <span className="bold">{userCount}</span> results on Github.
      </div>
      <button className="filterToggle" onClick={toggleShowFilters}>{showFilters ? "Cancel Filters" : "Filter This Set" }</button>
      {
        showFilters
          ? <FilterResults
              location={locationFilter}
              onLocationChange={onLocationFilterChange}
              website={websiteFilter}
              onWebsiteChange={onWebsiteFilterChange}
            />
          : null
       }
      <OrganizationList organizations={organizations} />
    </div>
  )
}

export {
  Result
}
