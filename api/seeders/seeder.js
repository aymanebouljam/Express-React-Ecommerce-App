const mongoose = require('mongoose');

const seed = async (seeder) => {
  try {
    console.log(seeder);
    const seedingFunction = require(`./${seeder}`);

    const results = await seedingFunction();

    if (!results) throw new Error(`${seeder} has failed`);

    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }

    console.log('Seeding DataBase was successful');

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed: ', error.message);

    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

const seeder = process.argv[2];

if (!seeder) {
  console.error('Please provide the seeder filename (e.g. -- usersSeeder)');
  process.exit(1);
}
seed(seeder);
