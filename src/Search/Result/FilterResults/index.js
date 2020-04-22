import React, { useState } from 'react'

import './index.css'

const FilterResults = ({ onLocationChange, location, onWebsiteChange, website }) => {
  return (
    <div className="filters">
      <div className="filter">
        <label htmlFor="locationFilter">Location</label>
        <input name="locationFilter" type="text" value={location} onChange={onLocationChange} />
      </div>
      <div className="filter">
        <label htmlFor="websiteFilter">Website</label>
        <input name="websiteFilter" type="text" value={website} onChange={onWebsiteChange} />
      </div>
    </div>
  )
}

export {
  FilterResults
}
