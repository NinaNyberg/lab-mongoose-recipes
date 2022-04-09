const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Some food',
      level: 'Easy Peasy',
      ingredients: ['apple', 'banana', 'kiwi'],
      cuisine: 'European',
      dishType: 'breakfast',
      duration: 5,
      creator: 'Human'
    });
  })
  .then((recipe) => {
    console.log('First recipe added', recipe.title);
    return Recipe.insertMany(data);
  })
  .then((data) => {
    data.forEach((recipe) => {
      console.log(recipe.title);
    });
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese', duration: 220 },
      { duration: 100 },
      { new: true }
    );
  })
  .then((recipe) => {
    console.log('Duration updated', recipe);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then((recipe) => {
    console.log('Recipe removed!');
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Was disconnected from MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
