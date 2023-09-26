const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleInputName,
  handleInputNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleInputName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleInputNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
