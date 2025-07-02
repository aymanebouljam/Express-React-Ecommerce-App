const mongoose = require('mongoose');
require('dotenv').config();

const seed = async (seeder) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const seedingFunction = require(`./${seeder}`);

    const results = await seedingFunction();

    if (!results) throw new Error(`${seeder} has failed`);

    await mongoose.connection.close();

    console.log('Seeding was successful');

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed: ', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

const seeder = process.argv[2];

if (!seeder) {
  console.error('Please provide the seeder filename (e.g. usersSeeder)');
  process.exit(1);
}
seed(seeder);
