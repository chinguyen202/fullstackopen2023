import { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleInputName = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleInputNumber = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const isNameExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (!isNameExist) {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const searchResult = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    setShowAll(false);
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Filter search={search} handleSearch={handleSearch} />
        <h3>Add a new</h3>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          newNumber={newNumber}
          handleInputName={handleInputName}
          handleInputNumber={handleInputNumber}
        />

        <h3>Numbers</h3>
        {showAll ? (
          <Persons persons={persons} />
        ) : (
          <Persons persons={searchResult} />
        )}
      </div>
    </>
  );
};

export default App;
