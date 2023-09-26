const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((item, index) => (
        <div key={index}>
          {item.name} {item.number}
          <button onClick={(e) => handleDelete(e, item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
