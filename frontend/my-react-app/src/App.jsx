import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/search', { query });
      setResults(response.data.questions);
    } catch (error) {
      console.error('Error during search:', error);
      alert('An error occurred while fetching the results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>QuestSearch</h1>

        {/* Search input */}
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {query && !loading && (
          <p>
            <strong>Searching for: "{query}"</strong>
          </p>
        )}
      </div>

      {/* Results Section */}
      <div className="results">
        <ul>
          {results.length === 0 && !loading && (
            <li className="no-results">No results found.</li>
          )}
          {results.map((q, index) => (
            <li key={index}>
              <h3>{q.title}</h3>
              <p>Type: {q.type}</p>
              <p>Anagram Type: {q.anagramType}</p>
              {q.type === 'ANAGRAM' && (
                <div>
                  <h4>Blocks:</h4>
                  <p>{q.blocks.map((b) => b.text).join(' ')}</p>
                  <h4>Solution:</h4>
                  <p>{q.solution}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
