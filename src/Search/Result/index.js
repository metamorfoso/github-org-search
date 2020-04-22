import React from 'react'

import { OrganizationList } from './OrganizationList'
import { OrganizationsLoading } from './OrganizationsLoading'

import './index.css'

const Result = ({ result }) => {
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
  const organizations = edges.map((edge) => edge.node)
  return (
    <div className="results">
      <div className="resultsMeta">
        Showing <span className="bold">{organizations.length}</span> of <span className="bold">{userCount}</span> results on Github.
       </div>
      <OrganizationList organizations={organizations} />
    </div>
  )

}

export {
  Result
}
