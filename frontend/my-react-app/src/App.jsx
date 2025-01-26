import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/find', { query: searchTerm });
      setSearchResults(response.data.questions);
    } catch (error) {
      console.error('Error during search:', error);
      alert('An error occurred while fetching the results.');
    } finally {
      setIsLoading(false);
    }
  };

  
  let searchMessage;
  if (searchTerm && !isLoading) {
    searchMessage = (
      <p>
        <strong>Searching for: "{searchTerm}"</strong>
      </p>
    );
  } else {
    searchMessage = null;
  }


  let searchContent;
  if (searchResults.length === 0 && !isLoading) {
    searchContent = <li className="no-results">No results found.</li>;
  } else {
    searchContent = searchResults.map((question, index) => {
      if (question.type === 'ANAGRAM') {
        return (
          <li key={index}>
            <h3>{question.title}</h3>
            <p>Type: {question.type}</p>
            <p>Anagram Type: {question.anagramType}</p>
            <div>
              <h4>Blocks:</h4>
              <p>{question.blocks.map((block) => block.text).join(' ')}</p>
              <h4>Solution:</h4>
              <p>{question.solution}</p>
            </div>
          </li>
        );
      } else {
        return (
          <li key={index}>
            <h3>{question.title}</h3>
            <p>Type: {question.type}</p>
            <p>Anagram Type: {question.anagramType}</p>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Query..."
          />
          <button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {searchMessage}
      </div>

    
      <div className="results">
        <ul>{searchContent}</ul>
      </div>
    </div>
  );
}

export default App;
