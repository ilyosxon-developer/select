import React, { useState, useEffect } from 'react';

const Bayramlar = () => {
  const [davlatlar, setdavlatlar] = useState([]);
  const [tanlangandavlat, setTanlangandavlat] = useState(''); 
  const [bayramlar, setbayramlar] = useState([]);   
  
 
  useEffect(() => {
    fetch('https://openholidaysapi.org/Countries?languageIsoCode=EN', {
      method: 'GET',
      headers: { accept: 'text/plain' },
    })
      .then((response) => response.json())
      .then((data) => setdavlatlar(data))
      .catch((error) => console.error('Xatolik:', error));
  }, []);

  
  const fetchBayramlar = (countryCode) => {
    fetch(
      `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${countryCode}&languageIsoCode=EN&validFrom=2023-01-01&validTo=2023-12-31`,

      {
        method: 'GET',
        headers: { accept: 'text/plain' },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setbayramlar(data);

      })
  };

  // Select elementidagi tanlash funksiyasi
  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setTanlangandavlat(countryCode);
    fetchBayramlar(countryCode);
  };

  return (
    <div>
      <h1>Bayramlar</h1>
      <label htmlFor="country-select">Davlatni tanlang:</label>
      <select id="country-select" onChange={handleCountryChange}>
        <option value="">Davlatni tanlang</option>
        {davlatlar.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name.find((i) => i.language === 'EN')?.text || country.isoCode}
          </option>
        ))}
      </select>

      {bayramlar.length > 0 && (
        <ul>
          {bayramlar.map((holiday, index) => (
            <li key={index}>
              <span style={{fontWeight:"bold"}} >
                {new Date(holiday.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
              </span> { }
              <span>{holiday.name[0].text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bayramlar;


