const mongoose = require('mongoose');

const mongouri = process.env.MONGODB_URI;

const dbname = process.env.DB_NAME;

mongoose.connect(mongouri, {
  dbName: dbname,
  // autoIndex: false, uncomment it in production
});

mongoose.connection.on('connected', () => console.log('Connected to database'));
mongoose.connection.on('error', (err) => console.log(err.message));
mongoose.connection.on('disconnected', () =>
  console.log('Disconnected to database')
);

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
