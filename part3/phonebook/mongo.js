const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://reeng88:${password}@phonebook.zewmszo.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', phonebookSchema);

if (!newName && !newNumber) {
  console.log('Phonebook: ');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: newName,
    number: newNumber,
  });

  person.save().then((result) => {
    console.log(`add ${newName} number ${newNumber} to phonebook`);
    mongoose.connection.close();
  });
}
