import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notifications';
import personService from './personService';

const App = () => {
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('false');

  useEffect(() => {
    personService
      .getAll()
      .then((initPersons) => {
        setPersons(initPersons);
      })
      .catch((error) => {
        console.log('Error in getting data', error.message);
      });
  }, []);

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
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setError(false);
          setMessage(`Add ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setNewName(''), setNewNumber('');
        })
        .catch((error) => {
          alert(`Error in creating entry: ${error.message}`);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const editPerson = { name: newName, number: newNumber };
        personService
          .update(isNameExist.id, editPerson)
          .then((returnedPerson) => {
            console.log('UPDATE', returnedPerson);
            setNewName(''), setNewNumber('');
          })
          .catch((error) => {
            alert(`Error in updating phonebook: ${error.message}`);
          });
      }
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    const personToDelete = persons.find((person) => person.id === id);
    if (personToDelete) {
      if (window.confirm(`Delete ${personToDelete.name}?`)) {
        personService.deletePerson(id).catch((error) => {
          setMessage(
            `The person ${personToDelete.name} was already deleted from server`
          );
          setError(true);
          setTimeout(() => {
            setMessage(null);
            setError(false);
          }, 5000);
        });
      }
    } else {
      alert('The person does not exist');
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
        <h1>Phonebook</h1>
        {message && <Notification message={message} error={error} />}

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
          <Persons persons={persons} handleDelete={handleDelete} />
        ) : (
          <Persons persons={searchResult} handleDelete={handleDelete} />
        )}
      </div>
    </>
  );
};

export default App;
