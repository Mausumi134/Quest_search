import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState(''); // Holds search query input
  const [results, setResults] = useState([]); // Holds the search results
  const [loading, setLoading] = useState(false); // Loading state

  const handleSearch = async () => {
    setLoading(true); // Set loading to true when search starts
    try {
      const response = await axios.post('http://localhost:5000/search', { query });
      console.log('Search Results:', response.data.questions); 
      setResults(response.data.questions); // Set results to state after search
    } catch (error) {
      console.error("Error during search:", error);
      alert('An error occurred while fetching the results.');
    } finally {
      setLoading(false); // Set loading to false after search is completed
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>QuestSearch</h1>

      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state
        placeholder="Search questions..."
        style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
      />
      
      {/* Search button */}
      <button onClick={handleSearch} style={{ padding: '10px', fontSize: '16px' }}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {/* Display the search query along with the results */}
      {query && !loading && (
        <p style={{ marginTop: '20px', fontSize: '18px', fontStyle: 'italic' }}>
          <strong>Search Results for: "{query}"</strong>
        </p>
      )}

      {/* Display results */}
      <ul style={{ marginTop: '20px' }}>
        {results.length === 0 && !loading && <li>No results found.</li>}
        {results.map((q, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <h3>{q.title}</h3>
            <p>Type: {q.type}</p>
            <p>Anagram Type: {q.anagramType}</p>
            {q.type === 'ANAGRAM' && (
              <div>
                <h4>Blocks:</h4>
                <p>{q.blocks.map(b => b.text).join(' ')}</p>
                <h4>Solution:</h4>
                <p>{q.solution}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
