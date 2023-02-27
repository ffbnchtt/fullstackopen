import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { personsService } from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({
    content: "",
    type: "",
    show: false,
  });

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
    validatePerson(newPerson);
  };

  const addPerson = (newPerson) => {
    personsService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        setMessage({ content: "Success", type: "success", show: true });
        setTimeout(() => {
          setMessage({ ...message, show: false });
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        setMessage({ content: error.response.data.error, type: "error", show: true });
        setTimeout(() => {
          setMessage({ ...message, show: false });
        }, 5000);
      });
  };

  const updatePerson = (id, updatePerson) => {
    if (
      window.confirm(
        `${updatePerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      updatePerson.id = id;
      personsService
        .update(id, updatePerson)
        .then(() => {
          setPersons(
            persons.map((person) => (person.id !== id ? person : updatePerson))
          );
          setMessage({
            ...message,
            content: `Success`,
            type: "success",
            show: true,
          });
          setTimeout(() => {
            setMessage({ ...message, show: false });
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
          setMessage({
            ...message,
            content: error.response.data.error,
            type: "error",
            show: true,
          });
          setTimeout(() => {
            setMessage({ ...message, show: false });
          }, 5000);
        });
    }
  };

  const deletePerson = (event) => {
    if (
      window.confirm(
        `Are you sure you wish to delete ${event.target.dataset.name} (${event.target.dataset.number}) ?`
      )
    ) {
      personsService
        .remove(event.target.dataset.id)
        .then(() => {
          setPersons(
            persons.filter(
              (person) => person.id.toString() !== event.target.dataset.id
            )
          );
          setMessage({ content: `Success`, type: "success", show: true });
          setTimeout(() => {
            setMessage({ ...message, show: false });
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
          setMessage({
            ...message,
            content: error.response.data.error,
            type: "error",
            show: true,
          });
          setTimeout(() => {
            setMessage({ ...message, show: false });
          }, 5000);
        });
    }
  };

  const validatePerson = (newPerson) => {
    let existsPerson = persons.find((person) => person.name === newPerson.name);
    if (existsPerson) {
      updatePerson(existsPerson.id, newPerson);
    } else {
      addPerson(newPerson);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
