import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const validateName = (newName) => {
    let result = persons.some((person) => person.name === newName);
    !result && alert(`${newName} is already added to phonebook`);
    return result;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateName(newName)) return;

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleFilter = (event) => setFilter(event.target.value);

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

      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
