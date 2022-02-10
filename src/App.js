import React, { useState } from 'react';
import './App.css';
import Fuse from 'fuse.js';

import characters from './characters.json';

function App() {

  const [query, updateQuery] = useState('');

  const fuse = new Fuse(characters, {
    keys: [
      'name',
      'company',
    ],
    includeScore: true
  });

  const results = fuse.search(query);
  const characterResults = query ? results.map(character => character.item) : characters;

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }

  return (
    <>
      <main className="container">

        <ul className="characters">
        <input className="search" placeholder="Search..." type="text" value={query} onChange={onSearch} />

          {characterResults.map(character => {
            const { name, company, thumb } = character;
            return (
              <li key={name} className="character">
                <ul className="character-meta">
                  <li>
                    <strong>Name:</strong> { name }
                  </li>
                  <li>
                    <strong>Company:</strong> { company }
                  </li>
                </ul>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  );
}

export default App;
