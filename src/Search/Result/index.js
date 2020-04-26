import React from 'react'
import * as R from 'ramda'

import { OrganizationList } from './OrganizationList'

import './index.css'

const filterBy = (key, value) => (org) => {
  if (!value || value.length < 1) {
    return true
  } else {
    return org[key] && R.includes(value.toLowerCase(), org[key].toLowerCase())
  }
}

const Result = ({ result, filters }) => {
  const { data, fetching, error } = result

  const { location, website } = filters

  if (!data && !fetching && !error) {
    return null
  }

  const { edges } = data.search

  const organizations = R.compose(
    R.filter(filterBy('websiteUrl', website)),
    R.filter(filterBy('location', location)),
    R.map((edge) => edge.node)
  )(edges)

  return (
    <div className="results">
      <OrganizationList organizations={organizations} />
    </div>
  )
}

export {
  Result
}
