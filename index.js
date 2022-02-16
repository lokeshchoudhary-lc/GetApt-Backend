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

app.get('/hello', (_req, res) => {
  res.send('Hello World!');
});

const { authVerification } = require('./utils/jwt_helper');
const AuthHandler = require('./routes/Auth_Routes/index');
const DashboardHandler = require('./routes/Dashboard_Routes/index');

app.use('/api/v1/auth', AuthHandler);
app.use('/api/v1/dashboard', authVerification, DashboardHandler);

app.use(async (_req, _res, next) => {
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
