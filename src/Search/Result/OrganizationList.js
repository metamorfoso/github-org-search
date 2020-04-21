import React from 'react'

const Organization = ({ name }) => {
  return (
    <div>
      {name}
    </div>
  )
}

const OrganizationList = ({ organizations }) => {
  return (
    <ul>
      {organizations.map((org) => {
        return <li key={`org-${org.login}`}><Organization {...org} /></li>
      })}
    </ul>
  )
}

export {
  OrganizationList
}
