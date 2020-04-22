import React from 'react'

import { Organization } from './Organization'

import './index.css'

const OrganizationList = ({ organizations }) => {
  return (
    <ul className="orgList">
      {organizations.map((org) => {
        return <li className="listItem" key={`org-${org.login}`}><Organization {...org} /></li>
      })}
    </ul>
  )
}

export {
  OrganizationList
}
