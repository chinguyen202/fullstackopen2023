const Country = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h4>Languages</h4>
      {Object.keys(country.languages).map((code) => (
        <li key={code}>{country.languages[code]}</li>
      ))}
      <img src={country.flags.png} alt="Country's flag" />
    </>
  );
};

export default Country;
