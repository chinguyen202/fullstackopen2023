const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB', result);
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Check if the phone number has a length of 8 or more
        if (value.length < 8) {
          return false;
        }
        // Check if the phone number is in the correct format
        const parts = value.split('-');
        if (parts.length !== 2) {
          return false;
        }
        // Check if the first part has two or three numbers
        const firstPart = parts[0];
        if (
          firstPart.length < 2 ||
          firstPart.length > 3 ||
          !/^\d+$/.test(firstPart)
        ) {
          return false;
        }
        // Check if the second part consists of numbers
        const secondPart = parts[1];
        if (!/^\d+$/.test(secondPart)) {
          return false;
        }
        return true;
      },
      message: 'Invalid phone number format',
    },
  },
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', phonebookSchema);
