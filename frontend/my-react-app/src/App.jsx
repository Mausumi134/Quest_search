import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/find', { query: term });
      setResults(res.data.questions);
    } catch (err) {
      console.error('Not Found:', err);
      alert('NOT FOUND');
    } finally {
      setLoading(false);
    }
  };

  let msg;
  if (term && !loading) {
    msg = (
      <p>
        <strong>Searching for: "{term}"</strong>
      </p>
    );
  } else {
    msg = null;
  }

  let content;
  if (results.length === 0 && loading==NULL) {
    content = <li className="no-results">No results found.</li>;
  } else {
    content = results.map((q, i) => {
      if (q.type === 'ANAGRAM') {
        return (
          <li key={i}>
            <h3>{q.title}</h3>
            <p>Type: {q.type}</p>
            <p>Anagram Type: {q.anagramType}</p>
            <div>
              <h4>Blocks:</h4>
              <p>{q.blocks.map((b) => b.text).join(' ')}</p>
              <h4>Solution:</h4>
              <p>{q.solution}</p>
            </div>
          </li>
        );
      } else {
        return (
          <li key={i}>
            <h3>{q.title}</h3>
            <p>Type: {q.type}</p>
            <p>Anagram Type: {q.anagramType}</p>
          </li>
        );
      }
    });
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <h1>QuestSearch</h1>

        <div>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search Query..."
          />
          <button onClick={search} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {msg}
      </div>

      <div className="results">
        <ul>{content}</ul>
      </div>
    </div>
  );
}

export default App;
