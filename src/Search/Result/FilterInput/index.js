import React, { useState } from 'react'
import classnames from 'classnames'

import './index.css'

const FilterInput = ({ filters, setFilters }) => {

  const [showFilterInput, setShowFilterInput] = useState(false)
  const toggleShowFilterInput = () => setShowFilterInput(!showFilterInput)

  const onLocationChange = (event) => setFilters({
    ...filters,
    location: event.target.value
  })
  const onWebsiteChange = (event) => setFilters({
    ...filters,
    website: event.target.value
  })

  const clearFilters = () => setFilters({
    location: '',
    website: ''
  })

  return (
    <div className="filtering">
      <button className="filterButton filterToggle" onClick={toggleShowFilterInput}>{showFilterInput ? "Hide Filters" : "Filter This Set"}</button>
      <div className={showFilterInput ? "filters" : "hide"}>
        <div className="filter">
          <label className="filterLabel" htmlFor="locationFilter">Location</label>
          <input className="filterInput" name="locationFilter" type="text" value={filters.location} onChange={onLocationChange} />
        </div>
        <div className="filter">
          <label className="filterLabel" htmlFor="websiteFilter">Website</label>
          <input className="filterInput" name="websiteFilter" type="text" value={filters.website} onChange={onWebsiteChange} />
        </div>
      </div>
      <button className={classnames(['filterButton', 'clearFilters', !showFilterInput ? 'hide' : ''])} onClick={clearFilters}>Clear Filters</button>
    </div>
  )
}

export {
  FilterInput
}
