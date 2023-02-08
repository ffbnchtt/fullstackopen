const Persons = ({ filter, persons, deletePerson }) => {
    return (
        <>
            {persons
                .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => (
                    <div key={person.id}>
                        <span>
                            {person.name} {person.number}
                        </span>
                        <button
                            data-id={person.id}
                            data-name={person.name}
                            data-number={person.number}
                            onClick={deletePerson}>
                            delete
                        </button>
                    </div>
                ))}
        </>
    )
}

export default Persons;