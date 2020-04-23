const orgQuery = `query orgSearch($searchQuery: String! $afterCursor: String) {
  search(
    query: $searchQuery
    type: USER,
    first: 100,
    after: $afterCursor
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
