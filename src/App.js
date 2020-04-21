import React from 'react';
import { createClient, Provider } from 'urql'
import './App.css';

import { Search } from './Search'

// TODO: DANGER DO NOT PUSH THIS BLOODY TOKEN
const TOKEN = ''

const client = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: () => {
    return {
      headers: {
        authorization: `Bearer ${TOKEN}`
      }
    }
  }
})

function App() {
  return (
    <Provider value={client}>
      <div className="App">
        <header className="App-header">
          <h1>Github Org Search</h1>
        </header>
        <div className="main">
          <Search />
        </div>
      </div>
    </Provider>
  );
}

export default App;
