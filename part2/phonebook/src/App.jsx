import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleInputName = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    setPersons(persons.concat(newPerson));
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleInputName} />
          </div>

          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <div>DEBUG: {newName}</div>
        <h2>Numbers</h2>
        ...
        {persons.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))}
      </div>
    </>
  );
};

export default App;
