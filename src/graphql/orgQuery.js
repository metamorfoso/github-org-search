const orgQuery = `query orgSearch($searchQuery: String!) {
  search(
    query: $searchQuery
    type: USER,
    first: 100
  ) {
    userCount
    pageInfo {
      endCursor
      startCursor
    }
    edges {
      node {
        ... on Organization {
          login
          name
          avatarUrl
          description
          isVerified
          location
          url
          websiteUrl
        }
      }
    }

  }
}
`

export {
  orgQuery
}
