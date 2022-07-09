const mongoose = require('mongoose');

const isLocalDb = process.env.USE_LOCAL_DB;
const mongouri_online = process.env.MONGODB_URI_ONLINE;
const mongouri_local = process.env.MONGODB_URI_LOCAL;
const mongouri = isLocalDb == 'true' ? mongouri_local : mongouri_online;
const dbname = process.env.DB_NAME;

console.log(mongouri);
mongoose.connect(mongouri, {
  dbName: dbname,
  // autoIndex: false, uncomment it in production
});

mongoose.connection.on('connected', () => {
  if (isLocalDb == 'true') {
    console.log('Connected to local database');
  } else {
    console.log('Connected to online database');
  }
});
mongoose.connection.on('error', (err) => console.log(err.message));
mongoose.connection.on('disconnected', () =>
  console.log('Disconnected to database')
);

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
