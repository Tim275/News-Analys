import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [sentiment, setSentiment] = useState('NEUTRAL');

    useEffect(() => {
        fetch('REACT_APP_NEWS_READER_API', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sentiment: sentiment }),
        })
        .then(response => response.json())
        .then(data => setData(data.Items))
        .catch(error => setError(error));
    }, [sentiment]);

    const handleSentimentChange = (event) => {
        setSentiment(event.target.value);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div className="container">
                <header>
                    <h1>News Reader</h1>
                    <select value={sentiment} onChange={handleSentimentChange}>
                        <option value="POSITIVE">Positive</option>
                        <option value="NEGATIVE">Negative</option>
                        <option value="NEUTRAL">Neutral</option>
                    </select>
                </header>
                {data.map((item, index) => (
    <div key={index}>
        <h2>{item.title}</h2>
        <p>{item.timestamp}</p>
        <p>{item.content}</p>  
    </div>
))}
            </div>
        );
    }
}

export default App;