import React from 'react'

import { OrganizationList } from './OrganizationList'

const Result = ({ result }) => {
  const { data, fetching, error } = result

  if (!data && !fetching && !error) {
    return null
  }

  if (fetching) {
    return (<div>Loading...</div>)
  }

  const { edges } = data.search
  const organizations = edges.map((edge) => edge.node)
  return <OrganizationList organizations={organizations} />

}

export {
  Result
}
