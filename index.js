const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./utils/corsConfig');
const helmetConfig = require('./utils/helmetConfig');

require('dotenv').config();
require('./utils/init_mongodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
helmetConfig.config(app);
app.use(cors(corsOptions));

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

const login = require('./routes/Auth_Routes/login.js');
const logout = require('./routes/Auth_Routes/logout.js');
const signup = require('./routes/Auth_Routes/signup.js');

app.use('/api/v1/login', login);
app.use('/api/v1/signup', signup);
app.use('/api/v1/logout', logout);

app.use(async (req, res, next) => {
  const Error = createError.NotFound();
  next(Error);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at ${PORT} 🚀`));
