import React, { useState } from 'react'

import './index.css'

const FilterResults = ({ onLocationChange, location, onWebsiteChange, website }) => {
  return (
    <div className="filters">
      <div className="filter">
        <label className="filterLabel" htmlFor="locationFilter">Location</label>
        <input className="filterInput" name="locationFilter" type="text" value={location} onChange={onLocationChange} />
      </div>
      <div className="filter">
        <label className="filterLabel" htmlFor="websiteFilter">Website</label>
        <input className="filterInput" name="websiteFilter" type="text" value={website} onChange={onWebsiteChange} />
      </div>
    </div>
  )
}

export {
  FilterResults
}
