import { useEffect } from 'react';
import { useState } from 'react';
import countryService from './countryService';
import Country from './Country';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then((initialCountries) => {
        setCountries(initialCountries);
      })
      .catch((error) => {
        console.log('Error in getting data : ', error.message);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    const list = countries.filter((country) =>
      country.name.official.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(list);
    if (list.length === 1) {
      console.log('COUNTRY: ', list[0]);
      setCountry(list[0]);
    }
  };

  const showCountry = (name) => {
    countryService
      .getOne(name)
      .then((result) => setCountry(result))
      .catch((error) => console.log('ERROR :', error.message));
  };

  return (
    <>
      <h1>Countries</h1>
      <div>
        Find countries{' '}
        <input value={search} onChange={(e) => handleSearch(e)} />
      </div>
      {searchResult.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {searchResult.length > 1 && (
        <div>
          {searchResult.map((country, index) => (
            <>
              <p key={index}>
                {country.name.official}{' '}
                <button onClick={() => showCountry(country.name.official)}>
                  Show
                </button>
              </p>
            </>
          ))}
        </div>
      )}
      {country && <Country country={country} key={country.capital} />}
    </>
  );
};

export default App;
