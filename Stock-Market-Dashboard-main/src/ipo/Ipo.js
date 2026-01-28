import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Get your free key at finnhub.io
const API_KEY = 'd5ph6j9r01qie4isn66gd5ph6j9r01qie4isn670';

function Ipo() {
  const [ipoData, setIpoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIpoData = async () => {
      try {
        setLoading(true);
        // Finnhub requires a date range. I've set it for the full year 2026.
        const response = await axios.get(
          `https://finnhub.io/api/v1/calendar/ipo?from=2026-01-01&to=2026-12-31&token=${API_KEY}`
        );
        
        // Finnhub returns data inside an "ipoCalendar" array
        setIpoData(response.data.ipoCalendar || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchIpoData();
  }, []);

  if (loading) return <p>Loading upcoming IPOs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Latest IPOs (2026)</h2>
      {ipoData.length === 0 ? (
        <p>No upcoming IPOs found for this range.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {ipoData.map((ipo, index) => (
            <li 
              key={index} 
              style={{ 
                marginBottom: "10px", 
                padding: "10px", 
                borderBottom: "1px solid #ccc" 
              }}
            >
              <strong>{ipo.name} ({ipo.symbol})</strong> <br />
              Price: {ipo.price ? `$${ipo.price}` : "TBD"} | 
              Date: {ipo.date || "Announced"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Ipo;