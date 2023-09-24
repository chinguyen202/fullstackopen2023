const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((item, index) => (
        <p key={index}>
          {item.name} {item.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
