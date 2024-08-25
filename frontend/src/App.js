import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState(null);
  const [filteredResponse, setFilteredResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  // Effect to filter response based on selected options
  useEffect(() => {
    if (response) {
      const filteredData = {};
      selectedOptions.forEach(option => {
        if (option === 'Alphabets') {
          filteredData.alphabets = response.alphabets || [];
        } else if (option === 'Numbers') {
          filteredData.numbers = response.numbers || [];
        } else if (option === 'Highest lowercase alphabet') {
          filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet || [];
        }
      });
      setFilteredResponse(filteredData);
    }
  }, [response, selectedOptions]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jsonData = JSON.parse(inputValue);
      const result = await axios.post('http://localhost:3000/bfhl', jsonData);
      setResponse(result.data);
      setError(null);
    } catch (error) {
      setError('Invalid JSON input');
    }
  };

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(selectedOptions);
  };

  return (
    <div>
      <h1>ABCD123</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder='Enter JSON here'
        />
        <button type="submit">Submit</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      {response && (
        <div>
          <select multiple value={selectedOptions} onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <ul>
            {filteredResponse && Object.keys(filteredResponse).map((key, index) => (
              <li key={index}>{key}: {Array.isArray(filteredResponse[key]) ? filteredResponse[key].join(', ') : filteredResponse[key]}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
