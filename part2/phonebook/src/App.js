import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { personsService } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);

  useEffect(() => {
    personsService
      .getAll()
      .then((response) => setPersons(response))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (!validatePerson(newPerson)) return;

    personsService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => console.error(error));
  };

  /*const updatePerson = () => {
    personsService
      .update()
      .then(() => getPersons())
      .catch((error) => console.error(error));
  };*/

  const deletePerson = (event) => {
    if (
      window.confirm(
        `Are you sure you wish to delete ${event.target.dataset.name} (${event.target.dataset.number}) ?`
      )
    ) {
      personsService
        .remove(event.target.dataset.id)
        .then(() =>
          setPersons(
            persons.filter(
              (person) => person.id.toString() !== event.target.dataset.id
            )
          )
        )
        .catch((error) => console.error(error));
    }
  };

  const validatePerson = (newName) => {
    let result = persons.some((person) => person.name === newName);
    !result && alert(`${newName} is already added to phonebook`);
    return result;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
