import React, { useState } from 'react';
import axios from 'axios';

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
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#1e1e1e',
        color: '#fff',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: '30%',
          backgroundColor: '#282c34',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ marginBottom: '20px', fontSize: '2rem', color: '#61dafb' }}>QuestSearch</h1>

        {/* Search input */}
        <div style={{ width: '100%', maxWidth: '300px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              width: '100%',
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#007bff',
              color: '#fff',
              cursor: 'pointer',
              width: '100%',
            }}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {query && !loading && (
          <p
            style={{
              marginTop: '20px',
              fontSize: '18px',
              fontStyle: 'italic',
              color: '#bbb',
            }}
          >
            <strong>Searching for: "{query}"</strong>
          </p>
        )}
      </div>

      {/* Results Section */}
      <div
        style={{
          width: '70%',
          padding: '20px',
          overflowY: 'auto',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            padding: '0',
            margin: '0 auto',
            maxWidth: '1000px',
            textAlign: 'left',
          }}
        >
          {results.length === 0 && !loading && (
            <li style={{ textAlign: 'center', color: '#777' }}>No results found.</li>
          )}
          {results.map((q, index) => (
            <li
              key={index}
              style={{
                marginBottom: '20px',
                padding: '15px',
                borderRadius: '5px',
                backgroundColor: '#282c34',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#61dafb' }}>{q.title}</h3>
              <p style={{ margin: '5px 0', color: '#bbb' }}>Type: {q.type}</p>
              <p style={{ margin: '5px 0', color: '#bbb' }}>Anagram Type: {q.anagramType}</p>
              {q.type === 'ANAGRAM' && (
                <div>
                  <h4 style={{ margin: '10px 0 5px 0', color: '#fff' }}>Blocks:</h4>
                  <p style={{ margin: '0 0 10px 0', color: '#bbb' }}>
                    {q.blocks.map((b) => b.text).join(' ')}
                  </p>
                  <h4 style={{ margin: '10px 0 5px 0', color: '#fff' }}>Solution:</h4>
                  <p style={{ margin: '0', color: '#bbb' }}>{q.solution}</p>
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
