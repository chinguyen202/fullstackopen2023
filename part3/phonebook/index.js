const express = require('express');
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const generateId = () => {
  const minId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  const maxId = 999999999;
  const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  return id;
};

app.get('/info', (request, response) => {
  const time = new Date();
  response.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${time}</p>
    </div>`
  );
});

// Get all
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// Get one
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ error: 'Info does not exist' });
  }
});

// Create one
app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const isNameExist = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );

  if (isNameExist) {
    return response.status(422).json({
      error: 'name must be unique',
    });
  }

  const newPerson = {
    id: generateId(),
    ...body,
  };
  persons = persons.concat(newPerson);
  response.json(newPerson);
});

// Delete one
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
