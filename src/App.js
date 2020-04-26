import React from 'react';
import * as R from 'ramda'
import { createClient, Provider } from 'urql'
import './App.css';

import { AuthenticateOnGH } from './AuthenticateOnGH'
import { Search } from './Search'

const tokenFromQuerystring = R.compose(
  R.last,
  R.split('='),
  R.last,
  R.takeWhile((value) => {
    return value.includes('access_token=')
  }),
  R.split('&'),
  R.last,
  R.split('?')
)

function App() {
  let token = window.localStorage.getItem('github-org-search_API_token')

  if ((!token || token.length === 0) && window.location.search.length > 0) {
    token = tokenFromQuerystring(window.location.search)
    window.localStorage.setItem('github-org-search_API_token', token)
    window.history.replaceState({}, document.title, '/')
  }

  let client

  if (token && token.length > 0) {
    client = createClient({
      url: 'https://api.github.com/graphql',
      fetchOptions: () => {
        return {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      }
    })

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search GitHub Orgs</h1>
      </header>
      {
        client
          ? <Provider value={client}>
            <Search />
          </Provider>
          : <AuthenticateOnGH />
      }
    </div>
  )
}

export default App;
