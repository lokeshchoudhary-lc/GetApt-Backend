let whitelist = ['http://localhost:3000', 'http://localhost:5000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      //|| !origin
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //Accept application/json? Content-Type:application/json?
  allowedHeaders: ['Content-Type', 'Accept', 'origin'],
  maxAge: 3600,
};

module.exports = corsOptions;
